import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

function AddNote() {
  const context = useContext(NoteContext)
  const { addNote } = context

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>Add a note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label" >Title</label>
        <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label" >Description</label>
        <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} value= {note.description} />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value ={note.tag} placeholder="eg.; important!!" />
      </div>
      <div className="col-12">
        <button disabled = {note.title.length < 5 || note.description.length<5 } type="submit" className="btn btn-success" onClick={onClick}>Add This Note</button>
      </div>
    </div>
  )
}

export default AddNote