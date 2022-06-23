import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const About=()=>{
  const a=useContext(noteContext)
  return (
    <div>
      My name is=
    </div>
  )
}

export default About;