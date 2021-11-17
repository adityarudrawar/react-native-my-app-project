import React, {useState, useEffect, useRef} from "react";
import {Card, Text, Button} from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function PostPanel(props){

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

      async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Notifications for ' + props.title + " 📬",
            body: props.body,
            data: { data: props.documentId },
          },
          trigger: { seconds: 2 },
        });
      }
    
      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
      
    return(
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
            <Button
                buttonStyle={{border:10, padding: 10, borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='SEND PUSH NOTIFICATION' 
                onPress={async () => {
                    await schedulePushNotification();
                    }}
                        />        
        </Card>
    )
}


