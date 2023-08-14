
import { useState } from 'react'


function App() {
  const [em,setEm]=useState("")
  const [pw,setPw]=useState("")
  const handleLogin =async (evt:any)=>{
    evt.preventDefault()
    let url=`http://localhost:5000/login`
    const options = {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email:em,password:pw})
    }
    let res = null
    try {
      res = await fetch(url,options)
      let data = await res.json()
      if (!res.ok){
        throw new Error(`${data.message} ${res.status}`)
      }else {
        console.log(data,"success")
      }
      
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="em">Email</label>
        <input type='email' id="em" required value={em} onChange={(e)=>setEm(e.target.value)}/>
        <label htmlFor="pw">Password</label>
        <input type='password' id="pw" required value={pw} onChange={(e)=>setPw(e.target.value)}/>
        <button className='text-base'>login</button>
      </form>
    </>
  )
}

export default App
