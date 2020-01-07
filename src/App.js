import React, {useState} from 'react'
import styled from 'styled-components'

import logo from './logo.svg'
import './App.css'

import Store from './store/store'

function App() {
  const store = new Store()
  // store.contacts
  // store.update_contact(rest, id)
  function handleCreateContact(data) {
    store.update_contact(data)
  }
  console.log(Object.values(store.contacts))
  return (
    <Main store={store}>
      <header>
        <h1>Contacts</h1>
        <CreateContact createContact={handleCreateContact}/>
        <button onClick={() => store.reset()}>Reset</button>
      </header>
      <main>
        {Object.values(store.contacts).map(c => (
          <Contact
            key={c.id}
            name={c.name}
          />
        ))}
      </main>
    </Main>
  )
}

const Main = ({store, children}) => {
  console.log(store)
  return <div>{children}</div>
}
const StyledMain = styled.div`
  width: 400px;
  margin: 0 auto;
  background-color: #eee;
`



function Contact({name}) {
  return <div>{name}</div>
}

function CreateContact({createContact}){
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState("")

  if (!creating)
    return <button onClick={() => setCreating(true)} >+ Add contact</button>

  function handleSubmit(e) {
    e.preventDefault()
    createContact({name:name})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Name:</label>
      <input type="text" name="contact-name" onChange={e => setName(e.target.value)}/>
    </form>
  )
}

export default App;
