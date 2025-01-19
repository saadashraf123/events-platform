import React from 'react'
import { Avatar, Card } from 'antd';
import classes from './AvatarSection.module.css';

const AvatarSection = ({ name, size }) => {
    return (
        <div className={classes["main"]}>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" size={size} />
            <p className={size > 36 ? classes["creator"] : classes["others"]}>{name}</p>
        </div>
    )
}
export default AvatarSection