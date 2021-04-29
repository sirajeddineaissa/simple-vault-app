import './App.css';
import {useState,useEffect} from 'react';
import axios from "axios";


function App() {
  const [password,setPassword] = useState("");
  const [service,setService] = useState("");
  const [pList,setpList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/showpasswords").then((response) => {
      setpList(response.data);
    });
  }, []);

  const addPassword = ()=>{
    axios.post("http://localhost:3001/addpassword",{
      password: password,
      service: service,
    });
  }
  const decryptPassword = (encryption) => {
    axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setpList(
        pList.map((val) => {
          return val.id == encryption.id
            ? {
                id: val.id,
                password: val.password,
                service: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="pass">
        <input type="text" placeholder="password to encrypt" onChange={(event)=>{
          setPassword(event.target.value);
        }}/>
        <input type="password" placeholder="service" onChange={(event)=>{
          setService(event.target.value);  
      }}/>
        <button onClick={addPassword}>Add</button>
      </div>
      <div className="pass-container">
        {pList.map((val, key) => {
          return (
            <div
              className="decPass"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
            >
              <h3>{val.service}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
