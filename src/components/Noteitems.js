import React, { useContext } from 'react'
import Context from '../Context'

export default function Noteitems(props) {
    const { notes, updateNote} = props
    const context =useContext(Context);
    const {deleteNote}=context;
    return (
        <div className="row card d-flex justify-content-center my-4">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <span className="badge text-bg-warning">{notes.tag}</span>
          <p className="card-text">{notes.description}</p>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(notes)}}></i>
          <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(notes._id)}}></i>
        </div>
      </div>
    )
}
