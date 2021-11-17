import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { getSavedPosts, savePost, storeData }from '../src/Stoarge';

import * as firebaseFunctions from '../src/FirebaseApi.js'
import {PostPanel} from '../components/PostPanelComponent';



export function SaveScreen(props){

    
    
    const [savedPosts, setSavedPosts] = useState([]);
   


    const getPosts = async()=>{
      const result = await getSavedPosts();

      let temp = await firebaseFunctions.getPostsFromList(result)
      
      setSavedPosts(temp)

      console.log("Saved Posts fetched from Firebase", temp)   
    };

    const renderItem = (item) =>{
      <PostPanel title={item.title} body={item.body} />
    }
    return(
      <View>
        <FlatList
          data={savedPosts}
          // renderItem={({item}) => ( <Text>{item.title}</Text> )}
          renderItem={({item}) => (<PostPanel  title={item.title} body={item.body} documentId={item.documentId}/>)}
          keyExtractor={item => item.id.toString()}
        />
        <Button
          title="REFRESH TO GET POSTS"
          // style={styles.button}
          style={{width: 420, height: 50}}
          onPress={()=>getPosts()}
        />

        <Button
          title="DELETE ALL SAVED POSTS"
          style={styles.button}
          onPress={()=>storeData([])}
        />

      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },button: {
      width: 200,
      marginTop: 50,
    },
  });
  