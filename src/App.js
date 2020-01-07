import React, {useState} from 'react'
import styled from 'styled-components'

import logo from './logo.svg'
import './App.css'

import Store from './store/store'
import { observer } from "mobx-react"

const App = observer(() => {
  const store = new Store()
  // store.contacts
  // store.update_contact(rest, id)
  function handleCreateContact(data) {
    store.new_contact(data)
  }
  function updateContact(id, property, value) {
    store.update_contact(id, property, value)
  }
  return (
    <Main>
      <header>
        <h1>Contacts</h1>
        <CreateContact createContact={handleCreateContact}/>
        <button onClick={() => store.reset()}>Reset</button>
      </header>
      <main>
        {/* TODO sort by something */}
        {Object.values(store.contacts).map(c => (
          <Contact
            key={c.id}
            name={c.name}
            notes={c.notes}
            updateName={(value) => updateContact(c.id, "name", value)}
            updateNotes={(value) => updateContact(c.id, "notes", value)}
          />
        ))}
      </main>
    </Main>
  )
})
const Main = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: #eee;
`

function Contact({name}) {
  return (
    <ContactStyled>
      <h3>{name}</h3>
      <button>Add info</button>
    </ContactStyled>
  )
}
const ContactStyled = styled.div`
  padding: 3px 2px;
  border: 1px solid black;
`

function CreateContact({createContact}){
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")

  if (!creating)
    return <button onClick={() => setCreating(true)}>+ Add contact</button>

  function handleSubmit(e) {
    console.log('here')
    e.preventDefault()
    createContact({name, notes})
    setName("")
    setNotes("")
    setCreating(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Name:</label>
      <input type="text" name="contact-name" onChange={e => setName(e.target.value)}/>
      <label htmlFor="contact-notes">Notes:</label>
      <input type="text" name="contact-notes" onChange={e => setNotes(e.target.value)}/>
      <input type="submit"/>
    </form>
  )
}

export default App;
