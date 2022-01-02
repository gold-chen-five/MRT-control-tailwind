import React,{ useState , useEffect, useRef} from "react";
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'

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
    const [r9input,setR9input] = useState<number | undefined>(undefined)
    const [r10input,setR10input] = useState< number | undefined>(undefined)
    const r9ref = useRef<boolean>(false)
    const r10ref = useRef<boolean>(false)

    const soundcontrolBtnOnclick = (area: string) => {
       if(area === 'r9'){
        if(r9input === undefined){
            alert('音量控制未填')
            return
        }
        r9ref.current = true
        setR9({id:'r10',volume: r9input})
       }
       else if(area === 'r10'){
           if(r10input === undefined){
               alert('音量控制未填')
               return
           }
           r10ref.current = true
           setR10({id:'r10',volume: r10input})
       } 
    }

    useEffect(()=>{
        if(!r9ref.current) return
        fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/r9',r9)  
    },[r9])

    useEffect(()=>{
        if(!r10ref.current) return
        fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/r10',r10)  
    },[r10])

    useEffect(()=>{
        fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=r9')
            .then((get: [{id: string,volume: number}])=>{
                setR9(get[0])
            })
        fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=r10')
            .then((get: [{id: string,volume: number}])=>{
                setR10(get[0])
            })  
    },[])

  
    return (
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
                border: '2px solid black',
                borderRadius: '4px'
            }}>返回</Link>

            <div style={{
                width: '30%',
                height: '60%',
                border: '2px solid black',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
              
                <div style={{
                    width: '70%',
                    height: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <h1>音量調整</h1>
                    <div style={{width: '100%',fontSize: '1.5em'}}>R9音量(0~100): {r9.volume}</div>
                    <div style={{width: '100%',fontSize: '1.5em'}}>R10音量(0~100): {r10.volume}</div>
                    <div style={{width: '100%',display: 'flex',fontSize: '1.5em'}}>
                        <div style={{marginRight: '40px'}}>R9音量控制(0~100)</div>
                        <input 
                            type="number" 
                            min='0' 
                            max='100'
                            onChange={(e) => setR9input(parseInt(e.target.value))} 
                            style={{width: '50px',marginRight: '5px'}}
                        />
                        <button style={{fontSize: '0.8em'}}  onClick={() => soundcontrolBtnOnclick('r9')}>控制</button>
                    </div>
                    <div style={{width: '100%',display: 'flex',fontSize: '1.5em'}}>
                        <div style={{marginRight: '40px'}}>R10音量控制(0~100)</div>
                        <input 
                            type="number" 
                            min='0' 
                            max='100' 
                            onChange={(e) => setR10input(parseInt(e.target.value))} 
                            style={{width: '50px',marginRight: '5px'}}
                        />
                        <button style={{fontSize: '0.8em'}} onClick={() => soundcontrolBtnOnclick('r10')}>控制</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SoundControl