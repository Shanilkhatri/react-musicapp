import React from "react"
import MusicPlayer from "./components/MusicPlayer"
import Sidebar from "./components/Sidebar"

export default function App() {
  return (
    <>
      <Sidebar>
        <MusicPlayer/>
      </Sidebar>
    </>
  )
}