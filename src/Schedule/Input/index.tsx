import React, { MutableRefObject, useEffect, useState} from 'react';
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
    checkServer: boolean;
}

const Input:React.FC<Props> = ({data,setData, userEmail,submitref, checkServer}) => {
    const [btnopenstyle,setBtnopenstyle] = useState<string>('bg-neutral-200 text-blacktnClose')
    const [btnclosestyle,setBtnclosestyle] = useState<string>('bg-neutral-200 text-black')
    const [btnR9Areastyle,setBtnR9Areastyle] = useState<string>('bg-neutral-200 text-black')
    const [btnR10Areastyle,setBtnR10Areastyle] = useState<string>('bg-neutral-200 text-black')
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
            setBtnopenstyle('bg-black text-white')
            setBtnclosestyle('bg-neutral-200 text-black')
            setControl('open')
        }else if(input === 'close'){
            setBtnopenstyle('bg-neutral-200 text-black')
            setBtnclosestyle('bg-black text-white')
            setControl('close')
        }
    }
    
    const btnOnclickArea = (input:string) => {
        if(input === 'R9'){
            setBtnR9Areastyle('bg-black text-white')
            setBtnR10Areastyle('bg-neutral-200 text-black')
            setArea('R9')
        }else if(input === 'R10'){
            setBtnR9Areastyle('bg-neutral-200 text-black')
            setBtnR10Areastyle(' bg-black text-white')
            setArea('R10')
        }
    }

    const sendSchedule = () => {
        if(!checkServer){
            setUpdateAlert('server 未開，上傳失敗')
            setAlertcolor('text-red-600')
            return
        }
        if(name === '' || date === '' || time=== '' || area === '' || control === '' ){
            setUpdateAlert('你有東西沒填')
            setAlertcolor('text-red-600')
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
        setAlertcolor('text-green-600')
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
                <select className="border-none w-full h-8 bg-neutral-200 text-black rounded p-2 cursor-pointer text-xs" onChange={(e) => setTime(e.target.value)}>
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
                <select className="border-none w-full h-8 bg-neutral-200 text-black rounded p-2 cursor-pointer text-xs" onChange={(e) => setTime(e.target.value)}>
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
        <div className='w-1/2 sm:w-full h-60vh 2xl:h-80vh xl:h-screen flex justify-center items-center border border-gray-300 border-solid rounded bg-white mb-8 '>
            <div className="w-3/4 sm:w-full flex flex-col justify-center items-center">
                <h1 className='text-2xl font-bold'>排程</h1>
                <div className='m-3 w-3/5'>
                    <div>辦事人員</div>
                    <div>{userEmail}</div>
                </div>
                <div className='m-3 w-3/5'>
                    <div>展演區域</div>
                    <div>
                        <button className={`w-12 h-12 mr-2.5 rounded border-none cursor-pointer ${btnR9Areastyle} `} onClick={() => btnOnclickArea('R9')}>R9</button>
                        <button className={`w-12 h-12 mr-2.5 rounded border-none cursor-pointer ${btnR10Areastyle}`} onClick={() => btnOnclickArea('R10')}>R10</button>
                    </div>
                </div>
                <div className='m-3 w-3/5'>
                    <div>日期</div>
                    <DatePicker 
                        render={(value:any, openCalender:any) => {
                            return (
                                <div className='border-none w-full h-8 bg-neutral-200 text-black rounded p-2 cursor-pointer box-border text-xs' onClick={openCalender}>
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
                <div className='m-3 w-3/5'>
                    <div>時間</div>
                    {
                        area ? htmlRenderTime : null
                    }
                </div>
                
                <div className='m-3 w-3/5'>
                    <div>展演開/關</div>
                    <div>
                        <button className={`w-12 h-12 mr-2.5 rounded border-none cursor-pointer ${btnopenstyle} `}  onClick={() => btnOnclick('open')}>開</button>
                        <button className={`w-12 h-12 mr-2.5 rounded border-none cursor-pointer ${btnclosestyle} `}  onClick={() => btnOnclick('close')}>關</button>
                    </div>
                </div>
                
                <div className='m-3 w-3/5'>
                    <button className='text-white text-sm bg-black w-full h-9 rounded p-2 cursor-pointer box-border' onClick={sendSchedule}>上傳</button>
                </div>
                   
                <div className={`m-2 w-3/5 text-xs ${alertcolor}`}>
                    {updateAlert}
                </div>
            </div>    
        </div>
    )
}

export default Input;
