import logo from './logo.svg';
import './App.css';
import Header from './components/Header'

import {useState, useEffect} from 'react'

// https://randomuser.me/api

function App() {
  const [counter, setCounter] = useState(0);
  const [randomUserJSONData, setRandomUserJSONData] = useState('');
  const [users, setUsers] = useState([]);

  const fetch_data = async () => {
      const res = await fetch('https://randomuser.me/api')
      const data = await res.json()
      //console.log(data)
      return data//JSON.stringify(data, null, 2)
  }
  //console.log(fetch_data())

  const updateRandomUserData = async () => {
    const data = await fetch_data();
    setRandomUserJSONData(JSON.stringify(data, null, 2));
    console.log(data)
    // const newobject = {
    //   name: data.results[0].name.first,
    //   image: data.result[0].picture.thumbnail
    // }
    //setUsers(data.results);
    setUsers([...users,...data.results])
    console.log(users)
  }

  const getFullUserName = (userInfo) => {
    const {name: {first, last}} = userInfo;
    console.log(`${first} ${last}`)
    return `${first} ${last}`
    //return `${userInfo[0].name.first} ${userInfo[0].name.last}`
    //return userInfo.
  }

  return (
    

    <div className="App">
      <Header></Header>
      <button onClick = {()=>{setCounter(counter+1)}}>Increase coutner</button>
      <h3>{counter}</h3>
      <button onClick = {() => {updateRandomUserData()}}>Get some data</button>
      <pre></pre>
      {users.map((userInfo,idx) => (
        <>
          <p>{getFullUserName(userInfo)}</p>
          <img src = {userInfo.picture.thumbnail}></img>
        </>
      ))
      }
    </div>
  );
}

export default App;
