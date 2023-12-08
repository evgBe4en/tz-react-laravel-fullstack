import React, {useState} from 'react'

const Filter = ({setActiveParamsFilters}) => {

    const [activeColorFilters, setActiveColorFilters] = useState([])

    const handleClick = (buttonColor, value) => {
        setActiveColorFilters((prev) => {
            if (prev.includes(buttonColor)) {
                return prev.filter((color) => color !== buttonColor)
            } else {
                return [...prev, buttonColor]
            }
        })
        setActiveParamsFilters((prev) => {
            if (prev.includes(value)) {
                return prev.filter((param) => param !== value)
            } else {
                return [...prev, value]
            }
        })
    }


    return (
        <>
            <div className='filter-container'>
                <h2 className='filter-title'>Calendar</h2>
                <div className='filter-buttons'>
                    <button
                        className={`filter-button ${activeColorFilters.includes('red') ? 'redActive' : 'red'}`}
                        onClick={() => handleClick('red', 'Meeting with an expert')}
                    >
                        Meeting with an expert
                    </button>
                    <button
                        className={`filter-button ${activeColorFilters.includes('green') ? 'greenActive' : 'green'}`}
                        onClick={() => handleClick('green', 'Question-answer')}
                    >
                        Question-answer
                    </button>
                    <button
                        className={`filter-button ${activeColorFilters.includes('yellow') ? 'yellowActive' : 'yellow'}`}
                        onClick={() => handleClick('yellow', 'Conference')}
                    >
                        Conference
                    </button>
                    <button
                        className={`filter-button ${activeColorFilters.includes('blue') ? 'blueActive' : 'blue'}`}
                        onClick={() => handleClick('blue', 'Webinar')}
                    >
                        Webinar
                    </button>
                </div>
            </div>
        </>
    )
}
export default Filter
