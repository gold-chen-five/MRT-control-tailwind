import React from "react";
import './ShowCase.css'
import Item from "./Item";

interface Data {
    date?: string;
    time?: string;
    name?: string;
    things?: string;
}

interface Props{
    data: Data;
}

const ShowCase:React.FC<Props> = ({data}) => {
    
    return (
        <div className="ShowCase">
            <Item data={data}/>
        </div>
    )
}

export default ShowCase;