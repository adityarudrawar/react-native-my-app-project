import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { getSavedPosts, savePost, storeData }from '../src/Stoarge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseFunctions from '../src/FirebaseApi.js'


export function SaveScreen(props){
    const [savedPostsId, setSavedPostsId] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    const getPosts = async()=>{
      const result = await AsyncStorage.getItem("@storage_Key")
      
      setSavedPostsId(result)
      console.log("Saved Posts in Async Storage", result)

      let temp = await firebaseFunctions.getPostsFromList(result)
      
      setSavedPosts(temp)

      console.log("Saved Posts from Firebase",temp)
    };


    return(
      <View>
        <Text>
           {savedPostsId}
        </Text>
        <Button
        title="REFRESH TO GET POSTS"
        // style={styles.button}
        style={{width: 420, height: 50}}
        onPress={()=>getPosts()}
        />

        <Button
          title="DEMO DELETE SAVED POSTS"
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
  