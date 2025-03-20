import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';


const project = () => {
  const location = useLocation()
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.pro);
  const [message, setMessage] = useState('')
  const { user } = useContext(UserContext);
  const messageBoxRef = useRef(null);
  const [allChat ,setChat] = useState([])

  useEffect(() => {
    scrollToBottom();
  }, [allChat]);
  
  function saveMessage(){
    axios.post('/project/chat',{
      projectId: location.state.pro._id,
      sender: user._id,
      message:message,
    }
    ).then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  function fetchChats(){
    axios.get(`/project/get-chat/${location.state.pro._id}`).then((res)=>{
      setChat(res.data)
    }).catch((error)=>{
      console.log(error);
    })
  }
  useEffect(() => {
    if (location.state.pro._id) {
      fetchChats();
    }
  }, [location.state.pro._id]);


  function addColaborators() {
    axios.put('/project/add-user', {
      projectId: location.state.pro._id,
      users: Array.from(selectedUserId)
    }).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleUser = (id) => {
    setSelectedUserId(previewSelectedUser => {
      const newSelectedUser = new Set(previewSelectedUser);
      if (newSelectedUser.has(id)) {
        newSelectedUser.delete(id)
      } else {
        newSelectedUser.add(id)
      }
      return newSelectedUser
    })
  }


  const send = () => {
    const messageObj = {message,sender:user};
    sendMessage('project-message', messageObj);
    setChat((prev) => [...prev,{...messageObj,sender:{_id:user._id,email:user.email}}]);
    setMessage("");
    saveMessage();
  }

  useEffect(() => {

    initializeSocket(project._id);
    receiveMessage('project-message', data => {
      setChat((prev)=>[...prev,data]);
    })

    axios.get('/users/all').then((res) => {
      setUsers(res.data.users)
    }).catch((error) => {
      console.log(error)
    })
    axios.get(`project/get-project/${location.state.pro._id}`).then((res) => {
      setProject(res.data.project)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  return (
    <main className='w-screen h-screen flex'>
      <section className="left h-full min-w-[25%] bg-zinc-200 flex flex-col relative">
        <header className='bg-zinc-300 w-full h-[8%] flex items-center justify-between'>
          <button onClick={toggleModal} className='ml-3'><i className="ri-add-fill"></i><span className='text-xs'>Add Collaborator</span></button>
          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='mr-8'><i className="ri-group-fill text-xl"></i></button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Add Collaborator</h2>
                  <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-auto no-scrollbar">
                  {users.map(user => (
                    <div key={user._id} onClick={() => handleUser(user._id)} className={`p-2 border rounded-md hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ''}`}>
                      {user.email}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { toggleModal(), addColaborators() }}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                  Add Collaborator
                </button>
              </div>
            </div>

          )}
        </header>
        <div className='conversation-box flex-grow flex flex-col'>
          <div ref={messageBoxRef} className='message-box bg-slate-200 flex-grow flex flex-col overflow-y-auto max-h-[84vh] no-scrollbar'>
            {
              allChat.map((chat)=>(
                <div key={chat._id || Math.random()} className={`max-w-56 flex flex-col p-2 bg-slate-400 w-fit rounded-md m-1 ${chat.sender._id === user._id?'ml-auto':''}`}>
                   <small className='text-xm opacity-65'>{chat.sender.email}</small>
                   <p className='text-sm break-words'>{chat.message}</p>
                </div>
              ))
            }
            
          </div>
          <div className="bg-zinc-300 input-field h-[8.2%] flex items-center justify-center gap-2">
            <input value={message} onChange={(e) => setMessage(e.target.value)} className='w-[88%] h-[70%] rounded-sm p-1 outline-none border-none placeholder:ring-black font-mono' type="text" placeholder='Enter your message' />
            <button onClick={send}><i className="ri-send-plane-2-fill text-xl"></i></button>
          </div>
        </div>
        <div className={`w-full h-full bg-green-100 absolute transition-all left-[-100%] ${isSidePanelOpen ? "translate-x-full" : ''}`}>
          <header className='bg-slate-200 w-full h-[8%] flex items-center justify-between'>
            <h1 className='ml-4'>Collaborators</h1>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='mr-7'><i className="ri-close-line text-2xl"></i></button>
          </header>
          <div className='flex flex-col items-center gap-2'>
            {
              project.users && project.users.map(user => {
                return (
                  <div className='bg-gray-300 w-[98%] h-10 flex items-center gap-2 p-2 rounded-sm mt-1'>
                    <button><i className="ri-shield-user-fill text-xl"></i></button>
                    <h1>{user.email}</h1>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
      <section className="right"></section>
    </main>
  )
}

export default project;