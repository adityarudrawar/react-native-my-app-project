import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Keyboard, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Button, Overlay  } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';

import * as firebaseFunctions from '../src/FirebaseApi.js'
import { BackgroundImage } from 'react-native-elements/dist/config';


export function Comment(props) {
    const [visible, setVisible] = useState(false);
    const [newCommentText, setNewCommentText] = useState("");
    const [comments, setComments] = useState("");

    const toggleCommentsOverlay = async ()=>{
        setVisible(!visible);
      }
    
    const loadComments = async ()=>{
        let temp = await firebaseFunctions.getComments(props.documentId);
        console.log("Comment returned into the CommentComponent",temp)
        setComments(temp);

        console.log(temp)
        toggleCommentsOverlay();
    }

    const submitComment = () =>{
        console.log("Submit Comment", newCommentText)
        firebaseFunctions.addComments(props.documentId, newCommentText)
        setNewCommentText("")
        loadComments()
    }

    const renderItem = ({item})=>{
        (<Text>{item.title}</Text>)
    }
    
    return(
        <View >
            <Button
                buttonStyle={{border:10, padding: 10, borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='COMMENTS' 
                onPress={loadComments}
            />
            <Overlay style={{width:'100%', borderRadius: 100}}
                isVisible={visible}
                onBackdropPress={toggleCommentsOverlay}>
                <Text>These are the comments for Post {props.postTitle}</Text>
                <FlatList
                        data={comments}
                        renderItem={({item}) => ( <Text>{item.title}</Text> )}
                        // renderItem={renderItem}
                        keyExtractor={(item)=>item.id.toString()}
                ></FlatList>  
                <Text style={{width:5, height: 10}}/>
                <SafeAreaView style={{justifyContent: 'space-between'}}>
                        <TextInput
                                multiline
                                numberOfLines={2}
                                onSubmitEditing={Keyboard.dismiss}
                                placeholder="Add a Comment"
                                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                                style={{ width:"100%"}}
                                onChangeText={value => setNewCommentText(value)}
                                value={newCommentText}
                                />
                    <View style={{flexDirection: "row", width: '100%', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={{ height: 30 }} >
                                <Octicons 
                                    name="diff-added" 
                                    size={30}
                                    color="gray" 
                                    onPress={submitComment}/>
                            </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Overlay>
        </View>
    )
}