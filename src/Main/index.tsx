import React ,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
interface StyleType {
    main: object,
    controlsize: object,
    link: object,
    schedule: object,
    sound_control: object
}

const Main = () => {
    const Style:StyleType = {
        main: {
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        controlsize: {
            width: '60%',
            height: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        link: {
            textDecoration: 'none',
            width: '250px',
            height: '100px',
        },
        schedule: {
            width: '250px',
            height: '100px',
            border: 'black solid 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'black'
        },
        sound_control: {
            width: '250px',
            height: '100px',
            border: 'black solid 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'black'
        }
    }

    return(
        <div style={Style.main}>
            <div style={Style.controlsize}>
                <Link to='/Schedule' style={Style.link}>
                    <div style={Style.schedule}>排程</div>
                </Link>
                <Link to='/SoundControl' style={Style.link}>
                    <div style={Style.sound_control}>音量調整</div>
                </Link>
            </div>
            
        </div>
    )
}

export default Main