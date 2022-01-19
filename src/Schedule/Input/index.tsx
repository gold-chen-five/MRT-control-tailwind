import React, { MutableRefObject, useEffect, useState} from 'react';
import './input.css'
import { v4 } from 'uuid'
import DatePicker, { DateObject } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"

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
    data: Data | undefined;
    setData: React.Dispatch<React.SetStateAction<Data | undefined>>;
    userEmail?: string;
    submitref: MutableRefObject<boolean>;
}

const Input:React.FC<Props> = ({data,setData, userEmail,submitref}) => {
    const [btnopenstyle,setBtnopenstyle] = useState<string>('btnClose')
    const [btnclosestyle,setBtnclosestyle] = useState<string>('btnClose')
    const [btnopenAreastyle,setBtnopenAreastyle] = useState<string>('btnClose')
    const [btncloseAreastyle,setBtncloseAreastyle] = useState<string>('btnClose')
    const [name,setName] = useState<string | undefined>('')
    const [date,setDate] = useState<string>('')
    const [time,setTime] = useState<string>('')
    const [control,setControl] = useState<string>('')
    const [area,setArea] = useState<string>('')
    const [currentdate,setCurrentdate] = useState<undefined | {mindate: string; maxdate : string}>({mindate: '', maxdate : ''})
    const [updateAlert,setUpdateAlert] = useState<string>('')
    const [alertcolor,setAlertcolor] = useState<string>('')
    const [htmlRenderTime,setHtmlRenderTime] = useState<object>()

    const btnOnclick = (input:string) => {
        if(input === 'open'){
            setBtnopenstyle('btnclick')
            setBtnclosestyle('btnClose')
            setControl('open')
        }else if(input === 'close'){
            setBtnopenstyle('btnClose')
            setBtnclosestyle('btnclick')
            setControl('close')
        }
    }
    
    const btnOnclickArea = (input:string) => {
        if(input === 'R9'){
            setBtnopenAreastyle('btnclick')
            setBtncloseAreastyle('btnClose')
            setArea('R9')
        }else if(input === 'R10'){
            setBtnopenAreastyle('btnClose')
            setBtncloseAreastyle('btnclick')
            setArea('R10')
        }
    }

    const sendSchedule = () => {
        if(name === '' || date === '' || time=== '' || area === '' || control === '' ){
            setUpdateAlert('你有東西沒填')
            setAlertcolor('red')
            return
        }
        const transferDate = parseInt(date.replaceAll('-',''))
        const transferTime = parseInt(time.replace(':',''))/100
        const transferControl = (control === 'open') ? true : false

        setData({
            id: v4(),
            data: {
                name: name,
                date: transferDate,
                time: transferTime,
                area: area,
                control: transferControl
            }
        })
        submitref.current = true
        setUpdateAlert('上傳成功')
        setAlertcolor('green')
    }
    const plsZero = (num : any) => {
        let result = num
        if(num < 10) result = '0'+num
        return result
    }

    const getCurrentDate = () => {
       
        const today:any = new Date()
        const minday: any = new Date()
        minday.setDate(today.getDate())
        const maxday: any = new Date()
        maxday.setDate(today.getDate()+6)
        const mindate = minday.getFullYear()+'-'+plsZero(minday.getMonth()+1 )+'-'+plsZero(minday.getDate())
        const maxdate = maxday.getFullYear()+'-'+plsZero(maxday.getMonth()+1)+'-'+plsZero(maxday.getDate())
        setCurrentdate({
            mindate: mindate,
            maxdate: maxdate
        })
        setDate(mindate)
    }

    useEffect(()=>{
        if(area === 'R9'){
            setTime('10:00')
            setHtmlRenderTime(
                <select className="selectContainerInput" onChange={(e) => setTime(e.target.value)}>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="15:00">15:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                </select>
            )
        }
        else if (area === 'R10'){
            setTime('18:00')
            setHtmlRenderTime(
                <select className="selectContainerInput" onChange={(e) => setTime(e.target.value)}>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option> 
                </select>
            )
        }
    },[area])

    useEffect(() => {
        setName(userEmail)
        getCurrentDate()
    },[])

    useEffect(()=>{
        console.log(date)
    },[date])

    return (
        <div className='Input'>
            <div className="boardsize">
                <h1>排程</h1>
                <div className='list-block'>
                    <div>辦事人員</div>
                    <div>{userEmail}</div>
                </div>
                <div className='list-block'>
                    <div>展演區域</div>
                    <div className="openclosebtnContainer">
                        <button className={btnopenAreastyle} onClick={() => btnOnclickArea('R9')}>R9</button>
                        <button className={btncloseAreastyle} onClick={() => btnOnclickArea('R10')}>R10</button>
                    </div>
                </div>
                <div className='list-block'>
                    <div>日期</div>
                    {
                        //<input type="date" className='date' min={currentdate?.mindate} max={currentdate?.maxdate} value={date} onChange={(e) => setDate(e.target.value)}/>
                    }
                   
                    <DatePicker 
                        render={(value:any, openCalender:any) => {
                            return (
                                <div style={{
                                    border: 'none',
                                    width: '100%',
                                    height: '30px',
                                    backgroundColor: '#efefef',
                                    color: 'black',
                                    borderRadius: '4px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box',
                                    fontSize: '0.8em'
                                }} onClick={openCalender}>
                                    {value}
                                </div>
                            )
                        }}
                        className='datepicker'
                        value={date} 
                        onChange={(e:any) =>setDate(e.year + '-' + plsZero(e.month)+ '-' + plsZero(e.day))}
                        minDate={currentdate?.mindate}
                        maxDate={currentdate?.maxdate}
                        calendarPosition='bottom-center'
                        fixMainPosition={false}
                        fixRelativePosition={false}
                        
                    />
                    
                </div>
                <div className='list-block'>
                    <div>時間</div>
                    {
                        area ? htmlRenderTime : null
                    }
                </div>
                
                <div className='list-block'>
                    <div>展演開/關</div>
                    <div className="openclosebtnContainer">
                        <button className={btnopenstyle} onClick={() => btnOnclick('open')}>開</button>
                        <button className={btnclosestyle} onClick={() => btnOnclick('close')}>關</button>
                    </div>
                </div>
                
                <div className='list-block'>
                    <button className='Pass' onClick={sendSchedule}>上傳</button>
                </div>
                   
                <div className='list-block' style={{color: alertcolor,fontSize: '0.8em'}}>
                    {updateAlert}
                </div>
            </div>    
        </div>
    )
}

export default Input;
