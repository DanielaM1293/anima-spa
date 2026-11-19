import {useMemo,useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {Sparkles} from 'lucide-react'
import {SERVICES} from '../i18n'
import {btn} from '../lib/utils'
import {useC} from '../context'

export default function Quiz(){const{t,lang,money,cart,toggle}=useC()
  const [i,setI]=useState(0);const [a,setA]=useState({})
  const res=useMemo(()=>i<2?null:SERVICES.filter(s=>s.goals.includes(a.g)).sort((x,y)=>Math.abs(x.min-a.m)-Math.abs(y.min-a.m))[0],[i,a])
  const pick=v=>{setA(x=>({...x,[i?'m':'g']:v}));setI(i+1)}
  return <section id="ritual" className="scroll-mt-16 px-5 py-20"><div className="mx-auto max-w-4xl rounded-[2.5rem] bg-moss p-8 text-bg sm:p-14">
    <h2 className="font-display text-4xl sm:text-5xl">{t.qT}</h2>
    <div className="mt-4 h-1 rounded bg-bg/20"><motion.div className="h-full rounded bg-bg" animate={{width:`${Math.min(i,2)*50+(i<2?0:0)}%`}}/></div>
    <AnimatePresence mode="wait"><motion.div key={i} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:.35}} className="mt-8">
      {res?<div className="flex flex-col items-start gap-4"><p className="text-bg/70">{t.res}</p><h3 className="font-display text-4xl">{res.n[lang]}</h3><p className="max-w-md text-bg/80">{res.d[lang]} · {res.min} {t.min} · {money(res.price)}</p>
        <div className="flex flex-wrap gap-3"><button onClick={()=>{if(!cart.includes(res.id))toggle(res.id);document.getElementById('reservar').scrollIntoView({behavior:'smooth'})}} className={btn+' bg-bg text-ink'}><Sparkles size={14} className="mr-1 inline"/>{t.cta}</button><button onClick={()=>{setI(0);setA({})}} className={btn+' border border-bg/40'}>{t.retry}</button></div></div>
      :<><p className="mb-5 text-xl">{t.q[i]}</p><div className="grid gap-3 sm:grid-cols-2">{t.o[i].map(([v,l])=><button key={v} onClick={()=>pick(v)} className="rounded-2xl border border-bg/30 px-5 py-4 text-left transition hover:bg-bg hover:text-ink">{l}</button>)}</div></>}
    </motion.div></AnimatePresence></div></section>}
