import React from "react";
import { Link } from "react-router-dom";

export const LinkBtn:React.FC<{url:string,name:string, className1?:string, className2:string}> = ({url, name, className1,className2}) => {
    return (
        <Link className="no-underline" to={`/${url}`} >
            <img className={`h-16 cursor-pointer ${className1}`} src={className2}/>
        </Link>  
    )
}

