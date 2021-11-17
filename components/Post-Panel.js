import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import {Card, Button } from 'react-native-elements';
import { Comment } from './Comment';
import { SaveButton } from './SaveButton';

export function PostPanel(props) {
  const [postSaveStatus, setPostSaveStatus] = useState(false);
  

  const onSaveButtonPress = (id)=>{
    alert("This Post ID: " + id)
    setPostSaveStatus(true)
  }
  return (
    <Card>
      <Card.Title>
        <Text>
          {props.title}
        </Text>
      </Card.Title>
        <Card.Divider/>
          <Text style={{marginBottom: 10}}>
            {props.body}
          </Text>
          <Comment id={props.id} documentId={props.documentId} postTitle={props.title}/>
          <Text style={{width:5, height: 5}}/>
          <SaveButton documentId={props.documentId} />
          {/* {!postSaveStatus&&<Button
            // icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{padding: 10, borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='SAVE THIS POST' 
            onPress={()=>onSaveButtonPress(props.id)}
            />} */}
      </Card>
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
