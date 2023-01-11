import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    checkPermission();
    showNotification();
  }, []);
  // check permission for notification

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      getFCMToken();
    } else {
      requestPermission();
    }
  };

  // request Permission for perission

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (err) {
      console.log('Error', err);
    }
  };

  // get token from FCM

  const getFCMToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
  
  };

  // show notification

  const showNotification = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage(message => {
      console.log(message);
    });
  };

  return (
    <View>
      <Text>Welcome To The FCM Firebase...</Text>
    </View>
  );
};

export default App;
