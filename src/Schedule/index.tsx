import React,{ useState , useEffect} from "react";
import Input from './Input'
import ShowCase from './ShowCase';
import './Schedule.css'
import { Link } from "react-router-dom";

interface Data{
    name?: string;
    date?: string;
    time?: string;
    things?: string;
  }

interface Props{
    userEmail?: string
}  

const Schedule:React.FC<Props> = ({userEmail}) => {
    const [data, setData] = useState<Data>({})
    return (
        <div className="Schedule" >
            <Link to='/'style={{
                            textDecoration: 'none',
                            color: 'black',
                            width: '250px',
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px solid black',
                            borderRadius: '4px'
                        }}>返回</Link>
            <Input setData={setData} userEmail={userEmail}/>
            <ShowCase data={data}/>
        </div>
    )
}

export default Schedule;