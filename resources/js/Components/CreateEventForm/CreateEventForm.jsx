import React from 'react'
import {useForm} from "react-hook-form"
import useFetchTypes from "@/hooks/useFetchTypes.jsx"

const CreateEventForm = ({onClose, selected}) => {

    const {types, loading, error, fetchEvents} = useFetchTypes()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {

        const eventData = {
            ...data,
            date: selected,
        }

        await axios.post('http://127.0.0.1:8000/api/events', eventData)
            .then((response) => {
                onClose()
                console.log('Event created successfully:', response.data)
                return alert('Event created successfully')
            })
            .catch((error) => {
                console.error('Error creating event:', error)
            })
    }

    if (loading) {
        return <p>Loading types...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }


    return (
        <>
            <div className='form-container'>
                <form className='form-content' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-header'>
                        <h2 className='form-title'>Add event</h2>
                        <button className='form-closeButton' onClick={onClose}>x</button>
                    </div>
                    <input
                        className='form-input'
                        placeholder={'Event name...'}
                        {...register('name', {required: true, maxLength: 30})}
                    />
                    {errors.name && <p className='form-erorr'>This is required.</p>}
                    <textarea
                        className='form-textarea'
                        placeholder={'Event description...'}
                        {...register('description', {required: true, maxLength: 100})}
                    />
                    {errors.description && <p className='form-erorr'>This is required.</p>}
                    <input
                        className='form-input'
                        placeholder={'Location...'}
                        {...register('location', {required: true, maxLength: 30})}
                    />
                    {errors.location && <p className='form-erorr'>This is required.</p>}
                    <div className='form-date'>
                        <h3 className='form-day'>{selected} at</h3>
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
                            >
                                {type.title}
                            </option>
                        ))}
                    </select>
                    {errors.type && <p className='form-erorr'>This is required.</p>}
                    <div className='form-buttons'>
                        <button className='form-cancel'>Cancel</button>
                        <button type={"submit"} className='form-add'>Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateEventForm
