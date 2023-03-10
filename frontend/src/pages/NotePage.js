import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom'

const NotePage = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    let[note,setNote] = useState(null)
    useEffect(()=>{
        getNote();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[id]);// BEWARE

    let getNote = async()=>{
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
        

    }
    let deleteNote = async () =>{
        fetch(`/api/notes/${id}/delete`,{ // <-- update the URL here
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let updateNote = async () => {
        try {
            console.log("ID:" ,id)
            const response = await fetch(`/api/notes/${id}/update`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note)
            });
            console.log("Response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    let handleSubmit = ()=>{
        updateNote()
        navigate('/')

    }

  return (
    <div className = "note">
        <div className = "note-header">
            <h3>              
                <ArrowLeft onClick ={handleSubmit}></ArrowLeft>    
            
            </h3>
            <button onClick = {deleteNote}>Delete</button>
        </div>
        
        <textarea onChange={(e) => {setNote({ ...note, body: e.target.value })}} defaultValue={note?.body}></textarea>    </div>
  )
}

export default NotePage
