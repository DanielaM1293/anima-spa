import {useRef,useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {ChevronLeft,ChevronRight,Check} from 'lucide-react'
import {SERVICES} from '../i18n'
import {btn} from '../lib/utils'
import {useC} from '../context'

export default function Services(){const{t,lang,money,cart,toggle}=useC()
  const [cat,setCat]=useState('all');const ref=useRef()
  const list=SERVICES.filter(s=>cat==='all'||s.cat===cat)
  const go=d=>ref.current.scrollBy({left:d*330,behavior:'smooth'})
  return <section id="rituales" className="scroll-mt-16 py-20">
    <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5">
      <div><h2 className="max-w-md font-display text-4xl sm:text-5xl">{t.svcT}</h2>
        <div className="mt-6 flex flex-wrap gap-2">{['all','body','face','ritual'].map(k=><button key={k} onClick={()=>setCat(k)} className={`rounded-full border px-4 py-1.5 text-sm transition ${cat===k?'border-accent bg-accent text-bg':'border-line hover:bg-card'}`}>{k==='all'?t.all:t.cats[k]}</button>)}</div></div>
      <div className="flex gap-2"><button aria-label="prev" onClick={()=>go(-1)} className="icon w-11 justify-center !px-0"><ChevronLeft size={18}/></button><button aria-label="next" onClick={()=>go(1)} className="icon w-11 justify-center !px-0"><ChevronRight size={18}/></button></div></div>
    <div ref={ref} className="no-bar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">
      <AnimatePresence mode="popLayout">{list.map(s=>{const on=cart.includes(s.id);return(
        <motion.article layout key={s.id} initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.92}} whileHover={{y:-6}} className="w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-card">
          <div className="relative h-52 overflow-hidden" style={{background:`linear-gradient(150deg,${s.g[0]},${s.g[1]})`}}>
            <img src={s.img} alt={s.n[lang]} loading="lazy" onError={e=>{const i=e.currentTarget;i.src.endsWith('.svg')?i.remove():i.src=i.src.replace('.jpg','.svg')}} className="absolute inset-0 h-full w-full object-cover"/>
            <motion.div animate={{x:[0,16,0],y:[0,-10,0]}} transition={{duration:9,repeat:Infinity}} className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/20 blur-xl"/>
            <span className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur">{s.min} {t.min}</span></div>
          <div className="p-5"><h3 className="font-display text-2xl leading-tight">{s.n[lang]}</h3><p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-mute">{s.d[lang]}</p>
            <div className="mt-4 flex items-center justify-between"><b>{money(s.price)}</b>
              <button onClick={()=>toggle(s.id)} className={`${btn} !py-2 ${on?'bg-moss text-bg':'border border-line hover:bg-bg'}`}>{on?<><Check size={14} className="mr-1 inline"/>{t.added}</>:t.add}</button></div></div>
        </motion.article>)})}</AnimatePresence></div></section>}
