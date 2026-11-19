import {motion,AnimatePresence} from 'framer-motion'
import {X} from 'lucide-react'
import {useC} from '../context'
import {SERVICES} from '../i18n'
import {tierOf} from '../lib/utils'
export default function MyBookings(){const{t,lang,money,drawer,setDrawer,bookings,cancelBooking,points}=useC();const tier=tierOf(points)
  return <AnimatePresence>{drawer&&[
    <motion.div key="o" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setDrawer(false)} className="fixed inset-0 z-[60] bg-black/50"/>,
    <motion.aside key="d" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:30,stiffness:260}} className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-bg p-6 shadow-2xl">
      <div className="flex items-center justify-between"><h3 className="font-display text-3xl">{t.mineT}</h3><button aria-label="close" onClick={()=>setDrawer(false)} className="icon w-9 justify-center !px-0"><X size={16}/></button></div>
      <div className="mt-6 rounded-2xl bg-moss p-5 text-bg"><p className="font-display text-2xl">{t.tiers[tier.i]}</p><p className="text-sm opacity-80">{points} {t.pts}{tier.next?` · ${tier.next-points} ${t.toNext}`:''}</p>
        <div className="mt-3 h-1.5 rounded bg-bg/25"><motion.div className="h-full rounded bg-bg" animate={{width:`${tier.pct}%`}}/></div><p className="mt-3 text-xs opacity-70">{t.earn}</p></div>
      <div className="mt-6 flex-1 space-y-3 overflow-y-auto">{bookings.length===0&&<p className="text-mute">{t.noB}</p>}
        {bookings.map(b=>{const names=b.ids.map(id=>SERVICES.find(s=>s.id===id)?.n[lang]).join(', ');const d=new Date(b.date);const can=b.status==='ok'&&d>new Date()
          return <div key={b.code} className={`rounded-2xl border border-line bg-card p-4 ${b.status!=='ok'?'opacity-50':''}`}>
            <div className="flex justify-between text-sm"><b>{b.code}</b><span>{money(b.total)}</span></div><p className="mt-1 font-display text-lg">{names}</p>
            <p className="text-sm text-mute">{d.toLocaleDateString(lang==='es'?'es-CO':'en-US',{weekday:'short',day:'numeric',month:'short'})} · {b.slot}</p>
            {b.status!=='ok'?<p className="mt-2 text-xs text-mute">{t.cancelled}</p>:can&&<button onClick={()=>cancelBooking(b.code)} className="mt-2 text-xs underline">{t.cancel}</button>}</div>})}</div></motion.aside>]}</AnimatePresence>}
