import React, { useState } from 'react'
import alertContext from './alertContext'

const AlertState = (props) => {

    const [alert, setAlert] = useState({type: "", message: ""})

    const getAlert = (type, message)=>{
        setAlert({type, message})
    }

  return (
    <alertContext.Provider value={{alert, getAlert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState
