import React from "react";
import { Link } from "react-router-dom";

export const LinkBtn:React.FC<{url:string,name:string}> = ({url, name}) => {
    return (
        <Link className="no-underline w-64 h-24" to={`/${url}`} >
            <div className='w-64 h-24 border-2 border-solid border-black flex justify-center items-center rounded cursor-pointer text-black' >{name}</div>
        </Link>  
    )
}

