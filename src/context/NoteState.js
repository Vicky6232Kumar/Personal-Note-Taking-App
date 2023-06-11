
import NoteContext from './noteContext';
import { useState } from "react";


const NoteState = (props) => {
  const url = "http://localhost:5000";
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)

  // Fetch a note

  const fetchNote = async () => {

    // API call to fetch all the notes from database 

    const response = await fetch(`${url}/api/notes/fetchAllNotes`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    const json = await response.json();
    setNotes(json)


  }



  // Add a note

  const addNote = async (title, description, tag) => {

    // API call with logic to add a note to the database

    const response = await fetch(`${url}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();

    // Logic to add a note by client 
    
    setNotes(notes.concat(note))

  }



  // Delete a note

  
  const deleteNote = async (id) => {

    // Logic to delete a note in database

    const response = await fetch(`${url}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      }
    });
    
    const json = await response.json();
    console.log(json)

    // Logic for Delete a note from client side

    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }



  // Edit a note

  const editNote = async (id, title, description, tag) => {

    // API call with logic to edit the notes in database

    const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });


    // Logic to edit the notes from client side 

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {

        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;

      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, fetchNote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}


export default NoteState;
