import React from "react";
import { Link } from "react-router-dom";

export const LinkBtn:React.FC<{url:string,name:string, className1?:string, className2:string}> = ({url, name, className1,className2}) => {
    return (
        <Link className={`no-underline w-64 h-24 ${className1}`} to={`/${url}`} >
            <div className={`w-64 h-24 border-solid flex justify-center items-center rounded cursor-pointer text-black ${className2}`} >{name}</div>
        </Link>  
    )
}

