import React from 'react'
import { Link } from 'react-router-dom'

let getTime = (note) => {
  console.log(note.updated)
  let date = new Date(note.updated)
  let day= date.toLocaleDateString()
  let time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(': ')
  return `${day}, at: ${time}`
}

let getTitle = (note) =>{
  let title = note.body
  while(title.startsWith("\n")){
    let i = 1
    title.slice(0,1)
    title = note.body.split('\n')[i]
    i+=1
  }
  title = note.body.split('\n')[0]
  if(title.length > 45){
      return title.slice(0,45)+'...'
  }
  return title
}


const ListItem = ({note}) => {
  return (
    <Link to = {`/note/${note.id}`}>
      <div className = "notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p><span>Updated: {getTime(note)}</span></p>
      </div>
    </Link>
  )
}

export default ListItem
