import React, {useEffect, useState} from 'react'
import {DayPicker} from "react-day-picker"
import PopUp from "@/Components/PopUpComponent/PopUp.jsx"
import CreateEventForm from "@/Components/CreateEventForm/CreateEventForm.jsx"
import EditEventForm from "@/Components/EditEventForm/EditEventForm.jsx"
import useFetchEvents from "@/hooks/useFetchEvents.jsx"
import Filter from "@/Components/FilterComponent/Filter.jsx"

const MouthList = () => {

    const today = new Date()
    const [selectedDay, setSelectedDay] = useState(today)
    const [showPopup, setShowPopup] = useState(false)
    const [isCreateFormOpen, setCreateIsFormOpen] = useState(false)
    const [isEditFormOpen, setEditIsFormOpen] = useState(false)
    const [selectedEvents, setSelectedEvents] = useState([])
    const [activeParamsFilters, setActiveParamsFilters] = useState([])


    console.log(activeParamsFilters)


    const {events, loading, error} = useFetchEvents(activeParamsFilters)
    console.log(events)

    const {data} = events

    useEffect(() => {
        setSelectedEvents(data)
    }, [events])


    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    const handleEditOpenForm = () => {
        setEditIsFormOpen(true)
        setShowPopup(false)
    }

    const handleEditCloseForm = () => {
        setEditIsFormOpen(false)
    }

    const handleCreateOpenForm = () => {
        setCreateIsFormOpen(true)

        setShowPopup(false)
    }

    const dateStr = selectedDay.getDate() + '-' +
        (selectedDay.getMonth() + 1) + '-' +
        selectedDay.getFullYear()

    const handleDayClick = day => {
        setSelectedDay(day)
        const filteredEvents = events && events.filter((event) => {
            const dateParts = event.date.split("-")
            const formatDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
            return formatDate.getDate() === day.getDate() &&
                formatDate.getMonth() === day.getMonth() &&
                formatDate.getFullYear() === day.getFullYear()
        })
        setSelectedEvents(filteredEvents)
        setShowPopup(true)
    }

    let eventStyle = {
        border: '1px solid white',
        // borderTop: '1px solid red',
        // borderRight:'1px solid green',
        // borderBottom:'1px solid yellow',
        // borderLeft:'1px solid blue',
    }

    const eventDaysMod = events && events.map(event => {
        const dateParts = event.date.split("-")
        // const { title } = event.type
        // if (title === 'Meeting with an expert') {
        //     eventStyle.borderTop = '1px solid red'
        // }
        //
        // if (title === 'Question-answer') {
        //     eventStyle.borderRight = '1px solid green'
        // }

        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
    })

    return (
        <>
            <Filter setActiveParamsFilters={setActiveParamsFilters}/>
            <div className='mount-container'>
                <DayPicker
                    modifiers={{event: eventDaysMod}}
                    modifiersStyles={{event: eventStyle}}
                    id='calendar'
                    styles={{
                        caption: {color: '#FFFAFB', textAlign: 'start'},
                        caption_label: {fontSize: '32px'},
                        head_cell: {color: '#797979', fontSize: '16px'},
                        cell: {color: '#FFFAFB', fontSize: '16px'},
                    }}
                    weekStartsOn={1}
                    required
                    mode={'single'}
                    selected={selectedDay}
                    onDayClick={handleDayClick}
                    showOutsideDays
                    disableNavigation
                    numberOfMonths={3}
                    fromMonth={new Date(2023, 11)}
                    toDate={new Date(2024, 1, 31)}
                />
                <DayPicker
                    modifiers={{event: eventDaysMod}}
                    modifiersStyles={{event: eventStyle}}
                    id='calendar'
                    styles={{
                        caption: {color: '#FFFAFB', textAlign: 'start'},
                        caption_label: {fontSize: '32px'},
                        head_cell: {color: '#797979', fontSize: '16px'},
                        cell: {color: '#FFFAFB', fontSize: '16px'},
                    }}
                    weekStartsOn={1}
                    required
                    mode={'single'}
                    selected={selectedDay}
                    onDayClick={handleDayClick}
                    showOutsideDays
                    disableNavigation
                    numberOfMonths={3}
                    fromMonth={new Date(2024, 2)}
                    toDate={new Date(2024, 8, 31)}
                />

                {showPopup && (
                    <PopUp
                        selectedEvents={selectedEvents}
                        day={selectedDay}
                        onClose={() => setShowPopup(false)}
                        onCreateOpenForm={handleCreateOpenForm}
                        onEditOpenForm={handleEditOpenForm}
                        OnCloseEditForm={handleEditCloseForm}
                    />
                )}

                {isCreateFormOpen && (
                    <CreateEventForm selected={dateStr} onClose={() => setCreateIsFormOpen(false)}/>
                )}

                {isEditFormOpen && (
                    <EditEventForm onClose={handleEditCloseForm}/>
                )}

            </div>
        </>
    )
}
export default MouthList
