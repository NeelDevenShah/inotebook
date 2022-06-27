import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import Alerts from "./components/Alerts";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Context from "./Context";

function App() {
  const host="http://localhost:5000"
  const note=[]
  const [notes, setNotes]=useState(note);

  //Get all notes
  const getNotes=async()=>{
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
     },
   });
   const json=await response.json();
   setNotes(json);
 }

  //Add a note
  const addNote=async(title, description, tag)=>{
     //API Call
     const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    //Logic to add in client

    const note1=await response.json; 
    getNotes();
  }

  //Delete a note
  const deleteNote=async (delId)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${delId}`, {  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
  });

  //For internal instant delete
  const newNotes=notes.filter((note1)=>{return note1._id !== delId})
  setNotes(newNotes);
  showAlert("Delete Successful","danger")
}
  //Edit a note
  const editNote=async(id, title, description, tag)=>{
    //API Call
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag} )
    });
    const json=await response.json();

    //Logic to edit in client
    let newNotes=JSON.parse(JSON.stringify(notes))
    for(let index=0; index<notes.length;index++){
      const element=notes[index];
      if(element._id === id)
      {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  const [alert, setAlert]=useState({
    msg: "",
    type: ""
  });
  const showAlert=(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert({
        msg: "",
        type: ""
      })
    }, 3500);
  }

  return (
    <>
    <Context.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes, showAlert, alert}}>
      <Router>
      <Navbar/>
      <Alerts/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
        </div>
        </Router>
        </Context.Provider>
    </>
  );
}

export default App;