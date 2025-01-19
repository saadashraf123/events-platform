import React from 'react'
import { Avatar, Card } from 'antd';
import classes from './MessageItem.module.css';
import { formatTimestamp } from '../../helpers';

const MessageItem = ({ text, user, time }) => {
    return (
        <div className={classes["main"]}>
            <div className={classes["header"]}>
                <div className={classes["userDetails"]}>
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" size={30} />
                    <p className={classes["username"]}>{user}</p>
                </div>
                <p>{formatTimestamp(time?.seconds)}</p>
            </div>
            <p className={classes["message"]}>{text}</p>
        </div>
    )
}
export default MessageItem