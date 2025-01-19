import { useState } from 'react';
import { toast } from "react-toastify";
import { addEvent, addMessage, fetchEvents, fetchUsers, getEventDetailsByIdWithMessages } from '../api';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const useEvent = () => {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([])
    const [userList, setUserList] = useState([])
    const [eventDetails, setEventDetails] = useState(null)
    const [loading, setLoading] = useState(false)

    const eventForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            location: "",
            date: "",
            participants: [],
            messages: [],
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Event title is required"),
            description: Yup.string()
                .required("Event Description is required"),
            location: Yup.string()
                .required("Event location is required"),
            date: Yup.string()
                .required("Event title is required"),
        }),
        onSubmit: async (values) => {
            const body = { ...values, participants: values?.participants?.map((participant) => participant.value) }
            setLoading(true);
            addEvent(body)
                .then((data) => {
                    toast.success("Event added successfully");
                    navigate("/")
                })
                .catch(() => toast.error("Error adding event, try again later"))
                .finally(() => {
                    setLoading(false);
                });
        },
    });

    const fetchEventList = async () => {
        setLoading(true);
        fetchEvents()
            .then((data) => {
                setEventList(data);
            })
            .catch(() => toast.error("Error fetching events, something went wrong"))
            .finally(() => {
                setLoading(false);
            });
    }

    const getEventById = async (id) => {
        setLoading(true);
        getEventDetailsByIdWithMessages(id)
            .then((data) => {
                setEventDetails(data);
            })
            .catch(() => toast.error("Error fetching event, something went wrong"))
            .finally(() => {
                setLoading(false);
            });
    }

    const addMessageHandler = async (eventId, message) => {
        if (message === "") {
            return toast.error("Message is required");
        }
        setLoading(true);
        addMessage(eventId, message)
            .then((data) => {
                toast.success("Message added successfully");
                getEventById(eventId);
            })
            .catch(() => toast.error("Error fetching event, something went wrong"))
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchUserList = async () => {
        setLoading(true);
        fetchUsers()
            .then((data) => {
                setUserList(data);
            })
            .catch(() => toast.error("Error fetching users, something went wrong"))
            .finally(() => {
                setLoading(false);
            });
    }


    return { eventList, userList, eventDetails, loading, eventForm, getEventById, fetchEventList, addMessageHandler, fetchUserList }
}

export default useEvent