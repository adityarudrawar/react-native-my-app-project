import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Keyboard, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Button, Overlay  } from 'react-native-elements';

import * as firebaseFunctions from '../src/FirebaseApi.js'
import {savePost, getSavedPosts, unSavePost } from '../src/Stoarge';

var unsaveText = "UNSAVE THIS POST";
var saveText = "SAVE THIS POST";

export function SaveButton(props){
    const [buttonText, setButtonText] = useState("");
    const [saveState, setSaveState] = useState("");

    useEffect(async ()=>{
        let savedPosts = await getSavedPosts();
        // console.log("Saved Posts",savedPosts);
        if (savedPosts.includes(props.documentId) ){
            setButtonText(unsaveText)
            setSaveState(true)
        }else{
            setButtonText(saveText)
            setSaveState(false)
        }
    },[]);

    const saveToggle = async() =>{
        // UNSAVE IF saveState is true
        if(saveState){
            await unSavePost(props.documentId)
            setSaveState(false)
            setButtonText(saveText)
        }else{
            await savePost(props.documentId)
            setSaveState(true) 
            setButtonText(unsaveText)  
        }
    }

    return(
        <View>
            <Button
                buttonStyle={{border:10, padding: 10, borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title= { buttonText }
                onPress = {saveToggle}
            />
        </View>
    )
}