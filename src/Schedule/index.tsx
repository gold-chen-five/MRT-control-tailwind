import React,{ useState , useEffect, useRef} from "react";
import Input from './Input'
import ShowCase from './ShowCase';
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'
import { LinkBtn } from '../publicComponents/Public';
interface Data{
    id: string,
    data: {
        name?: string ;
        date?: number;
        time?: number;
        area?: string;
        control?: boolean;
    }
}

interface Props{
    userEmail?: string
}  

const fetchGetAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
        const result:[] = data.data
        // handle success
        return result
      })
      .catch(function (error) {
        // handle error
        
        return 'server error'
      }) 
}
const fetchSetAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
        // handle success
        console.log(data)
        return data
      })
      .catch(function (error) {
        // handle error
        return 'server error'
      }) 
}

// const fetchSetAxiosApi = (apiUrl: string,data: Data | undefined) => {
//     const config = {
//         headers: {'Content-Type': 'application/json'}
//     }
//     return axios.post(apiUrl,JSON.stringify(data),config)
//         .then((e) => {
//             return e
//         })
    
// }

const Schedule:React.FC<Props> = ({userEmail}) => {
    const [checkifuser,setCheckifuser] = useState<boolean>(true)
    const [data, setData] = useState<Data | undefined>()
    const [scheduleDB,setScheduleDB] = useState<[]>([])
    const [serverInfo,setServerInfo] = useState<string>('')
    const [checkServer,setCheckServer] = useState<boolean>(false)
    const submitref = useRef<boolean>(false)

    const getScheduleDB = () => {
        fetchGetAxiosApi('http://192.168.2.109:9119/schedule')
            .then((get:any)=>{
                if(get === 'server error'){
                    setServerInfo('目前server未開請回上一頁')
                }
                else{
                    setScheduleDB(get)
                } 
            })
        // fetchGetAxiosApi('http://localhost:3000/schedule')
        //     .then((get:any)=>{
        //         if(get === 'server error'){
        //             setServerInfo('目前server未開請回上一頁')
        //             setCheckServer(false)
        //         }
        //         else{
        //             setScheduleDB(get)
        //             setCheckServer(true)
        //         } 
        //     })
    }

    useEffect(()=>{
        //判斷是否有登入
        if(userEmail === '' || userEmail === null){
            setCheckifuser(false)
            return
        }
        //抓DB
        getScheduleDB()
    },[])

    useEffect(()=>{
        //set DB
        if(!submitref.current) return
        fetchSetAxiosApi(`http://192.168.2.109:9119/showset?data=${JSON.stringify(data)}`)
            .then((e:any) => {
                getScheduleDB()
            })
        // fetchSetAxiosApi('http://localhost:3000/schedule',data)
        //     .then((e) => {
        //         getScheduleDB()
        //     })
    },[data])
    return (
        <div className="w-full min-h-screen">
            {
                !checkifuser?(<Navigate to='/'/>):(
                    <div className="w-full min-h-screen flex flex-col justify-around items-center border">
                        <div className="text-red-400 ">{serverInfo}</div>
                        <LinkBtn url="" name="返回" className1='mb-5 mt-5' className2="border border-gray-300 bg-white"/>
                        <Input data={data} setData={setData} userEmail={userEmail} submitref={submitref} checkServer={checkServer}/>
                        <ShowCase data={data} scheduleDB={scheduleDB} />
                    </div> 
                )
            }
        </div>
    )
}

export default Schedule;