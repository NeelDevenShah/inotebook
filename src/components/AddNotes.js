import React, { useContext, useState } from 'react'
import Context from '../Context'

export default function AddNotes() {
    const context = useContext(Context);
    const { addNote, showAlert} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        showAlert("Note Add Successful","success");
    }
    const onChange = (event) => {
        //As there are three dots it is said to be the spread operator
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div className='container my-4'>
                <h2>Add your notes here</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} placeholder="Enter title of minimum 3 characters"/>
                        <div id="extrahe" className="form-text">Make an short and topic understanding title</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} placeholder="Enter description of minimum 5 characters"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} placeholder="Enter tag of minimum 3 characters"/>
                    </div>
                    <button type="submit" disabled={note.title.length <3 || note.description.length <5 || note.tag.length <3} onClick={handleClick} className="btn btn-secondary">Add Notes</button>
                </form>
            </div>
        </div>
    )
}