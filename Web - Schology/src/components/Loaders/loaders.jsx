import React from 'react'
import Loader from 'react-loaders'
import 'loaders.css';
const Loaders = ({type, text, color}) => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Loader type={type} active color={color}/>
            <span>{text}</span>
        </div>
    )
}
export default Loaders;