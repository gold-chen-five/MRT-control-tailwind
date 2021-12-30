import axios from 'axios'
import React ,{useState, useEffect} from 'react';
import './App.css';
import Schedule  from './Schedule';
import SoundControl from './SoundControl'
import Main from './Main';
import { auth, db } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";


interface Data{
  date?: string;
  time?: string;
  name?: string;
  things?: string;
}

const fetchAxioApi = (apiUrl:string) => {
  return axios.get(apiUrl)
    .then(function (data) {
      // handle success
      return data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }) 
}

const App = () =>{
  const [data, setData] = useState<Data>({})
  const [user,setUser] = useState<any | null >(null)
  const [userEmail,setUserEmail] = useState<string>('')
  const [account,setAccount] = useState<string>('')
  const [password,setPassword] = useState<string>('')

  const storageUserLocal = (us :object | null) => {
    localStorage.setItem('user',JSON.stringify(us));
  }
  const login = () => {
    signInWithEmailAndPassword(auth,account,password)
    .then((user)=>{
      setUser(user.user)
      storageUserLocal(user.user)
    })
    .catch((error) =>{
      alert('帳密錯誤')
    })
  }

  useEffect(() => {
    if(user) setUserEmail(user.email)
  },[user])

  useEffect(()=>{
    const userGet = localStorage.getItem('user')
    setUser( JSON.parse(userGet!)) //fix | null 
  },[])

  return (
    <Router>
      <div className="App">
        {
          user?(
              <Routes>
                  <Route path='/Schedule' element={<Schedule userEmail={userEmail}/>}/>
                  <Route path='/SoundControl' element={<SoundControl/>}/>
                  <Route path='/' element={<Main/>}/>
              </Routes>
          ):(
            <div className='loginPage'>
              <div className="loginInfo">
                <div>
                  <span>帳號:</span><input type="text" className="account" onChange={(e) => setAccount(e.target.value)}/>
                </div>
                <div>
                  <span>密碼:</span><input type="text" className="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="loginBtn" onClick={login}>登入</button>
              </div>
            </div>
          )
        }
        
      </div>
    </Router>
    
  );
}

export default App;
