import React, { useEffect, useRef, useState } from 'react'
import { Bluetooth, Loader, Play } from 'lucide-react'
import { Pause, ChevronRight , ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementNext, incrementNext, setMax, setZero } from '../redux/slices/allMusic';
import IMAGES from '../assets/images/images';
import ReactLoading from 'react-loading';
function MusicPlayer(props) {
  // global states
  const reduxCurrMusicState = useSelector(state=>state.music)
  const allMusicState = useSelector(state=>state.allMusic)
  const nextSongCount = allMusicState.songIndex;
  // --------------------------
  // use dispatch
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  const [currentSong, setCurrentSong] = useState({coverImage:"",songTitle:"",track:"", artist:""})
  const [isPlaying, setIsPlaying] = useState(false);
  const [devices, setDevices] = useState([]);
  // function to get all nearby bluetooth devices
  // Request Bluetooth device scan

  const getBluetoothDevicesArray = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      console.log("Devices: ", device)
      setDevices((prevDevices) => {
        // Remove the first device if there are already 2 devices in the list
        if (prevDevices.some(prevDevice => prevDevice.id === device.id)) {
          console.log("Device already exists in the list.");
          return prevDevices;
        }
        if (prevDevices.length >= 2) {
          const updatedDevices = prevDevices.slice(1);
          updatedDevices.push(device);
          return updatedDevices;
        } else {
          return [...prevDevices, device];
        }
      });
    } catch (error) {
      console.error('Error discovering Bluetooth devices:', error);
    }
  };




 
  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  // set the current playing song
  useEffect(()=>{
    // set the current song in state with its preview
    if (reduxCurrMusicState.value.preview!= undefined){
      setCurrentSong({
      ...currentSong,
        coverImage: reduxCurrMusicState.value.album.cover_big,
        songTitle: reduxCurrMusicState.value.title,
        track: reduxCurrMusicState.value.preview,
        artist: reduxCurrMusicState.value.artist.name,
      })
    }
  },[reduxCurrMusicState]) 
  useEffect(()=>{
    // this is done to play on change from sidebar
    audioRef.current.play()
    setIsPlaying(true)
  },[currentSong])

  

  const prevSong = () => {
    dispatch(decrementNext())
    if(nextSongCount <= 0){
      dispatch(setMax())
    }
    setCurrentSong({
      ...currentSong,
        coverImage: allMusicState.allSongs[nextSongCount].album.cover_big,
        songTitle: allMusicState.allSongs[nextSongCount].title,
        track: allMusicState.allSongs[nextSongCount].preview,
        artist: allMusicState.allSongs[nextSongCount].artist.name,
    })
  }
  const nextSong = () => {
    // increment global
    dispatch(incrementNext())
    if(nextSongCount > allMusicState.allSongs.length){
      // just to not overlap the array
      dispatch(setZero())
    }
    setCurrentSong({
      ...currentSong,
        coverImage: allMusicState.allSongs[nextSongCount].album.cover_big,
        songTitle: allMusicState.allSongs[nextSongCount].title,
        track: allMusicState.allSongs[nextSongCount].preview,
        artist: allMusicState.allSongs[nextSongCount].artist.name,
    })
  }

  return (
    <div className='flex-col w-full bg-gradient-to-t from-blue-200 to-indigo-900 p-5'>
      {/* <!-- component --> */}
    <div className='w-full  flex justify-between'>
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 ">Made for you</h1>
    <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Connected Devices</h5>
        {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
   </div>
   <div class="flow-root">
        {devices.length == 0 && <p className='text-center text-sm text-gray-500'>No devices connect currently</p>}
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
         
        {devices.map(device => (
            <li class="py-3 sm:py-4" key={device.id}>
                
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src={IMAGES.image1} alt="bluetooth"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {device.name == null ? device.id : device.name}
                        </p>
                       
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           Connected
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Bluetooth size={20}/>
                    </div>
                </div>
            </li>
          ))}
            </ul>
            </div>
            </div>

   
        
     
    </div>
    
    <div className="flex w-full justify-center mt-10">
      {/* <!-- CARD 1 --> */}
     { reduxCurrMusicState.value.preview != undefined && 
     <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <img className="w-full md:w-72 block rounded" src={currentSong.coverImage} alt="" />
          
        </div>
           
        <div className="p-5">
          <div className='flex justify-between'>
          <h3 className="text-white text-lg">{currentSong.songTitle}</h3>
          <button className='text-white'onClick={()=>getBluetoothDevicesArray()}>
            <Bluetooth />
            </button>
          </div>
          <p className="text-gray-400">{currentSong.artist}</p>
        </div>
        <div className='flex w-full justify-center'>
          
           <button onClick={prevSong}>
           <ChevronLeft color='#f7f7f7'/>
            </button>
           { <button onClick={togglePlayPause}>{isPlaying ? <Pause color='#f7f7f7'/> : <Play color='#f7f7f7'/>}</button>}
           <button onClick={nextSong}>
           <ChevronRight color='#f7f7f7'/>
            </button>
        </div>
      </div>}
      {/* ----------------------A U D I O CODE */}
      <div>
      <audio
        ref={audioRef}
        src={currentSong.track}
        // controls
        onEnded={() => togglePlayPause} 
      />
    </div>
      {/* ----------------------A U D I O CODE */}

      {/* <!-- END OF CARD 1 --> */}

      {/* <!-- CARD 2 --> */}
      {/* <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <img className="w-full md:w-72 block rounded" src="https://upload.wikimedia.org/wikipedia/en/c/ca/Tycho_-_Awake.png" alt="" />
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>

            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            </button>

            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-white text-lg">Awake</h3>
          <p className="text-gray-400">Tycho</p>
        </div>
      </div> */}
      {/* <!-- END OF CARD 2 --> */}

      {/* <!-- CARD 3 --> */}
      {/* <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <img className="w-full md:w-72 block rounded" src="https://upload.wikimedia.org/wikipedia/en/1/11/Dive_tycho_album.jpg" alt="" />
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>

            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            </button>

            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-white text-lg">Dive</h3>
          <p className="text-gray-400">Tycho</p>
        </div>
      </div> */}
      {/* <!-- END OF CARD 3 --> */}
  </div>
    </div>
  )
}

export default MusicPlayer
