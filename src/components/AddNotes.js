import React, { useContext, useState } from 'react'
import Context from '../Context'

export default function AddNotes() {
    const context = useContext(Context);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
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
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                        <div id="extrahe" className="form-text">Make an short and topic understanding title</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-secondary">Add Notes</button>
                </form>
            </div>
        </div>
    )
}
