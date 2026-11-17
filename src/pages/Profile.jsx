// TODO: ganti kelompok dengan nomor kelompok praktikum kamu
const PROFILE = { nama: 'I Dewa Gede Agung Oka W.B.D', nim: '21120124140149', kelompok: '14' }

export default function Profile({ count }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-3xl font-bold text-white">{PROFILE.nama[0]}</div>
      <dl className="space-y-3 text-sm">
        {[['Nama', PROFILE.nama], ['NIM', PROFILE.nim], ['Kelompok', PROFILE.kelompok], ['Total transaksi tersimpan', count]].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b pb-2"><dt className="text-slate-500">{k}</dt><dd className="font-medium">{v}</dd></div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-slate-500">Praktikum Pemrograman Perangkat Bergerak 2026 Ganjil</p>
    </div>
  )
}
