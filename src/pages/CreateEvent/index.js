import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import { MyInput } from "../../components/MyInput";
import classes from "./CreateEvent.module.css";
import useEvent from "../../Hooks/useEvent";
import MyDatePicker from "../../components/MyDatePicker";
import MyDropdown from "../../components/MyDropdown";

const CreateEvent = () => {
    const { eventForm, userList, loading, fetchUserList } = useEvent()
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <>
            <div className={classes["mainWrapper"]}>
                <div className={classes["cardStyles"]}>
                    <div className={classes["header"]}>
                        <h1>Create New Event</h1>
                    </div>
                    <MyInput
                        name="title"
                        label={"Event Title"}
                        value={eventForm.values.title}
                        setter={(value) => eventForm.setFieldValue("title", value)}
                        placeholder={"Enter Event title name "}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={eventForm.errors.title}
                    />
                    <MyInput
                        name="description"
                        label={"Event Description"}
                        value={eventForm.values.description}
                        setter={(value) => eventForm.setFieldValue("description", value)}
                        placeholder={"Enter Event Description"}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={eventForm.errors.description}
                    />
                    <MyInput
                        name="location"
                        label={"Event Location"}
                        value={eventForm.values.location}
                        setter={(value) => eventForm.setFieldValue("location", value)}
                        placeholder={"Enter Event Location "}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={eventForm.errors.location}
                    />
                    <MyDatePicker
                        name="date"
                        label={"Event Date"}
                        value={eventForm.values.date}
                        setter={(value) => eventForm.setFieldValue("date", value)}
                        placeholder={"Enter Event Date "}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={eventForm.errors.date}
                    />
                    <MyDropdown
                        name="participants"
                        label={"Invite Participants"}
                        value={eventForm.values.participants}
                        setter={(value) => eventForm.setFieldValue("participants", value)}
                        placeholder={"Select Participants"}
                        required={true}
                        labelStyle={{ fontWeight: 600 }}
                        errorText={eventForm.errors.participants}
                        isMulti={true}
                        options={userList?.map((user) => ({
                            value: user.id,
                            label: user.username,
                        }))}
                    />
                    <div className={classes["btnContainer"]}>
                        <MyButton
                            variants="secondary"
                            label={"Cancel"}
                            onClick={() => navigate("/")}
                            className={classes["btnExtraStyles"]}
                        />
                        <MyButton
                            variants="primary"
                            label={"Create Event"}
                            type="submit"
                            disabled={loading}
                            onClick={eventForm.handleSubmit}
                            className={classes["btnExtraStyles"]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateEvent;
