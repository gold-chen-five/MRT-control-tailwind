import React,{ useState , useEffect, useRef} from "react";
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'
import styled from 'styled-components'

interface Props{
    userEmail?: string
} 
const fetchGetSoundAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
        const result:{} = data.data
        return result
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
}
const fetchSetSoundAxiosApi = (apiUrl:string,data:{id: string; volume: number | undefined}):any => {
    return axios.put(apiUrl,data)   
}

const SoundControl:React.FC<Props> = ({userEmail}) => {
    const [r9,setR9] = useState<{id: string,volume: number | undefined}>({id: '',volume: undefined})
    const [r10,setR10] = useState<{id: string,volume: number | undefined}>({id: '',volume: undefined})
    const [r9input,setR9input] = useState<number | undefined>(0)
    const [r10input,setR10input] = useState< number | undefined>(0)
    const [checkifuser,setCheckifuser] = useState<boolean>(true)
    const r9ref = useRef<boolean>(false)
    const r10ref = useRef<boolean>(false)
   
    const soundcontrolBtnOnclick = (area: string) => {
       if(area === 'R9'){
        if(r9input === undefined){
            alert('音量控制未填')
            return
        }
        r9ref.current = true
        setR9({id:'R10',volume: r9input})
       }
       else if(area === 'R10'){
           if(r10input === undefined){
               alert('音量控制未填')
               return
           }
           r10ref.current = true
           setR10({id:'R10',volume: r10input})
       } 
    }

    useEffect(()=>{
        if(!r9ref.current) return
        fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/R9',r9)  
    },[r9])

    useEffect(()=>{
        if(!r10ref.current) return
        fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/R10',r10)  
    },[r10])

    useEffect(()=>{
        //判斷是否有登入
        if(userEmail === '' || userEmail === null){
            setCheckifuser(false)
            return
        }

        fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=R9')
            .then((get: [{id: string,volume: number}])=>{
                setR9(get[0])
                setR9input(get[0].volume)
            })
        fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=R10')
            .then((get: [{id: string,volume: number}])=>{
                setR10(get[0])
                setR10input(get[0].volume)
            })  
    },[])

  
    return (
        <>
            {
                (!checkifuser) ? (
                    <Navigate to='/'/>
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
            
                    }}>
                        <Link to='/' style={{
                            textDecoration: 'none',
                            color: 'black',
                            width: '250px',
                            height: '10%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #DBDBDB',
                            borderRadius: '4px',
                            backgroundColor: 'white'
                        }}>返回</Link>
                        
                        {
                            (userEmail === 'krtattendant@phalanity.com.tw') ? (
                                <div style={{
                                    textDecoration: 'none',
                                    color: 'red',
                                    width: '350px',
                                    height: '40%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #DBDBDB',
                                    borderRadius: '4px',
                                    backgroundColor: 'white'
                                }}>你沒有權限請按返回</div>
                            ):(
                                <SoundControlBoard>
                                    < SoundControlCenter>
                                        <h1>音量調整</h1>
                                        <SoundControlShow >R9&nbsp;&nbsp;音量(0~100): {r9.volume}</SoundControlShow>
                                        <SoundControlShow >R10音量(0~100): {r10.volume}</SoundControlShow>
                                        <SoundControlItem >
                                            <div style={{marginRight: '20px',marginBottom: '5px'}}>R9&nbsp;&nbsp;音量控制(0~100):</div>
                                            
                                            <SoundControlItemDiv>
                                                < SoundControlItemInput 
                                                    type="range"  
                                                    min="0" 
                                                    max="100" 
                                                    onChange={(e) => {setR9input(parseInt(e.target.value))}}
                                                    value={r9input}
                                                />
                                                <input 
                                                    type="number" 
                                                    min='0' 
                                                    max='100'
                                                    onChange={(e) => setR9input(parseInt(e.target.value))} 
                                                    style={{width: '50px',height: '28px',marginRight: '5px',padding: '0',border: '1px solid gray',borderRadius: '2px'}}
                                                    value={r9input}
                                                />
                                            </SoundControlItemDiv>
                                            
                                            <SoundControlItemDiv>
                                                <button style={{fontSize: '0.8em',marginRight: '5px',width: '80px',height:'30px'}}  onClick={() => soundcontrolBtnOnclick('R9')}>控制</button>
                                                <button style={{fontSize: '0.8em',width: '80px',height:'30px'}} onClick={() => setR9input(r9.volume)}>復原</button>
                                            </SoundControlItemDiv>
                                        </SoundControlItem >
                                        <SoundControlItem >
                                            <div style={{marginRight: '20px',marginBottom: '5px'}}>R10音量控制(0~100):</div>
                                            <SoundControlItemDiv>
                                                <SoundControlItemInput 
                                                    type="range"  
                                                    min="0" 
                                                    max="100" 
                                                    onChange={(e) => {setR10input(parseInt(e.target.value))}}
                                                    value={r10input}
                                                />
                                                <input 
                                                    type="number" 
                                                    min='0' 
                                                    max='100' 
                                                    onChange={(e) => setR10input(parseInt(e.target.value))} 
                                                    style={{width: '50px',height: '28px',marginRight: '5px',padding: '0',border: '1px solid gray',borderRadius: '2px'}}
                                                    value={r10input}
                                                />
                                            </SoundControlItemDiv>
                                           
                                            <SoundControlItemDiv>
                                                <button style={{fontSize: '0.8em',marginRight: '5px',width: '80px',height:'30px'}} onClick={() => soundcontrolBtnOnclick('R10')}>控制</button>
                                                <button style={{fontSize: '0.8em',width: '80px',height:'30px'}} onClick={() => setR10input(r10.volume)}>復原</button>
                                            </SoundControlItemDiv>    
                                        </SoundControlItem >
                                    </ SoundControlCenter>
                                </SoundControlBoard>
                            )
                        }
                    </div>
                )
            }
        </>
     
    )
}
export default SoundControl

const SoundControlBoard = styled.div`
    width: 40%;
    height: 60%;
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    @media screen and (max-width: 1440px){
        width: 60%;
    }
    @media screen and (max-width: 425px){
        width: 100%;
    }
`
const SoundControlShow = styled.div`
    width: 100%;
    font-Size: 1.5em;
    @media screen and (max-width: 425px){
        font-Size: 1em;
    }
`
const SoundControlCenter = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 425px){
        width: 90%;
    }
`
const SoundControlItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.5em;
    @media screen and (max-width: 1280px) {
        font-size: 1.2em;
    }
    @media screen and (max-width: 1024px){
        display: block
    }
    @media screen and (max-width: 425px){
        font-size: 1em;
    }
`
const SoundControlItemDiv = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1024px){
        margin-bottom: 10px;
    }
`
const SoundControlItemInput = styled.input`
    width: 130px;
    margin-right: 5px;
    @media screen and (max-width: 1024px){
        width: 70%;
    }
`