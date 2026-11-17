export const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function Home({ items, onGo }) {
  const sum = (t) => items.filter((i) => i.type === t).reduce((a, i) => a + i.amount, 0)
  const income = sum('masuk'), expense = sum('keluar')
  const latest = [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-emerald-600 p-4 text-white">
        <p className="text-sm">Saldo</p>
        <p className="text-2xl font-bold">{rupiah(income - expense)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-white p-3 shadow"><p className="text-slate-500">Pemasukan</p><p className="font-semibold text-emerald-600">{rupiah(income)}</p></div>
        <div className="rounded-lg bg-white p-3 shadow"><p className="text-slate-500">Pengeluaran</p><p className="font-semibold text-rose-600">{rupiah(expense)}</p></div>
      </div>
      <section>
        <h2 className="mb-2 font-semibold">Transaksi terbaru</h2>
        {latest.length === 0 && <p className="text-sm text-slate-500">Belum ada transaksi.</p>}
        {latest.map((i) => (
          <div key={i.id} className="mb-2 flex justify-between rounded-lg bg-white p-3 text-sm shadow">
            <span>{i.title}</span>
            <span className={i.type === 'masuk' ? 'text-emerald-600' : 'text-rose-600'}>{i.type === 'masuk' ? '+' : '-'}{rupiah(i.amount)}</span>
          </div>
        ))}
        <button onClick={() => onGo('transactions')} className="mt-2 w-full rounded-lg bg-emerald-600 py-2 text-sm text-white">Kelola Transaksi</button>
      </section>
    </div>
  )
}
