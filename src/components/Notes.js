import React, { useContext, useEffect, useRef, useState} from 'react'
import Context from '../Context'
import AddNotes from './AddNotes';
import Noteitems from './Noteitems';
export default function Notes() {
  const context = useContext(Context);
  const { notes, getNotes } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  useEffect(() => {
    getNotes()
  }, [])

  const ref = useRef(null)
  const refClose=useRef(null)

  const updateNote = (note) => {
    // console.log("neel shah")
    ref.current.click();
    setNote({utitle: note.title,udescription: note.description,utag: note.tag});
  }

  const onChange=(event)=>{
    setNote({...note, [event.target.name]: event.target.value})
  }

  const onClick=(event)=>{
    event.preventDefault();
    console.log("Updating note...", note)
    refClose.current.click();
    //Work to do
  }

  return (
    <>
      <AddNotes />
      {/* ------------------------------------------------------------------ */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Starting of the form */}
              <div className='container my-4'>
                <h2>Make edit where you want to update</h2>
                <form className='my-3'>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" value={note.utitle} onChange={onChange} className="form-control" id="utitle" name='utitle' aria-describedby="emailHelp"/>
                    <div id="extrahe" className="form-text">Make an short and topic understanding title</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" value={note.udescription} onChange={onChange} className="form-control" id="udescription" name='udescription'/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" value={note.utag} onChange={onChange} className="form-control" id="utag" name='utag' />
                  </div>
                </form>
              </div>
              {/* Ending of the form */}
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={onClick} className="btn btn-secondary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------ */}
      <div className="container my-3">
        <h2>See your added notes here</h2>
        {notes.map((notes) => {
          return <Noteitems key={notes._id} updateNote={updateNote} notes={notes} />
        })}
      </div>
    </>
  )
}
