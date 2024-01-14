import { useState, useRef , useCallback, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed , setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password,  setPassword] = useState("");

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*"

    for(let i =1 ; i<=length; i++)
    {
      let char = Math.floor(Math.random() * str.length+1)

      pass += str.charAt(char)
    }

    setPassword(pass);


  }, [length, numAllowed, charAllowed ,setPassword])

const copyPassswordToClickBoard = useCallback(()=>{
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,20);
  window.navigator.writeText(password)
}, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed ,setPassword])
  
  return (
    <>
     <h1 className='text-center text-4xl text-white'>password generator</h1>
    <div className='w-full text-2xl max-w-md mx-auto shadow-md bg-white rounded-lg px-7 py-6 my-8 '>
   <div className='flex pb-4'>
    <input type="text" value ={password}
    className='outline-none w-full py-1 px-3'
    placeholder='Password'
    readOnly  
    ref={passwordRef}
    />
   

    <button className='px-3 py-0.5 bg-sky-500 hover:bg-sky-700 ... rounded-lg' onClick={copyPassswordToClickBoard}>copy</button>

    </div>
   
    <div className='flex text-sm gap-x-2'>

      <div className='flex items-ceter gap-x-1'>
        <input type="range" className="cursor-pointer" min={6}
          max={20}
          value={length}
          onChange={(e) =>{
            setLength(e.target.value)
          }}

        />
        <label htmlFor="">length</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numAllowed}
        id = "numberInput"
        onChange={() =>{
          setnumAllowed((e) =>!e);
        }}
        />
        <label htmlFor="">Num</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={charAllowed}
        id = "charInput"
        onChange={() =>{
          setCharAllowed((e) =>!e);
        }}
        />
        <label htmlFor="">Char </label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
