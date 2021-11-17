import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, Linking, TouchableOpacity  } from 'react-native';
import {Card, Button } from 'react-native-elements';
import { Comment } from './Comment';
import { SaveButton } from './SaveButton';

export function Tiles(props) {

  return (
    <TouchableOpacity 
    
    onPress={
        ()=>Linking.openURL(props.videoLink)
        // console.log("sdifjdijisoifj", props.videoLink)
    }>
        <Card
            >
            <Text>
                {props.title}
            </Text>
        </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
