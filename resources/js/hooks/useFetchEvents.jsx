import {useEffect, useState} from 'react'
import axios from 'axios'

const useFetchEvents = (activeParamsFilters) => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/events', {
                    params: {
                        type: activeParamsFilters,
                    },
                })
                setEvents(response.data.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchEvents()
    }, [activeParamsFilters])

    return {events, loading, error}
}

export default useFetchEvents
