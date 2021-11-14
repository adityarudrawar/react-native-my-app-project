import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { getSavedPosts, savePost, storeData }from '../src/Stoarge';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SaveScreen(props){
    const [savedPosts, setSavedPosts] = useState([]);
    

    useEffect(async()=>{
      const result = await AsyncStorage.getItem("@storage_Key")
      setSavedPosts(result) 
    },[savedPosts])


    const getPosts = async()=>{
      const result = await AsyncStorage.getItem("@storage_Key")
      setSavedPosts(result)
    }
    return(
      <View>
        <Text>
           {savedPosts}
        </Text>
        <Button
        title="REFRESH TO GET POSTS"
        style={styles.button}
        onPress={()=>getPosts()}
        ></Button>

        <Button
          title="DEMO DELETE SAVED POSTS"
          style={styles.button}
          onPress={()=>storeData([])}
        ></Button>
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
  