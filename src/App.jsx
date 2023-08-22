import "./App.css";
import allContacts from "../src/contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));

  const handleAddContact = () => {
    console.log("intento añadir nuevo contacto");
    let randomIndex = Math.floor(Math.random() * allContacts.length);
    let randomActor = allContacts[randomIndex];
    console.log(randomActor)

    let repeatedActor = contacts.find((eachContact) => {
      if (eachContact.id === randomActor.id) { //compruebo si tenemos un actor duplicado
        console.log("elemento duplicado", randomActor.name)
        return true;
      }
    });

    if (repeatedActor !== undefined){
      handleAddContact
      return;
    }

    let cloneContacts = JSON.parse(JSON.stringify(contacts));
    cloneContacts.unshift(randomActor);

    setContacts(cloneContacts);
  }

  const handleSortNameContact = () => {
    console.log("intento de ordenar por nombre");
    let cloneContacts = JSON.parse(JSON.stringify(contacts));

    cloneContacts.sort((actor1, actor2) => {
      return actor1.name > actor2.name ? 1 : -1
    });
      setContacts(cloneContacts)
  };

  const handleSortPopularityContact = () => {
    console.log("intento de ordenar por popularidad");
    let cloneContacts = JSON.parse(JSON.stringify(contacts));
    cloneContacts.sort((actor1, actor2) => {
      return actor1.popularity > actor2.popularity ? -1 : 1
    });
      setContacts(cloneContacts)
  }

  const handleDeleteContact = (index) => {
    console.log("intento de eliminar");
    let cloneContacts = JSON.parse(JSON.stringify(contacts));
    cloneContacts.splice(index, 1);
    // let filteredContacts = contacts.filter((eachContact) => {
    //   if (eachContact.id === id){
    //           return false
    //         } else {
    //             return true
    //         }
    // })
    
    setContacts(cloneContacts)
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={handleAddContact}>Añadir uno nuevo</button>
      <br />
      <button onClick={handleSortNameContact}>Ordenar Nombre</button>
      <br />
      <button onClick={handleSortPopularityContact}>Ordenar Popularity</button>
      <br />
      <table>
        <thead>
          <tr>
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
            <td>Won Oscar</td>
            <td>Won Emy</td>
            <td>Actions</td>
          </tr>
          <br />
        </thead>
        {contacts.map((eachContact, i) => {
          return (
            <tbody>
              <tr>
                <td>
                  <img src={eachContact.pictureUrl} width={125} />
                </td>
                <td>{eachContact.name}</td>
                <td>{eachContact.popularity.toFixed(2)}</td>
                <td>{eachContact.wonOscar === true ? "🏆" : null}</td>
                <td>{eachContact.wonEmmy === true ? "🌟" : null}</td>
                <td><button onClick={() => handleDeleteContact(i)}>Eliminar</button></td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
