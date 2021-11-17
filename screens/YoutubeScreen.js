import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { Tiles } from '../components/Tiles';

const API_KEY = "AIzaSyBpTB6k92gzBxlXqkDjHo3f8BC9GiGWeLc"

const NavalChannelID = 'UCh_dVD10YuSghle8g6yjePg'

export function YoutubeScreen(props){
  
    const [data, setData] = useState(null);

    const getChannelData =  async(channelid) => {
        const queryChannel = "https://www.googleapis.com/youtube/v3/channels?id=" + channelid+ "&key=" + API_KEY+ "&part=contentDetails";
        console.log(queryChannel)
        const response = await fetch(queryChannel);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
    
        const result = await response.json();
        console.log(result)
        // console.log("Upload ID: ", result["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]);
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

        let tempArray = []
        let i = 1;
        result2["items"].forEach(element => {
          
          let videoLink = 'https://www.youtube.com/watch?v=' + element['snippet']['resourceId']['videoId']
          videoLink = videoLink.toString()
          
          tempArray.push({'videoTitle' : element['snippet']['title'], 'id': i, 'videoLink':videoLink})
          i = i + 1
        });

        setData(tempArray);
        
      };

    return(
    <View style={styles.container}>

        <FlatList 
          data={data}
          renderItem={({item}) => (<Tiles title= {item.videoTitle} videoLink={item.videoLink} />)}
        />

        <Button
          title="Get Youtube data"
          style={styles.button}
          onPress={() => {
            getChannelData(NavalChannelID);
          }}/>
  
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
  