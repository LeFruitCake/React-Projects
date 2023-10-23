import axios from "axios";
import { useState } from "react";
import './App.css'


export default function App(){
    
    const [firstname,setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [uid,setUID] = useState();
    const [note,setNote] = useState();
    const [notes,setNotes] = useState([]);
    const RegisterUser = () =>{
    axios.post(`http://hyeumine.com/newuser.php`, {
        firstname: firstname,
        lastname: lastname,
        }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response=>{
        if(!(response.status===200 && response.statusText==="OK")){
            console.log("Error post request")
        }else if(response.data !== 0){
            setUID(response.data.id)
            console.log(response.data)
        }else{
            alert("Game code not found")
        }
    })
    .catch(error => {
        console.error("Problem with get operation",error)
    });
}

    const createNote = ()=>{
        console.log(uid)
        console.log(note)
        axios.post(`http://hyeumine.com/newnote.php`, {
            id: uid,
            note: note,
            }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response=>{
            if(!(response.status===200 && response.statusText==="OK")){
                console.log("Error post request")
            }else{
                axios.get('http://hyeumine.com/mynotes.php', {
                    params: {
                        id: uid 
                    }
                })
                .then(response => {
                    console.log(response.data); 
                    setNotes(response.data.notes); 
                    console.log(notes)
                })
                .catch(error => {
                    console.error("Error in GET request:", error);
                });
            }
        })
        .catch(error => {
            console.error("Problem with get operation",error)
        });
    }
    return(
        
        <>
          <div className="container">
            <div className="sub-container">
              <div className="Createnote">
                  <h2>Create New Note</h2>
                  <h3>Enter text:</h3>
                  <textarea onChange={(e)=>setNote(e.target.value)}></textarea>
                  <button onClick={createNote}>Create Note</button>
              </div>
              <div className="Createuser">
                  <h2>Create New User</h2>
                  <label>Enter firstname:</label>
                  <input type='text' name='firstname' onChange={(e)=>setFirstname(e.target.value)}></input><br/>
                  <label>Enter lastname:</label>
                  <input type='text' name='lastname' onChange={(e)=>setLastname(e.target.value)}></input>
                  <button onClick={RegisterUser}>Create User</button>
              </div>
              
          </div>
          <div className="Notes">
              <h2>Notes</h2>
              <div>
                  {uid}
              </div>
              <h3>Search id</h3>
              <input type='text'></input>
              <div className="task">
              {Array.isArray(notes) ? (
                  notes.map((note, index) => (
                      <div  key={index}>
                      <h3>{note[0]}</h3>
                      <h4>{note[1]}</h4>
                      </div>
                  ))
                  ) : (
                  <p>No notes available.</p>
                  )}
              </div>
            </div>
          </div>
        </>
        
    )
}