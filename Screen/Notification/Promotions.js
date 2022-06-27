import { View, Text, TouchableOpacity, Alert,Button } from 'react-native';
import { useRef, useEffect, useState, useCallback } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import { isDevice } from 'expo-device';
import { openSettings } from 'expo-linking';
import {
  getExpoPushTokenAsync,
  requestPermissionsAsync,
  getPermissionsAsync,
  setNotificationHandler,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription
} from 'expo-notifications';
import axios from 'axios';

import i18n from '../../Translations';

setNotificationHandler({
  handleNotification: async function(){
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    }
  }
});

function Promotions(){

  const notificationListenerRef = useRef();
  const responseListenerRef = useRef();
  const [expoNotificationToken, setExpoNotificationToken] = useState('');
  const code = useSelector(state => state.root.code);
  const [notification, setNotification] = useState(false);
  i18n.locale = code;

  const getExpoNotificationTokenAsync = useCallback(async function(){
    if(!isDevice){
      Alert.alert('Sorry Expo notification only working on real device');
      return;
    }

    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;

    if(finalStatus !== 'granted'){
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }

    if(finalStatus !== 'granted'){
      Alert.alert(
        'Error',
        'Sorry, we need your permission to enable push notification',
        [
          {
            text: 'Ok'
          },
          {
            text: 'Open setting',
            onPress: () => openSettings()
          }
        ]
      );
    }

    const { data } = await getExpoPushTokenAsync();

    return data;
  }, []);

  useEffect(function(){
    (async function(){
      const token = await getExpoNotificationTokenAsync();
      setExpoNotificationToken(token);

      notificationListenerRef.current = addNotificationReceivedListener(function(notification){
        setNotification(notification);
      });

      responseListenerRef.current = addNotificationResponseReceivedListener(function(response){
        console.log(response)
      });
    })();

    return function(){
      removeNotificationSubscription(notificationListenerRef.current);
      removeNotificationSubscription(responseListenerRef.current);
    }
  }, [getExpoNotificationTokenAsync]);

  async function onPushNotificationPress(){
    const message = {
      to: expoNotificationToken,
      sound: 'default',
      title: 'Notification title',
      body: 'Notification body',
      data: {
        someData: 'Notification data'
      }
    };

    try {
      await axios.post('https://exp.host/--/api/v2/push/send', message);
    }catch(err){
      console.log(err.response.data);
    }
  }

  return (
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center }>
        <Text style={{ ...globalStyles.title, ...globalStyles.textBold }}>
          { i18n.t('notification.No notification') }
        </Text>
        <Button title="Push notification" onPress={ onPushNotificationPress } />
      </View>
    </View>
  );
}

export default Promotions;