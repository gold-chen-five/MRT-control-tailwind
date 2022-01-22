import React ,{useState, useEffect} from 'react';
import { LinkBtn } from '../publicComponents/Public';
import { Link } from "react-router-dom";

interface Props{
    setUser: React.Dispatch<any>
}

const Main:React.FC<Props> = ({setUser}) => {
    const logoutOnclick = () => {
        localStorage.removeItem('mrtUser')
        setUser(null)
    }

    // const LinkBtn:React.FC<{url:string,name:string}> = ({url, name}) => {
    //     return (
    //         <Link className="no-underline w-64 h-24" to={`/${url}`} >
    //             <div className='w-64 h-24 border-2 border-solid border-black flex justify-center items-center rounded cursor-pointer text-black' >{name}</div>
    //         </Link>  
    //     )
    // }

    return(
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <div className='h-3/5 w-3/5 flex flex-col justify-around items-center'>
                <div className='no-underline w-64 h-24' onClick={logoutOnclick}>
                    <div className='w-64 h-24 border-2 border-solid border-black flex justify-center items-center rounded cursor-pointer text-black'>登出</div>
                </div>
                <LinkBtn url="Schedule" name="排程" />
                <LinkBtn url="SoundControl" name="音量調整" />
            </div>
        </div>
    )
}

export default Main