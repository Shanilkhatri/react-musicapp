import React, { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'
import { LucidePlay, LucidePause } from 'lucide-react';
import {useDispatch}  from 'react-redux';
import { nowPlaying} from '../redux/slices/currentMusic';
import { populateAllSongs } from '../redux/slices/allMusic';
function Sidebar() {
    const dispatch = useDispatch()
    const [musicTitle, setMusicTitle] = useState([])
    const fetchMusic = async (searchedTerm="weeknd") =>{
        const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q='+searchedTerm;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '', // api key here
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setMusicTitle(result.data)
            console.log("data: ", result.data)
            // set all songs into global state
            dispatch(populateAllSongs(result.data))
        } catch (error) {
            console.error(error);
        }
    }
    const searchMusic = async (e)=>{
        var searchedTerm = e.target.value
        if (searchedTerm == "" || searchedTerm == " "){
            searchedTerm = "weeknd"
        }
        fetchMusic(searchedTerm)
    }
    // Function to convert seconds to minutes
    const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const playSong = (item) =>{
    console.log("current Song: ",item)
    // dispatch the current song to global state
    dispatch(nowPlaying(item))
  }
    useEffect(()=>{
        // fetch music initially
        fetchMusic()
    },[])
  return (
    <>
    
    <div className='flex'>
      
      {/* <!-- component --> */}
<div className="flex flex-col w-64 h-screen text-white px-4 py-8 bg-gray-900 border-r dark:bg-gray-800 dark:border-gray-600">
        <h2 className="text-3xl font-semibold text-white-800 dark:text-white">Search your music</h2>
        <div className="relative mt-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>

            <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none " placeholder="Search" onInput={searchMusic}/>
        </div>
        
        <div className="flex flex-col justify-between flex-1 mt-6 overflow-y-auto no-scrollbar">
            <nav>
            
            <ul class="list-none">
            {musicTitle.length != 0 && musicTitle.map(item => (
                <button className='w-full text-left' onClick={()=>playSong(item)}>
             <div key={item.id} className='flex-col  justify-between hover:bg-gray-800'>
             <div key={item.id} className='flex  justify-between hover:bg-gray-800'>
                <li className='list-none cursor-pointer'>{item.title}</li>
                <div className='flex justify-between items-center align-center h-content'>
                    ...
                </div>
             </div>
             <p className='pr-1 text-gray-300 my-2 text-xs'>{convertSecondsToMinutes(item.duration)}&nbsp;|&nbsp;{item.artist.name}</p>
            </div>
                </button>
      ))};
            </ul>

            </nav>
        </div>
    </div>
   

    <div className='flex w-full'>

    <MusicPlayer/>
    </div>
    
    </div>
    </>
  )
}

export default Sidebar
