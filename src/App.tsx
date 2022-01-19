import React ,{useState, useEffect, useRef} from 'react';
import './App.css';
import Schedule  from './Schedule';
import SoundControl from './SoundControl'
import Main from './Main';
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
const img = require( './image/phalanity.gif')

interface Data{
  date?: string;
  time?: string;
  name?: string;
  things?: string;
}

const App = () =>{
  const [user,setUser] = useState<any | null >(null)
  const [userEmail,setUserEmail] = useState<string>('')
  const [account,setAccount] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [passwordAlert,setPasswordAlert] = useState<string>('')
  const [localUserCheck,setLocalUserCheck] = useState<{account:string,password: string}>()
  const localRef = useRef(false)

  const storageUserLocal = (loginAccount:string,loginPassword:string) => {
    localStorage.setItem('mrtUser',JSON.stringify({
      account: loginAccount,
      password: loginPassword
    }));
  }

  const login = (loginAccount:string,loginPassword:string) => {
    signInWithEmailAndPassword(auth,loginAccount,loginPassword)
    .then((user)=>{
      setUser(user.user)
      storageUserLocal(loginAccount,loginPassword)
    })
    .catch((error) =>{
      setPasswordAlert('帳號或密碼錯誤請重新輸入')
    })
  }

  useEffect(() => {
    if(user) setUserEmail(user.email)
  },[user])

  useEffect(()=>{
    if(localRef.current){
      login(localUserCheck!.account,localUserCheck!.password)
    }  
  },[localUserCheck])


  useEffect(()=>{
    const userGet = localStorage.getItem('mrtUser')
    if(userGet) {
      localRef.current = true
      const userObj:{account:string,password:string} = JSON.parse(userGet)
      setLocalUserCheck({account:userObj.account,password:userObj.password})
    }
  },[])

  return (
    <Router>
      <div className="App">
        {
          user?(
              <Routes>
                  <Route path='/Schedule' element={<Schedule userEmail={userEmail}/>}/>
                  <Route path='/SoundControl' element={<SoundControl userEmail={userEmail}/>}/>
                  <Route path='/' element={<Main setUser={setUser}/>}/>
              </Routes>
          ):(
            <div className='loginPage'>
              <div className="loginInfo">
                <img src={img} alt="" style={{width: '150px',height: '150px',marginBottom: '40px'}}/>
                <div style={{padding: '10px'}}>
                  <input style={{
                    width: '250px',
                    height: '35px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid lightgray',
                    borderRadius: '2px'
                  }}type="text" className="account" placeholder="電子郵件地址或帳號" onChange={(e) => setAccount(e.target.value)}/>
                </div>
                <div style={{padding: '10px'}}>
                  <input style={{
                    width: '250px',
                    height: '35px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid lightgray',
                    borderRadius: '2px'
                  }} type="password" className="password" placeholder="密碼"  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="loginBtn" onClick={() => login(account,password)}  style={{
                                                                   width: '250px',
                                                                   height: '35px',
                                                                   borderRadius: '4px',
                                                                   border: 'none',
                                                                   margin: '10px',
                                                                   cursor: 'pointer',
                }}>登入</button>
                <div style={{color: 'red',fontSize: '0.8em'}}>{passwordAlert}</div>
              </div>
            </div>
          )
        }
        
      </div>
    </Router>
    
  );
}

export default App;
