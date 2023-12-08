import React from 'react'
import EventCard from "@/Components/EventCard/EventCard.jsx";

const PopUp = ({onClose, onCreateOpenForm, onEditOpenForm, selectedEvents}) => {

    return (
        <>
            <div className='popup-container'>
                <div className='popup-header'>
                    <h2>Events</h2>
                    <button className='popup-closeButton' onClick={onClose}>x</button>
                </div>
                {selectedEvents && selectedEvents.map(event => (
                    <EventCard key={event.id} event={event} onClose={onClose} onEditOpenForm={onEditOpenForm}/>))}
                <button className='popup-addButton' onClick={onCreateOpenForm}>Add event</button>
            </div>
        </>
    )

}
export default PopUp
