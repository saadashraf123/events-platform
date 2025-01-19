import React, { useEffect } from 'react'
import classes from './Home.module.css'
import EventCard from '../../components/EventCard';
import useEvent from '../../Hooks/useEvent';
import AppLoader from '../../components/AppLoader';
const Home = () => {
    const { fetchEventList, eventList, loading } = useEvent();

    useEffect(() => {
        fetchEventList()
    }, [])
    return (
        <div className={classes["mainWrapper"]}>
            {loading ? <AppLoader /> :
                eventList?.length ? eventList?.map((item, index) => (
                    <EventCard key={item?.id} data={item} loading={loading} />
                ))
                    : <h1>No Event Found</h1>
            }
        </div>
    )
}

export default Home;