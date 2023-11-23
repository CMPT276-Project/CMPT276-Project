import React from 'react'
import {Link} from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import "../../styles/BackIcon.css"

function BackIcon() {

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="back-icon-container">
            <IoChevronBack className="back-icon" onClick={goBack} />
        </div>
    )
}

export default BackIcon