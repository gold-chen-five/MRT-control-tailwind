import React from "react";
import './Item.css'

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
    id: string;
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
    scheduleDBitem: ScheduleDBitem;
}

const Item:React.FC<Props> = ({data, scheduleDBitem}) => {
    return (
        <div className="Item">
            <div >
                <div>{`${scheduleDBitem.data.time}:00`}</div>
                <div>{scheduleDBitem.data.name}</div>
                <div>{scheduleDBitem.data.area}</div>
                <div>
                {
                    scheduleDBitem.data.control? "open" : "close"
                }
                </div>
            </div>
            
        </div>
    )
}
export default Item;