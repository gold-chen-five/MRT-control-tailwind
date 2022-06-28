import React,{ useState , useEffect, useRef} from "react";
import { Link, Navigate} from "react-router-dom";
import axios from 'axios'
import { LinkBtn } from '../publicComponents/Public';
import './soundControl.css'
interface Props{
    userEmail?: string
} 
const fetchGetSoundAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
        const result:{} = JSON.parse(data.statusText)
        return result
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
}
const fetchSetSoundAxiosApi = (apiUrl:string):any => {
    return axios.get(apiUrl)
      .then(function (data) {
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
}

const SoundControl:React.FC<Props> = ({userEmail}) => {
    const [r9,setR9] = useState<{id: string,volume: number | undefined}>({id: '',volume: undefined})
    const [r10,setR10] = useState<{id: string,volume: number | undefined}>({id: '',volume: undefined})
    const [r9input,setR9input] = useState<number | undefined>(0)
    const [r10input,setR10input] = useState< number | undefined>(0)
    const [checkifuser,setCheckifuser] = useState<boolean>(true)
    const r9ref = useRef<boolean>(false)
    const r10ref = useRef<boolean>(false)
   
    const soundcontrolBtnOnclick = (area: string) => {
       if(area === 'R9'){
            if(r9input === undefined){
                alert('音量控制未填')
                return
            }
            r9ref.current = true
            setR9({id:'R10',volume: r9input})
            return
       }
       if(area === 'R10'){
           if(r10input === undefined){
               alert('音量控制未填')
               return
           }
           r10ref.current = true
           setR10({id:'R10',volume: r10input})
       } 
    }

    useEffect(()=>{
        if(!r9ref.current) return
        fetchSetSoundAxiosApi(`http://18.181.110.2:8001/soundcontrol?id=R9&volumn=${r9.volume}&account=${userEmail}`) 
    },[r9])

    useEffect(()=>{
        if(!r10ref.current) return
        fetchSetSoundAxiosApi(`http://18.181.110.2:8001/soundcontrol?id=R10&volumn=${r10.volume}&account=${userEmail}`)  
    },[r10])

    useEffect(()=>{
        //判斷是否有登入
        if(userEmail === '' || userEmail === null){
            setCheckifuser(false)
            return
        }

        fetchGetSoundAxiosApi('http://18.181.110.2:8001/soundget?id=R9')
            .then((get: {id: string,volume: number})=>{
                setR9(get)
                setR9input(get.volume)
            })
        fetchGetSoundAxiosApi('http://18.181.110.2:8001/soundget?id=R10')
            .then((get: {id: string,volume: number})=>{
                setR10(get)
                setR10input(get.volume)
            })  
    },[])
  
    useEffect(() => {
        // if(r9input === undefined) return
        // const imagePx = 279
        // const percent = r9input / 100
        // let pxOfSlider = imagePx * percent
        // //console.log(pxOfSlider)
        // const r9volumnDom = document.getElementById('r9volumn')
        // if(r9volumnDom !== null){
        //     if(pxOfSlider === 0) pxOfSlider = 10
        //     console.log(pxOfSlider)
        //     r9volumnDom.style.width = `${pxOfSlider}px`
        // }

    },[r9input])
    return (
        <>
            {
                (!checkifuser) ? (
                    <Navigate to='/'/>
                ) : (
                    <div className="w-full h-screen flex flex-col justify-center sm:justify-center items-center">
                        <LinkBtn url="" name="返回" className1='mb-10 sm:mb-5' className2="/image/web/Button_4_1.png"/>
                        {
                            (userEmail === 'krtattendant@phalanity.com.tw') ? (
                                <div className="no-underline text-red-600 w-96 h-2/5 flex justify-center items-center border border-solid border-gray-300 rounded bg-white text-center">你沒有權限請按返回</div>
                            ):(
                                <div className="w-[648px] h-[491px] flex justify-center 2xl:w-3/5 bg-[url('/public/image/web/background_4.png')] bg-no-repeat bg-cover relative sm:bg-none sm:w-full sm:h-[60%]">
                                    <div className="w-4/5 h-full flex flex-col justify-center items-center sm:w-11/12 ">
                                        <h1 className="text-3xl font-bold text-white absolute top-[5%] sm:text-yellow-300 sm:relative sm:text-2xl">音量調整</h1>

                                        <img src="/image/web/demarcation.png" alt="" className='hidden my-8 sm:block sm:mt-14'/>

                                        <section className="flex w-full sm:mb-8">
                                            <div className="w-1/2 lg:text-xl sm:text-base text-center">
                                                <p className="text-base font-bold text-white">R9音量(0~100)</p>
                                                <p className="text-3xl text-[#00d9ff]">{r9.volume}</p>
                                            </div>
                                            <div className="w-1/2 text-2xl lg:text-xl sm:text-base text-center">
                                                <p className="text-base font-bold text-white">R10音量(0~100)</p>
                                                <p className="text-3xl text-[#00d9ff]">{r10.volume}</p>
                                            </div>
                                        </section>
                                        
                                        <img src="/image/web/demarcation.png" alt="" className='my-8 sm:hidden'/>

                                        <div className="w-full flex-col items-center 2xl:text-xl lg:block sm:text-base mt-4 mb-4">
                                            <div className="mr-5 text-base text-white font-bold sm:mr-0 sm:text-center">R9音量控制(0~100)</div>
                                            
                                            <div className="flex sm:flex-col">
                                                <div className="h-10 flex items-center mr-2 sm:justify-center sm:mr-0">
                                                    <input className="w-[279px] mr-2 lg:w-9/12 bg-transparent"
                                                        type="range"  
                                                        min="0" 
                                                        max="100" 
                                                        onChange={(e) => {setR9input(parseInt(e.target.value))}}
                                                        value={r9input}
                                                        id='r9volumn'
                                                    />
                                                    {/* <input 
                                                        type="number" 
                                                        min='0' 
                                                        max='100'
                                                        onChange={(e) => setR9input(parseInt(e.target.value))} 
                                                        className="w-12 h-7 mr-1 p-0 border border-solid border-gray-700 rounded-sm text-lg text-center"
                                                        value={r9input}
                                                    /> */}
                                                </div>
                                                
                                                <div className="h-10 flex items-center lg:mb-3 sm:justify-center">
                                                    <input 
                                                        type="number" 
                                                        min='0' 
                                                        max='100'
                                                        onChange={(e) => setR9input(parseInt(e.target.value))} 
                                                        className="w-12 h-7 mr-2 p-0 border border-solid border-gray-700 rounded-sm text-lg text-center sm:mr-4"
                                                        value={r9input}
                                                    />
                                                    <img className="mr-2 w-20 h-7 cursor-pointer sm:mr-4" onClick={() => soundcontrolBtnOnclick('R9')} src='/image/web/Button_8_1.png'/>
                                                    <img className="w-20 h-7 cursor-pointer" onClick={() => setR9input(r9.volume)} src='/image/web/Button_9_1.png'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full flex-col items-center text-2xl 2xl:text-xl lg:block sm:text-base">
                                            <div className="mr-5 text-white font-bold text-base sm:mr-0 sm:text-center">R10音量控制(0~100)</div>
                                            <div className="flex sm:flex-col">
                                                <div className="h-10 flex items-center mr-2 sm:justify-center sm:mr-0">
                                                    <input className="w-[279px] mr-2 lg:w-9/12 bg-transparent"
                                                        type="range"  
                                                        min="0" 
                                                        max="100" 
                                                        onChange={(e) => {setR10input(parseInt(e.target.value))}}
                                                        value={r10input}
                                                    />
                                                    {/* <input 
                                                        type="number" 
                                                        min='0' 
                                                        max='100' 
                                                        onChange={(e) => setR10input(parseInt(e.target.value))} 
                                                        className="w-12 h-7 mr-1 p-0 border border-solid border-gray-700 rounded-sm text-lg text-center"
                                                        value={r10input}
                                                    /> */}
                                                </div>
                                            
                                                <div className="h-10 flex items-center lg:mb-3 sm:justify-center">
                                                    <input 
                                                        type="number" 
                                                        min='0' 
                                                        max='100' 
                                                        onChange={(e) => setR10input(parseInt(e.target.value))} 
                                                        className="w-12 h-7 mr-2 p-0 border border-solid border-gray-700 rounded-sm text-lg text-center sm:mr-4"
                                                        value={r10input}
                                                    />
                                                    <img className="mr-2 w-20 h-7 cursor-pointer sm:mr-4" onClick={() => soundcontrolBtnOnclick('R10')} src='/image/web/Button_8_1.png'/>
                                                    <img className="w-20 h-7 cursor-pointer" onClick={() => setR10input(r10.volume)} src='/image/web/Button_9_1.png'/>
                                                </div>    
                                            </div>
                                            
                                        </div >
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
     
    )
}
export default SoundControl
