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

  const fetchAuth = async (loginAccount:string,loginPassword:string) => {
    const auth_server_url = 'http://127.0.0.1:2001'
    //const auth_server_url = 'http://192.168.2.19:2001'
    try{
      const res = await fetch(`${auth_server_url}/userPost`,{
        method: 'POST',
        body: JSON.stringify({
          account: loginAccount,
          password: loginPassword
        }),
        headers: {'Content-Type': 'application/json'}
      })
      const user = await res.json()
      if(res.status === 200){
        
      
        setUser(user.user)
        storageUserLocal(loginAccount,loginPassword)
      }else{
        throw new Error(user.message)
      }
    }
    catch(err){
      setAccount('')
      setPassword('')
      setPasswordAlert('帳號或密碼錯誤請重新輸入')
    }
  }

  const login = (loginAccount:string,loginPassword:string) => {
    fetchAuth(loginAccount,loginPassword)     
  }

  useEffect(() => {
    if(user) setUserEmail(user)
  },[user])

  useEffect(()=>{
    if(localRef.current){
      setAccount(localUserCheck!.account)
      setPassword(localUserCheck!.password)
      //login(localUserCheck!.account,localUserCheck!.password)
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
      <div className="App flex flex-col justify-center items-center w-full min-h-screen bg-black">
        {
          user?(
              <Routes>
                  <Route path='/Schedule' element={<Schedule userEmail={userEmail}/>}/>
                  <Route path='/SoundControl' element={<SoundControl userEmail={userEmail}/>}/>
                  <Route path='/' element={<Main setUser={setUser}/>}/>
              </Routes>
          ):(
            <div className='loginPage w-full h-[367px] flex justify-center items-center' >
              <div className="loginInfo w-4/12 h-full flex flex-col justify-center items-center lg:w-3/4 sm:w-full sm:bg-none bg-[url('/public/image/web/background_1.png')] bg-no-repeat">
                <img className='mb-2.5' src={img} alt="" style={{width: '100px',height: '100px'}}/>
                <div className='p-1'>
                  <input type="text" className="account 
                    w-60 
                    h-8 
                    bg-slate-50
                    border
                    border-solid
                    border-inherit
                    rounded-sm
                    text-xs
                  " placeholder="電子郵件地址或帳號" onChange={(e) => setAccount(e.target.value)} value={account}/>
                </div>
                <div className='p-1'>
                  <input type="password" className="password
                    w-60 
                    h-8 
                    bg-slate-50
                    border
                    border-solid
                    border-inherit
                    rounded-sm
                    text-xs
                  " placeholder="密碼"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
                <img className="loginBtn 
                  w-40
                  h-8
                  mt-4
                  cursor-pointer
                " onClick={() => login(account,password)} src='/image/web/login_Button1.png'/>
                <div className='text-red-500 mt-4'>{passwordAlert}</div>
              </div>
            </div>
          )
        }
      </div>
    </Router>
    
  );
}

export default App;
