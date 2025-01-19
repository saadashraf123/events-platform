import React, { useEffect, useState } from 'react'
import { Avatar, Card, message } from 'antd';
import { useParams } from 'react-router-dom';
import useEvent from '../../Hooks/useEvent';
import classes from './EventDetails.module.css';
import AvatarSection from '../../components/AvatarSection';
import MessageItem from '../../components/MessageItem';
import { MyInput } from '../../components/MyInput';
import MyButton from '../../components/MyButton';
import { formatTimestamp } from '../../helpers';


const EventDetails = () => {
    const { id } = useParams();
    const { getEventById, eventDetails, loading, addMessageHandler } = useEvent();
    const [showAllParticipants, setShowAllParticipants] = useState(false);
    const [showAllMessages, setShowAllMessages] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (id) getEventById(id)
    }, [id])

    return (
        <Card
            loading={loading}
            className={classes["eventCard"]}
        >
            <AvatarSection name={eventDetails?.createdByUser} size={50} />
            <h1 className={classes["eventTitle"]}>{eventDetails?.title}</h1>
            <p className={classes["eventDescription"]}>Description: {eventDetails?.description}</p>
            <p className={classes["eventLocation"]}>Location: <b>{eventDetails?.location}</b></p>
            <p className={classes["eventLocation"]}>Event Date and Time: <b>{formatTimestamp(eventDetails?.date?.seconds)}</b></p>

            {eventDetails?.participants?.length > 0 ? (
                <>
                    <h4>Participants</h4>
                    <div className={classes["participants"]}>
                        {eventDetails.participants.map((participant, index) => {
                            if (showAllParticipants || index < 3) {
                                return (
                                    <AvatarSection
                                        key={index}
                                        name={participant.username}
                                        size={36}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                    {eventDetails.participants.length > 3 && (
                        <span
                            className={classes["showMoreLess"]}
                            onClick={() => setShowAllParticipants((prev) => !prev)}
                        >
                            {showAllParticipants ? "Show less" : "Show more"}
                        </span>
                    )}
                </>
            ) : (
                <p>No Participants</p>
            )}

            {eventDetails?.messages?.length > 0 ? (
                <div style={{ marginBottom: 20 }} >
                    <h4>Messages</h4>
                    <div className={classes["messageDiv"]}>
                        {eventDetails.messages.map((message, index) => {
                            if (showAllMessages || index < 3) {
                                return (
                                    <MessageItem
                                        key={index}
                                        user={message.username}
                                        text={message.text}
                                        time={message.timestamp}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                    {eventDetails.messages.length > 3 && (
                        <span
                            className={classes["showMoreLess"]}
                            onClick={() => setShowAllMessages((prev) => !prev)}
                        >
                            {showAllMessages ? "Show less" : "Show more"}
                        </span>
                    )}
                </div>
            ) : (
                <p>No Messages to show</p>
            )
            }
            <div className={classes["newMessage"]}>
                <MyInput value={newMessage} setter={(value) => setNewMessage(value)} label={"New Message"} placeholder='Enter New Message' />
                <MyButton onClick={() => {
                    addMessageHandler(eventDetails?.eventId, newMessage)
                    setNewMessage("")
                }} label="Send" />
            </div>
        </Card>
    )
}

export default EventDetails

