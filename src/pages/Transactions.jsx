import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { rupiah } from './Home'

const today = () => new Date().toISOString().slice(0, 10)
const empty = { title: '', amount: '', type: 'keluar', date: today() }

export default function Transactions({ items, setItems }) {
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Create / Update
  const submit = (e) => {
    e.preventDefault()
    const amount = Number(form.amount)
    if (!form.title.trim() || !(amount > 0)) return setError('Judul wajib diisi dan nominal harus lebih dari 0.')
    const data = { ...form, title: form.title.trim(), amount }
    setItems(editId ? items.map((i) => (i.id === editId ? { ...i, ...data } : i)) : [{ id: crypto.randomUUID(), ...data }, ...items])
    setForm(empty); setEditId(null); setError('')
  }
  const edit = (i) => { setEditId(i.id); setForm({ title: i.title, amount: String(i.amount), type: i.type, date: i.date }); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  // Delete
  const remove = (i) => { if (confirm(`Hapus "${i.title}"?`)) setItems(items.filter((x) => x.id !== i.id)) }
  const input = 'w-full rounded-lg border p-2 text-sm'

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="space-y-2 rounded-xl bg-white p-4 shadow">
        <h2 className="font-semibold">{editId ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
        <input className={input} placeholder="Judul (mis. Makan siang)" value={form.title} onChange={set('title')} />
        <input className={input} type="number" placeholder="Nominal" value={form.amount} onChange={set('amount')} />
        <div className="flex gap-2">
          <select className={input} value={form.type} onChange={set('type')}><option value="keluar">Pengeluaran</option><option value="masuk">Pemasukan</option></select>
          <input className={input} type="date" value={form.date} onChange={set('date')} />
        </div>
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm text-white">{editId ? 'Simpan Perubahan' : 'Tambah'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty) }} className="rounded-lg border px-4 text-sm">Batal</button>}
        </div>
      </form>
      {/* Read */}
      <ul className="space-y-2">
        {items.length === 0 && <li className="text-center text-sm text-slate-500">Belum ada data.</li>}
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow">
            <div><p className="text-sm font-medium">{i.title}</p><p className="text-xs text-slate-500">{i.date}</p></div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${i.type === 'masuk' ? 'text-emerald-600' : 'text-rose-600'}`}>{i.type === 'masuk' ? '+' : '-'}{rupiah(i.amount)}</span>
              <button aria-label="Edit" onClick={() => edit(i)}><Pencil size={16} /></button>
              <button aria-label="Hapus" onClick={() => remove(i)} className="text-rose-600"><Trash2 size={16} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
