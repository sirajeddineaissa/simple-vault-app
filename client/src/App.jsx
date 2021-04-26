import './App.css';
import {useState} from 'react';
import axios from "axios";



function App() {
  const [password,setPassword] = useState("");
  const [service,setService] = useState("");
  const addPassword = ()=>{
    axios.post("http://localhost:3001/addpassword",{
      password: password,
      service: service,
    });
  }
  return (
    <div className="App">
      <div className="pass">
        <input type="text" onChange={(event)=>{
          setPassword(event.target.value);
        }}/>
        <input type="password" onChange={(event)=>{
          setService(event.target.value);  
      }}/>
        <button onClick={addPassword}>Add</button>
      </div>
    </div>
  );
}

export default App;
