import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'

const project = () => {
    const location = useLocation()
    const [isSidePanelOpen,setIsSidePanelOpen] = useState(false)
    console.log(location.state)
  return (
    <main className='w-screen h-screen flex'>
      <section className="left h-full min-w-[25%] bg-zinc-200 flex flex-col relative">
        <header className='bg-zinc-300 w-full h-[8%] flex items-center justify-end'>
          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='mr-8'><i className="ri-group-fill text-xl"></i></button>
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
            <button><i className="ri-send-plane-2-fill text-xl"></i></button>
          </div>
        </div>
        <div className={`w-full h-full bg-green-100 absolute transition-all left-[-100%] ${isSidePanelOpen?"translate-x-full":''}`}>
          <header className='bg-slate-200 w-full h-[8%] flex items-center justify-end'>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='mr-8'><i className="ri-close-line text-2xl"></i></button>
          </header>
          <div className='flex flex-col items-center gap-2'>
            <div className='bg-gray-300 w-[98%] h-10 flex items-center gap-2 p-2 rounded-sm mt-1'>
              <button><i class="ri-shield-user-fill text-xl"></i></button>
              <h1>username</h1>
            </div>
            <div className='bg-gray-300 w-[98%] h-10 flex items-center gap-2 p-2 rounded-sm'>
              <button><i class="ri-shield-user-fill text-xl"></i></button>
              <h1>username</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="right"></section>
    </main>
  )
}

export default project;
