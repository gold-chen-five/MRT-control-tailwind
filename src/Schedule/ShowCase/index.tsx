import React, { useEffect, useState } from "react";
import './ShowCase.css'
import Item from "./Item";

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

interface ScheduleDBitem{
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
    scheduleDB: []
}

const ShowCase:React.FC<Props> = ({data,scheduleDB}) => {
    const [dateArray,setDateArray] = useState<string[]>()
    const [targetDate,setTargetDate] = useState<string>()

    const getCurrentDate = () => {
        const plsZero = (num : any) => {
            let result = num
            if(num < 10) result = '0'+num
            return result
        }
        const convertdate = (day:any) => {
            return day.getFullYear()+'-'+plsZero(day.getMonth()+1)+'-'+plsZero(day.getDate())
        }
        const today:any = new Date()
        const minday: any = new Date()
        minday.setDate(today.getDate())
        const maxday: any = new Date()
        maxday.setDate(today.getDate()+6)
        const pushDateArray = []
        setTargetDate(convertdate(minday))
        for(let i = minday;i<=maxday;i.setDate(i.getDate()+1)){
            pushDateArray.push(convertdate(i))
        }
        setDateArray(pushDateArray)
    }
    
    const transferDate = (date:number | undefined) => {
        const stringDate = '' + date
        const result = stringDate.substring(0,4) + '-' + stringDate.substring(4,6)+'-'+stringDate.substring(6,stringDate.length)
        return result
    }

    useEffect(()=>{
        getCurrentDate()
    },[])

    return (
        <div className="ShowCase">
            <select className="selectContainer" onChange={(e) => setTargetDate(e.target.value)}>
                {
                    dateArray?.map((date: string) => {
                        return (
                            <option key={date} value={date}>{date}</option>
                        )
                    })
                }    
            </select>

            {
                scheduleDB.map((scheduleDBitem:ScheduleDBitem) => {
                    if(transferDate(scheduleDBitem.data.date) === targetDate){
                        return (
                            <Item key={scheduleDBitem.id} data={data} scheduleDBitem={scheduleDBitem} />
                        )
                    }     
                })
            }
            
        </div>
    )
}

export default ShowCase;