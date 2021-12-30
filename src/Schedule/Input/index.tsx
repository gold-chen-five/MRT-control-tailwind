import React, { useEffect } from 'react';
import './input.css'

interface Data {
    name?: string ;
    date?: string;
    time?: string;
    things?: string;
}

interface Props{
    setData: React.Dispatch<React.SetStateAction<Data>>,
    userEmail?: string 
}

const Input:React.FC<Props> = ({setData, userEmail}) => {
    useEffect(() => {
        setData((prev) => {return {...prev,name: userEmail}})
    },[])

    return (
        <div className='Input'>
            <div className="boardsize">
                <h1>排程</h1>
                <div className='list-block'>
                    <div>辦事人員</div>
                    <div>{userEmail}</div>
                </div>
                <div className='list-block'>
                    <div>日期</div>
                    <input type="date" className='date' onChange={(e) => setData((prev) => { return {...prev,date: e.target.value}})}/>
                </div>
                <div className='list-block'>
                    <div>時間</div>
                    <input type="time" className='time' onChange={(e) => setData((prev) => { return {...prev,time: e.target.value}})}/>
                </div>
                <div className='list-block'>
                    <div>投影機開/關</div>
                    <input type="text" className='event' onChange={(e) => setData((prev) => {return {...prev,things: e.target.value}})}/>
                </div>
                
                <div className='list-block'>
                    <button className='Pass'>傳送</button>
                </div>
            </div>    
        </div>
    )
}

export default Input;
