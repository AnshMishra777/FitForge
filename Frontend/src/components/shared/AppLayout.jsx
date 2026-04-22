import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useState } from 'react'
import SettingsModal from '../SettingsModal'

export default function AppLayout() {
  const [openSettings, setOpenSettings] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-forge-bg">
      
      <Navbar onSettingsClick={() => setOpenSettings(true)} />

      <main className="flex-1 pb-24 md:pb-8">
        <Outlet />
      </main>

      {openSettings && (
        <SettingsModal onClose={() => setOpenSettings(false)} />
      )}
    </div>
  )
}