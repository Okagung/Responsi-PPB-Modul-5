import { useState, useEffect } from 'react'
import { Home as HomeIcon, Wallet, User, WifiOff } from 'lucide-react'
import useLocalStorage from './hooks/useLocalStorage'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'

const TABS = [
  { id: 'home', label: 'Beranda', icon: HomeIcon },
  { id: 'transactions', label: 'Transaksi', icon: Wallet },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function App() {
  const [tab, setTab] = useState('home')
  const [items, setItems] = useLocalStorage('duitku:transactions', [])
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const on = () => setOffline(false), off = () => setOffline(true)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  return (
    <div className="mx-auto min-h-screen max-w-md pb-20">
      <header className="bg-emerald-600 px-4 py-3 text-white shadow">
        <h1 className="text-lg font-bold">DuitKu</h1>
        {offline && <p className="flex items-center gap-1 text-xs"><WifiOff size={12} /> Mode offline, data tetap tersimpan</p>}
      </header>
      <main className="p-4">
        {tab === 'home' && <Home items={items} onGo={setTab} />}
        {tab === 'transactions' && <Transactions items={items} setItems={setItems} />}
        {tab === 'profile' && <Profile count={items.length} />}
      </main>
      <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 border-t bg-white">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex flex-1 flex-col items-center py-2 text-xs ${tab === id ? 'text-emerald-600 font-semibold' : 'text-slate-500'}`}>
            <Icon size={20} />{label}
          </button>
        ))}
      </nav>
    </div>
  )
}
