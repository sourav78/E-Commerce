import React from "react";
import { notification } from 'antd';

const Notification = ({ type, message }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = () => {
        api[type]({
            description: message,
            placement: 'bottomRight',
        });
    };

    return contextHolder;
};

// Named export for contextHolder
export const NotificationContext = notification.useNotification;

// Named export for openNotificationWithIcon
export const openNotificationWithIcon = (type, message) => {
    const [api] = notification.useNotification();
    api[type]({
        description: message,
        placement: 'bottomRight',
    });
};

export default Notification;
