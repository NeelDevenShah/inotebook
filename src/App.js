import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Context from "./Context";

function App() {
  const note=[
    {
      "_id": "62b47d7d2dbabc3157a140e2",
      "user": "62b1d134a0376af5678a30dc",
      "title": "second note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:33.760Z",
      "__v": 0
    },
    {
      "_id": "62b47d832dbabc3157a140e4",
      "user": "62b1d134a0376af5678a30dc",
      "title": "third note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:39.975Z",
      "__v": 0
    },
    {
      "_id": "62b47d892dbabc3157a140e6",
      "user": "62b1d134a0376af5678a30dc",
      "title": "fourth note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:45.968Z",
      "__v": 0
    },
    {
      "_id": "62b47d7d2dbabc3157a140e2",
      "user": "62b1d134a0376af5678a30dc",
      "title": "second note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:33.760Z",
      "__v": 0
    },
    {
      "_id": "62b47d832dbabc3157a140e4",
      "user": "62b1d134a0376af5678a30dc",
      "title": "third note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:39.975Z",
      "__v": 0
    },
    {
      "_id": "62b47d892dbabc3157a140e6",
      "user": "62b1d134a0376af5678a30dc",
      "title": "fourth note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:45.968Z",
      "__v": 0
    },
    {
      "_id": "62b47d7d2dbabc3157a140e2",
      "user": "62b1d134a0376af5678a30dc",
      "title": "second note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:33.760Z",
      "__v": 0
    },
    {
      "_id": "62b47d832dbabc3157a140e4",
      "user": "62b1d134a0376af5678a30dc",
      "title": "third note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:39.975Z",
      "__v": 0
    },
    {
      "_id": "62b47d892dbabc3157a140e6",
      "user": "62b1d134a0376af5678a30dc",
      "title": "fourth note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:45.968Z",
      "__v": 0
    },
    {
      "_id": "62b47d7d2dbabc3157a140e2",
      "user": "62b1d134a0376af5678a30dc",
      "title": "second note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:33.760Z",
      "__v": 0
    },
    {
      "_id": "62b47d832dbabc3157a140e4",
      "user": "62b1d134a0376af5678a30dc",
      "title": "third note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:39.975Z",
      "__v": 0
    },
    {
      "_id": "62b47d892dbabc3157a140e6",
      "user": "62b1d134a0376af5678a30dc",
      "title": "fourth note",
      "description": "this is my note by neel",
      "tag": "personal",
      "date": "2022-06-23T14:49:45.968Z",
      "__v": 0
    }
  ]
  const [notes, setNotes]=useState(note)
  
  return (
    <>
    <Context.Provider value={{notes, setNotes}}>
      <Router>
      <Navbar/>
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
