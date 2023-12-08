import {useEffect, useState} from 'react';
import axios from 'axios'

const useFetchTypes = () => {
    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/types')
                setTypes(response.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchTypes()
    }, [])

    return {types, loading, error}
}

export default useFetchTypes
