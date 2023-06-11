import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/noteContext';
import Noteitem from './Noteitem';
import AddNote from "./AddNote"
import { useNavigate } from "react-router-dom";

function Notes() {
    const context = useContext(NoteContext)
    const { notes, fetchNote, editNote} = context
    const navigate = useNavigate();

    const [note, setNote] = useState({ id:  "", etitle: "", edescription: "", etag: "" })


    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetchNote();
        }
        else{
            navigate('/login')
        }
    })

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id : currentNote._id , etitle : currentNote.title, edescription: currentNote.description, etag : currentNote.tag})
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value})

    }
    const handleClick = (e) =>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }
    return (
        <>
            <AddNote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label" >Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange= {onChange}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label" >Description</label>
                                <input className="form-control" id="edescription" name="edescription" value={note.edescription} onChange= {onChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange= {onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='row my-3'>
                <h4>Your Notes</h4>
                <div className="mx-1">
                {notes.length === 0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem note={note} updateNote={updateNote} key={note._id} />;
                })}
            </div>
        </>
    )
}

export default Notes