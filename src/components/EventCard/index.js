import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';
import classes from './EventCard.module.css';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const EventCard = ({ data, viewDetails, loading }) => {
    const { id, title, description } = data;
    const navigate = useNavigate();
    return (
        <Card
            loading={loading}
            className={classes["eventCard"]}
            actions={[
                <EyeOutlined key="view full details" onClick={() => navigate(`/event/${id}`)} />,
                // <SettingOutlined key="setting" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={title}
                description={description}
            />
        </Card>
    )
};
export default EventCard;