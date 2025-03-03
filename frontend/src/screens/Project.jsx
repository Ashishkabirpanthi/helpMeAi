import React from 'react'
import { useLocation } from 'react-router-dom'

const project = () => {
    const location = useLocation()
    console.log(location.state)
  return (
    <main className='w-screen h-screen flex'>
      <section className="left h-full min-w-[25%] bg-zinc-200 flex flex-col">
        <header className='bg-zinc-300 w-full h-[8%] flex items-center justify-end'>
          <button className='mr-8'><i className="ri-group-fill text-xl"></i></button>
        </header>
        <div className='conversation-box flex-grow flex flex-col'>
          <div className='message-box bg-slate-200 flex-grow flex flex-col'>
          <div className="message max-w-56 flex flex-col p-2 bg-slate-400 w-fit rounded-md m-1">
              <small className='text-xm opacity-65'>example.gmail.com</small>
              <p className='text-sm break-words'>hfffffffujfjfjjfjjjfjfjfjfjjfjjjfjffjffjfjjfjfjfjjfjfjfjfffjfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjfjfjfffjjfjf</p>
            </div>
            <div className="message max-w-64 flex flex-col p-2 bg-slate-400 w-fit rounded-md ml-auto mr-1">
              <small className='text-xm opacity-65'>example.gmail.com</small>
              <p className='text-sm'>hellfffffffffffffffffffffffffffffffo</p>
            </div>
          </div>
          <div className="bg-zinc-300 input-field h-[8.2%] flex items-center justify-center gap-2">
            <input className='w-[88%] h-[70%] rounded-sm p-1 outline-none border-none placeholder:ring-black font-mono' type="text" placeholder='Enter your message' />
            <button><i class="ri-send-plane-2-fill text-xl"></i></button>
          </div>
        </div>
      </section>
      <section className="right"></section>
    </main>
  )
}

export default project;
