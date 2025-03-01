import React from 'react'
import { useLocation } from 'react-router-dom'

const project = () => {
    const location = useLocation()
    console.log(location.state)
  return (
    <div>
      project
    </div>
  )
}

export default project
