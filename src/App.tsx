import React ,{useState, useEffect, useRef} from 'react';
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
      <div className="App flex flex-col justify-center items-center w-full min-h-screen bg-slate-50">
        {
          user?(
              <Routes>
                  <Route path='/Schedule' element={<Schedule userEmail={userEmail}/>}/>
                  <Route path='/SoundControl' element={<SoundControl userEmail={userEmail}/>}/>
                  <Route path='/' element={<Main setUser={setUser}/>}/>
              </Routes>
          ):(
            <div className='loginPage w-full h-50vh flex justify-center items-center' >
              <div className="loginInfo w-4/12 h-full flex flex-col justify-center items-center border border-solid border-inherit rounded bg-white">
                <img className='mb-2.5' src={img} alt="" style={{width: '150px',height: '150px'}}/>
                <div className='p-2'>
                  <input type="text" className="account 
                    w-72 
                    h-8 
                    bg-slate-50
                    border
                    border-solid
                    border-inherit
                    rounded
                    text-xs
                  " placeholder="電子郵件地址或帳號" onChange={(e) => setAccount(e.target.value)}/>
                </div>
                <div className='p-2'>
                  <input type="password" className="password
                    w-72 
                    h-8 
                    bg-slate-50
                    border
                    border-solid
                    border-inherit
                    rounded
                    text-xs
                  " placeholder="密碼"  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="loginBtn 
                  w-72
                  h-8
                  rounded
                  m-2
                  cursor-pointer
                  bg-gray-200
                  hover:bg-gray-400
                  text-white
                " onClick={() => login(account,password)} >登入</button>
                <div className='text-red-500'>{passwordAlert}</div>
              </div>
            </div>
          )
        }
      </div>
    </Router>
    
  );
}

export default App;
