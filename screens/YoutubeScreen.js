import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const API_KEY = "AIzaSyBpTB6k92gzBxlXqkDjHo3f8BC9GiGWeLc"
const NavalChannelID = "UCh_dVD10YuSghle8g6yjePg"

export function YoutubeScreen(props){
    
    const getChannelData = async(channelid) => {
        const queryChannel = "https://www.googleapis.com/youtube/v3/channels?id=" + channelid+ "&key=" + API_KEY+ "&part=contentDetails";
        console.log(queryChannel)
        const response = await fetch(queryChannel);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
    
        const result = await response.json();
        console.log(result)
        console.log("Upload ID: ", result["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]);
        const uploadId =  result["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"];
        
        
        
        const uploads = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId="+ uploadId + "&key="+ API_KEY+ "&part=snippet&maxResults=50";
        console.log("Upload URL",uploads)
        const response2 = await fetch(uploads);
        if (!response2.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const result2 = await response2.json();
        console.log("Uploads Result",result2)
      
      };
      
    
    
    
    return(
    <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
          title="Get Naval Ravikant data"
          style={styles.button}
          onPress={() => {
            getChannelData(NavalChannelID);
          }}>
          
        </Button>
        <StatusBar style="auto" />
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
  