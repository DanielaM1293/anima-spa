import {useState} from 'react'
import {useC} from '../context'
const Pane=({src,cls,label,right})=><div className={`absolute inset-0 bg-gradient-to-br ${cls}`}><img src={src} alt="" onError={e=>{const i=e.currentTarget;i.src.endsWith('.svg')?i.remove():i.src=i.src.replace('.jpg','.svg')}} className="h-full w-full object-cover"/><span className={`absolute top-4 ${right?'right-4':'left-4'} rounded-full bg-black/40 px-3 py-1 text-xs text-white`}>{label}</span></div>
export default function Gallery(){const{t}=useC();const [p,setP]=useState(50)
  return <section id="resultados" className="scroll-mt-16 px-5 py-20"><div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
    <div><h2 className="font-display text-4xl sm:text-5xl">{t.galT}</h2><p className="mt-4 max-w-md text-mute">{t.galD}</p></div>
    <div className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl border border-line">
      <Pane src="/images/before.jpg" cls="from-stone-500 to-stone-700" label={t.gal[0]}/>
      <div className="absolute inset-0" style={{clipPath:`inset(0 0 0 ${p}%)`}}><Pane src="/images/after.jpg" cls="from-moss to-accent" label={t.gal[1]} right/></div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-bg" style={{left:`${p}%`}}><span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg text-ink shadow-xl">↔</span></div>
      <input type="range" min="0" max="100" value={p} onChange={e=>setP(+e.target.value)} aria-label="before / after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"/></div></div></section>}
