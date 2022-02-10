import React,{ useState , useEffect, useRef} from "react";
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'
import { LinkBtn } from '../publicComponents/Public';

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
const fetchSetSoundAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
        console.log(data)
        //const result:{} = data.data
        //return result
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
}
// const fetchSetSoundAxiosApi = (apiUrl:string,data:{id: string; volume: number | undefined}):any => {
//     return axios.put(apiUrl,data)   
// }

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
        fetchSetSoundAxiosApi(`http://192.168.2.109:9119/soundcontrol?id=R9&volumn=${r9.volume}&account=${userEmail}`) 
        //fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/R9',r9)  
    },[r9])

    useEffect(()=>{
        if(!r10ref.current) return
        fetchSetSoundAxiosApi(`http://192.168.2.109:9119/soundcontrol?id=R10&volumn=${r10.volume}&account=${userEmail}`) 
        //fetchSetSoundAxiosApi('http://localhost:3000/soundcontrol/R10',r10)  
    },[r10])

    useEffect(()=>{
        //判斷是否有登入
        if(userEmail === '' || userEmail === null){
            setCheckifuser(false)
            return
        }

        fetchGetSoundAxiosApi('http://192.168.2.109:9119/soundget?id=R9')
            .then((get: [{id: string,volume: number}])=>{
                setR9(get[0])
                setR9input(get[0].volume)
            })
        fetchGetSoundAxiosApi('http://192.168.2.109:9119/soundget?id=R10')
            .then((get: [{id: string,volume: number}])=>{
                setR10(get[0])
                setR10input(get[0].volume)
            })  
        // fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=R9')
        //     .then((get: [{id: string,volume: number}])=>{
        //         setR9(get[0])
        //         setR9input(get[0].volume)
        //     })
        // fetchGetSoundAxiosApi('http://localhost:3000/soundcontrol?id=R10')
        //     .then((get: [{id: string,volume: number}])=>{
        //         setR10(get[0])
        //         setR10input(get[0].volume)
        //     })  
    },[])

  
    return (
        <>
            {
                (!checkifuser) ? (
                    <Navigate to='/'/>
                ) : (
                    <div className="w-full h-screen flex flex-col justify-around sm:justify-center items-center">
                        <LinkBtn url="" name="返回" className1='mb-5 mt-5' className2="border border-gray-300 bg-white"/>
                        {
                            (userEmail === 'krtattendant@phalanity.com.tw') ? (
                                <div className="no-underline text-red-600 w-96 h-2/5 flex justify-center items-center border border-solid border-gray-300 rounded bg-white">你沒有權限請按返回</div>
                            ):(
                                <div className="w-2/5 h-3/5 border border-solid border-gray-300 rounded flex justify-center bg-white 2xl:w-3/5 sm:w-full">
                                    <div className="w-4/5 h-full flex flex-col justify-around items-center sm:w-11/12">
                                        <h1 className="text-3xl font-bold">音量調整</h1>
                                        <div className="w-full text-2xl sm:text-base">R9&nbsp;&nbsp;音量(0~100): {r9.volume}</div>
                                        <div className="w-full text-2xl sm:text-base">R10音量(0~100): {r10.volume}</div>
                                        <div className="w-full flex items-center text-2xl 2xl:text-xl lg:block sm:text-base">
                                            <div className="mr-5 mb-1">R9&nbsp;&nbsp;音量控制(0~100):</div>
                                            
                                            <div className="h-10 flex items-center mr-2 lg:mb-3">
                                                <input className="w-32 mr-1 lg:w-9/12 "
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
                                                    className="w-12 h-7 mr-1 p-0 border border-solid border-gray-700 rounded-sm"
                                                    value={r9input}
                                                />
                                            </div>
                                            
                                            <div className="h-8 flex items-center lg:mb-3">
                                                <button className="text-base mr-1 w-20 h-9 bg-neutral-300 text-black rounded border-none" onClick={() => soundcontrolBtnOnclick('R9')}>控制</button>
                                                <button className="text-base mr-1 w-20 h-9 bg-neutral-300 text-black rounded border-none" onClick={() => setR9input(r9.volume)}>復原</button>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center text-2xl 2xl:text-xl lg:block sm:text-base">
                                            <div className="mr-5 mb-1">R10音量控制(0~100):</div>
                                            <div className="h-10 flex items-center lg:mb-3 mr-2">
                                                <input className="w-32 mr-1 lg:w-9/12"
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
                                                    className="w-12 h-7 mr-1 p-0 border border-solid border-gray-700 rounded-sm"
                                                    value={r10input}
                                                />
                                            </div>
                                           
                                            <div className="h-8 flex items-center lg:mb-3">
                                                <button className="text-base mr-1 w-20 h-9 bg-neutral-300 text-black rounded border-none" onClick={() => soundcontrolBtnOnclick('R10')}>控制</button>
                                                <button className="text-base mr-1 w-20 h-9 bg-neutral-300 text-black rounded border-none" onClick={() => setR10input(r10.volume)}>復原</button>
                                            </div>    
                                        </div >
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
     
    )
}
export default SoundControl
