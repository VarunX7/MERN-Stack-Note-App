import React, { useContext, useEffect, useState } from 'react'
import alertContext from '../context/alert/alertContext'

const Alert = () => {
    const context = useContext(alertContext)
    const { alert } = context
    const [state, setState] = useState("")  

    useEffect(()=>{
        setState("")
        setTimeout(() => {
            setState("d-none")
        }, 1500);
    },[alert])

    return (
        <div className={`alert alert-${alert.type} fade show ${state} sticky-top`} role="alert">
            <div>{alert.message}</div>
        </div>
    )
}

export default Alert
