import React ,{useState, useEffect} from 'react';
import { LinkBtn } from '../publicComponents/Public';

interface Props{
    setUser: React.Dispatch<any>
}

const Main:React.FC<Props> = ({setUser}) => {
    const logoutOnclick = () => {
        localStorage.removeItem('mrtUser')
        setUser(null)
    }

    return(
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <div className='h-[557px] w-[501px] flex flex-col justify-center items-center bg-[url("/public/image/web/background_2.png")] bg-no-repeat bg-cover sm:bg-none sm:h-full sm:w-full'>
                <div>
                    <img className='no-underline h-16 cursor-pointer' onClick={logoutOnclick} src='/image/web/Button_1_1.png'/>
                    <LinkBtn url="Schedule" name="排程" className1='my-24' className2='/image/web/Button_2_1.png' />
                    <LinkBtn url="SoundControl" name="音量調整" className1='' className2='/image/web/Button_3_1.png' />
                </div>
                
            </div>
        </div>
    )
}

export default Main