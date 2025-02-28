// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from '../config/axios';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState([])
  
  useEffect (()=>{
    axios.get('/project/all').then((res)=>{
      setProject(res.data.projects)
  }).catch((err) => {
    console.log(err)
  })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      console.log('Project name entered:', projectName);
      setProjectName('');
      setIsModalOpen(false);
    }
    axios.post('/project/create', {
      name: projectName,
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };


  return (
    <main className="min-h-screen bg-gray-900 p-6">

      <div className="projects flex flex-col gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-5 bg-gray-800 border border-slate-800 rounded-sm text-white hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2">
          <i className="ri-add-line text-xl"></i>
          <span>New Project</span>
        </button>
        
        {
          <div className="flex flex-col gap-4 max-h-[calc(100vh-12rem)] overflow-y-auto no-scrollbar">
          {project.map((pro) => (
              <div
                  key={pro._id}
                  className="p-5 bg-gray-800 border border-slate-800 rounded-sm text-white"
              >
                  {pro.name}
              </div>
          ))}
      </div>
        }
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl shadow-gray-900/50 p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Create New Project
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter project name"
                  required
                />
                
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setProjectName('');
                    setIsModalOpen(false);
                  }}
                  className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;