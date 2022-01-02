import React from "react";
import './ShowCase.css'
import Item from "./Item";

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
    scheduleDB: []
}

const ShowCase:React.FC<Props> = ({data,scheduleDB}) => {
    return (
        <div className="ShowCase">
            {
                scheduleDB.map((scheduleDBitem:ScheduleDBitem) => {
                    return (
                        <Item key={scheduleDBitem.id} data={data} scheduleDBitem={scheduleDBitem} />
                    )
                })
            }
            
        </div>
    )
}

export default ShowCase;