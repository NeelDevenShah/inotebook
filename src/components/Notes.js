import React, { useContext } from 'react'
import Context from '../Context'
import Noteitems from './Noteitems';
export default function Notes() {
    const context=useContext(Context);
  const{notes, setNotes}=context;
   return (
    <div className="container my-3">
    <h2>See your added notes here</h2>
    {notes.map((notes)=>{
      return <Noteitems notes={notes}/>
    })}
    </div>
  )
}
