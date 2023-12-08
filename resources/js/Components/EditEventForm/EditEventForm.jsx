import React from 'react'
import {useForm} from "react-hook-form"
import useFetchTypes from "@/hooks/useFetchTypes.jsx"

const EditEventForm = ({onClose, event}) => {

    const {id, name, description, location, date, type} = event
    const {title} = type
    const {types, loading, error, fetchEvents} = useFetchTypes()

    const handleClose = () => {
        onClose()
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
        const eventData = {
            ...data,
            date: date,
        }

        await axios.patch(`http://127.0.0.1:8000/api/events/${id}`, eventData)
            .then((response) => {
                onClose()
                console.log('Event updating successfully:', response.data)
                return alert('Event updating successfully')

            })
            .catch((error) => {
                console.error('Error updating event:', error)
            })
    }

    function onDelete(id) {
        axios.delete('http://127.0.0.1:8000/api/events/' + event.id)
            .then(() => {
                onClose
                alert('Event deleting successfully:')
            })
            .catch(() => {
                alert('зрада')
            })
    }

    return (
        <>
            <div className='form-container'>
                <form className='form-content' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-header'>
                        <h2 className='form-title'>Edit event</h2>
                        <button type="button" className='form-closeButton' onClick={handleClose}>x</button>
                    </div>
                    <input
                        className='form-input'
                        placeholder={'Event name...'}
                        {...register('name', {required: true, maxLength: 30, value: name})}
                    />
                    {errors.name && <p className='form-erorr'>This is required.</p>}

                    <textarea
                        className='form-textarea'
                        placeholder={'Event description...'}
                        {...register('description', {value: description})}
                    />

                    <input
                        className='form-input'
                        placeholder={'Location...'}
                        {...register('location', {required: true, maxLength: 30, value: location})}
                    />
                    {errors.location && <p className='form-erorr'>This is required.</p>}

                    <div className='form-date'>
                        <h3 className='form-day'>{date} at</h3>
                        <select className='form-timeselect'
                                {...register('time', {required: true})}
                        >
                            <option>00:00</option>
                            <option>01:00</option>
                            <option>02:00</option>
                            <option>03:00</option>
                            <option>04:00</option>
                            <option>05:00</option>
                            <option>06:00</option>
                            <option>07:00</option>
                        </select>
                    </div>

                    <select className='form-typeselect' {...register('type', {required: true})} >
                        {types.map((type) => (
                            <option
                                className='form-option'
                                key={type.id}
                                selected={type.title === title}
                            >
                                {type.title}
                            </option>)
                        )}
                    </select>
                    <div className='form-buttons'>
                        <button type="button" className='form-cancel' onClick={handleClose}>Cancel</button>
                        <button type="button" className='form-delete' onClick={() => onDelete(id)}>Delete</button>
                        <button type='submit' className='form-add'>Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditEventForm
