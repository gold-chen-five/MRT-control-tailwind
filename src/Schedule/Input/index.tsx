import React, { MutableRefObject, useEffect, useState} from 'react';
import './input.css'
import { v4 } from 'uuid'

interface Data {
    id: string,
    data: {
        name?: string ;
        date?: string;
        time?: string;
        control?: string;
    }
}

interface Props{
    data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>;
    userEmail?: string;
    submitref: MutableRefObject<boolean>;
}

const Input:React.FC<Props> = ({data,setData, userEmail,submitref}) => {
    const [btnopenstyle,setBtnopenstyle] = useState<string>('')
    const [btnclosestyle,setBtnclosestyle] = useState<string>('')
    const [name,setName] = useState<string | undefined>('')
    const [date,setDate] = useState<string>('')
    const [time,setTime] = useState<string>('')
    const [control,setControl] = useState<string>('')

    const btnOnclick = (input:string) => {
        if(input === 'open'){
            setBtnopenstyle('btnclick')
            setBtnclosestyle('')
            setControl('open')
        }else if(input === 'close'){
            setBtnopenstyle('')
            setBtnclosestyle('btnclick')
            setControl('close')
        }
    }

    const sendSchedule = () => {
        if(name === '' || date === '' || time=== '' || control === ''){
            alert('你有東西沒填')
            return
        }
        setData({
            id: v4(),
            data: {
                name: name,
                date: date,
                time: time,
                control: control
            }
        })
        submitref.current = true
        alert('準備上傳請按確定')
    }

    useEffect(() => {
        setName(userEmail)
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
                    <input type="date" className='date' onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className='list-block'>
                    <div>時間</div>
                    <input type="time" className='time' onChange={(e) => setTime(e.target.value)}/>
                </div>
                <div className='list-block'>
                    <div>投影機開/關</div>
                    <div className="openclosebtnContainer">
                        <button className={btnopenstyle} onClick={() => btnOnclick('open')}>開</button>
                        <button className={btnclosestyle} onClick={() => btnOnclick('close')}>關</button>
                    </div>
                </div>
                
                <div className='list-block'>
                    <button className='Pass' onClick={sendSchedule}>上傳</button>
                </div>
            </div>    
        </div>
    )
}

export default Input;
