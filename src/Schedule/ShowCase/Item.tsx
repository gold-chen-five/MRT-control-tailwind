import React from "react";
import './Item.css'

interface Data{
    id: string,
    data: {
        name?: string ;
        date?: string;
        time?: string;
        control?: string;
    }
}

interface ScheduleDBitem{
    id: string;
    data: {
        name: string;
        date: string;
        time: string;
        control: string;
    }
}

interface Props{
    data: Data;
    scheduleDBitem: ScheduleDBitem;
}

const Item:React.FC<Props> = ({data, scheduleDBitem}) => {
    return (
        <div className="Item">
            <div>{scheduleDBitem.data.date}</div>
            <div>{scheduleDBitem.data.time}</div>
            <div>{scheduleDBitem.data.name}</div>
            <div>{scheduleDBitem.data.control}</div>
        </div>
    )
}
export default Item;