import React,{ useState , useEffect, useRef} from "react";
import Input from './Input'
import ShowCase from './ShowCase';
import './Schedule.css'
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'

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
  
const fetchSetAxiosApi = (apiUrl: string,data: Data | undefined) => {
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    return axios.post(apiUrl,JSON.stringify(data),config)
        .then((e) => {
            return e
        })
    
}



const Schedule:React.FC<Props> = ({userEmail}) => {
    const [checkifuser,setCheckifuser] = useState<boolean>(true)
    const initdata = {
        id: '',
        data: {
            name:'',
            date:'',
            time:'',
            area: '',
            control: ''
        }
       
    }
    const [data, setData] = useState<Data | undefined>()
    const [scheduleDB,setScheduleDB] = useState<[]>([])
    const [serverInfo,setServerInfo] = useState<string>('')
    const submitref = useRef<boolean>(false)

    const getScheduleDB = () => {
        fetchGetAxiosApi('http://localhost:3000/schedule')
            .then((get:any)=>{
                if(get === 'server error'){
                    setServerInfo('目前server未開請回上一頁')
                }
                else{
                    setScheduleDB(get)
                } 
            })
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
        fetchSetAxiosApi('http://localhost:3000/schedule',data)
            .then((e) => {
                getScheduleDB()
            })
    },[data])
    return (
        <div className="Schedulemain">
            {
                !checkifuser?(<Navigate to='/'/>):(
                    <div  className="Schedule">
                        <div style={{color: 'red'}}>{serverInfo}</div>
                        <Link to='/' style={{
                                        textDecoration: 'none',
                                        color: 'black',
                                        width: '250px',
                                        height: '100px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid #DBDBDB',
                                        borderRadius: '4px',
                                        marginTop: '40px',
                                        marginBottom: '40px',
                                        backgroundColor: 'white'
                                    }}>返回</Link>
                        <Input data={data} setData={setData} userEmail={userEmail} submitref={submitref}/>
                        <ShowCase data={data} scheduleDB={scheduleDB}/>
                    </div> 
                )
            }
        </div>
    )
}

export default Schedule;