import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SettingsModal({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ">

      {/* Card */}
      <div className="w-[400px] rounded-2xl p-5 
                bg-white/10 backdrop-blur-xl 
                border border-white/20 
                shadow-[0_8px_32px_rgba(0,0,0,0.37)]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-forge-text">Settings</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-forge-muted hover:text-forge-orange" />
          </button>
        </div>

        {/* User */}
        <div className="bg-forge-orange/10 p-3 rounded-lg mb-4">
          <p className="text-sm text-forge-muted">Hello</p>
          <p className="font-bold text-forge-orange">{user?.name}</p>
        </div>

        {/* Options */}
        <div className="space-y-2 text-sm">
          <div className="p-2 rounded hover:bg-forge-card cursor-pointer">Profile</div>
          <div className="p-2 rounded hover:bg-forge-card cursor-pointer">Notifications</div>
          <div className="p-2 rounded hover:bg-forge-card cursor-pointer">Dark Mode</div>
          <div className="p-2 rounded hover:bg-forge-card cursor-pointer">Help</div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  )
}