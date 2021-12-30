import React from "react";
import './Item.css'

interface Data {
    date?: string;
    time?: string;
    name?: string;
    things?: string;
}

interface Props{
    data: Data;
}

const Item:React.FC<Props> = ({data}) => {
    return (
        <div className="Item">
            <div>{data.date}</div>
            <div>{data.time}</div>
            <div>{data.name}</div>
            <div>{data.things}</div>
        </div>
    )
}
export default Item;