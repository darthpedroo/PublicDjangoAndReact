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
        if (id ==="new") return
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
    
    let createNote = async () => {
        try {
            const response = await fetch(`/api/notes/create`, {
                method: "POST",
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
  


    let updateNote = async () => {
        try {
            
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
        console.log('NOTE:', note)
        if(id !== 'new' && !note.body ){
            console.log(1)
            deleteNote()
        }else if(id !== 'new'){
            console.log(2)
            console.log(note.body)
            updateNote()
        }else if(id === 'new' && note?.body !== null){
            console.log(3)
            createNote()
        }
        navigate('/')
    }

    let handleChange = (value) =>{
        setNote(note => ({...note, 'body': value}))
        console.log("Handle Change:",note)

    }

  return (
    <div className = "note">
        <div className = "note-header">
            <h3>              
                <ArrowLeft onClick ={handleSubmit}></ArrowLeft>    
            
            </h3>
            
            {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

        </div>
        
        <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>    </div>
  )
}

export default NotePage
