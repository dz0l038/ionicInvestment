import React, { useEffect } from 'react';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
} from '@capacitor/core';
import { useHistory } from 'react-router';

const { PushNotifications } = Plugins;
const Notifications: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(result => {
            if (result.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                console.log("Don't have permission to add push notifications")
            }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                console.log('Push registration success, token: ' + token.value);
            }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                console.log('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                const data = notification.notification.data;
                console.log('Push action performed: ' + JSON.stringify(notification));
                if (data.route) {
                    history.push(data.route)
                }
            }
        );
    }, [])
    return null
}

export default Notifications