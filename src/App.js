import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import Alerts from "./components/Alerts";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
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
       'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWQxMzRhMDM3NmFmNTY3OGEzMGRjIn0sImlhdCI6MTY1NTkwMjIzOH0.-9wRaEkd_-6J9m1TJEEhzODQLFVm-dJzm5JbjSeiXXc'
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWQxMzRhMDM3NmFmNTY3OGEzMGRjIn0sImlhdCI6MTY1NTkwMjIzOH0.-9wRaEkd_-6J9m1TJEEhzODQLFVm-dJzm5JbjSeiXXc'
      },
      body: JSON.stringify({title, description, tag})
    });

    //Logic to add in client

    const note1={
      "_id": "62b47d892dbabcvcadded3157a140e6",
      "user": "62b1d134a0376af5678addeda30dc",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-06-23T14:49:45.968Z",
      "__v": 0
    };
    setNotes(notes.concat(note1))
  }

  //Delete a note
  const deleteNote=async (delId)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${delId}`, {  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWQxMzRhMDM3NmFmNTY3OGEzMGRjIn0sImlhdCI6MTY1NTkwMjIzOH0.-9wRaEkd_-6J9m1TJEEhzODQLFVm-dJzm5JbjSeiXXc'
    },
  });

  //For internal instant delete
  const newNotes=notes.filter((note1)=>{return note1._id !== delId})
  setNotes(newNotes);
}
  //Edit a note
  const editNote=async(id, title, description, tag)=>{
    //API Call
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWQxMzRhMDM3NmFmNTY3OGEzMGRjIn0sImlhdCI6MTY1NTkwMjIzOH0.-9wRaEkd_-6J9m1TJEEhzODQLFVm-dJzm5JbjSeiXXc'
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

  return (
    <>
    <Context.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
      <Router>
      <Navbar/>
      <Alerts message="neel is my name"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
        </div>
        </Router>
        </Context.Provider>
    </>
  );
}

export default App;