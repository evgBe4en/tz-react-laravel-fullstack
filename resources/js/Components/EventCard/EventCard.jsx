import React, {useState} from 'react'
import EditEventForm from "@/Components/EditEventForm/EditEventForm.jsx"

const EventCard = ({event, onClose}) => {

    const [isEditFormOpen, setEditIsFormOpen] = useState(false);

    console.log(event)

    let formTypeClass = ''

    switch (event.type.title) {
        case 'Meeting with an expert':
            formTypeClass = 'red'
            break
        case 'Question-answer':
            formTypeClass = 'green'
            break
        case 'Conference':
            formTypeClass = 'yellow'
            break
        case 'Webinar':
            formTypeClass = 'blue'
            break
        default:
            formTypeClass = ''
    }

    return (
        <>
            <div className='eventCard-container'>
                <div className='eventCard-content'>
                    <h3 className='eventCard-name'>{event.name}</h3>
                    <button className='eventCard-edit' onClick={() => setEditIsFormOpen(true)}>e</button>
                </div>
                <div className='eventCard-desc'>{event.description}</div>
                <div className='eventCard-location'>{event.location}</div>
                <div className='eventCard-outline'>
                    <div className='eventCard-datetime'>
                        {event.date} at {event.time}
                    </div>
                    <div className={`eventCard-type ${formTypeClass}`}>{event.type.title}</div>
                </div>
            </div>
            {isEditFormOpen && (
                <EditEventForm onClose={onClose} event={event}/>
            )}
        </>
    )
}
export default EventCard
