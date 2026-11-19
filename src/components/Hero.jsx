import {motion,useScroll,useTransform} from 'framer-motion'
import {Clock,Star} from 'lucide-react'
import {primary,ghost} from '../lib/utils'
import {useC} from '../context'

export default function Hero(){const{t,name,setName}=useC()
  const{scrollY}=useScroll();const y1=useTransform(scrollY,[0,700],[0,-90]);const y2=useTransform(scrollY,[0,700],[0,70])
  const up=i=>({initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{delay:.15*i,duration:.9,ease:[.22,1,.36,1]}})
  return <section className="relative overflow-hidden px-5 pb-24 pt-32">
    <motion.div style={{y:y2}} className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"/>
    <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <motion.p {...up(0)} className="mb-5 text-sm text-mute">{name?`${t.hi}, ${name}.`:t.eyebrow}</motion.p>
        <motion.h1 {...up(1)} className="font-display text-6xl font-light leading-[.98] sm:text-8xl">{t.h1[0]}<br/><span className="italic text-moss">{t.h1[1]}</span></motion.h1>
        <motion.p {...up(2)} className="mt-6 max-w-md text-lg leading-relaxed text-mute">{t.sub}</motion.p>
        <motion.input {...up(3)} value={name} onChange={e=>setName(e.target.value)} placeholder={t.ask} aria-label={t.ask} className="mt-8 w-full max-w-sm rounded-full border border-line bg-card px-5 py-3 text-sm outline-none transition focus:border-accent"/>
        <motion.div {...up(4)} className="mt-5 flex flex-wrap gap-3"><a href="#reservar" className={primary}>{t.cta}</a><a href="#ritual" className={ghost}>{t.cta2}</a></motion.div>
      </div>
      <motion.div style={{y:y1}} className="relative mx-auto w-full max-w-md">
        <motion.div initial={{clipPath:'inset(100% 0 0 0)'}} animate={{clipPath:'inset(0% 0 0 0)'}} transition={{duration:1.4,ease:[.22,1,.36,1]}}
          className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] bg-gradient-to-b from-moss via-accent/70 to-accent">
          {[1,2,3].map(i=><motion.div key={i} animate={{scale:[1,1.08,1]}} transition={{duration:6,repeat:Infinity,delay:i}} className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg/30" style={{width:`${i*28}%`,aspectRatio:1}}/>)}
          <motion.div animate={{y:[0,-14,0]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}} className="absolute left-1/2 top-[38%] h-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg/90 shadow-2xl" style={{aspectRatio:1}}/>
        </motion.div>
        <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:1.3}} className="absolute -left-4 bottom-16 rounded-2xl border border-line bg-card/90 px-4 py-3 text-sm shadow-xl backdrop-blur"><Clock size={14} className="mb-1 text-accent"/>{t.next}<b className="block font-display text-xl">16:30</b></motion.div>
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:1.5}} className="absolute -right-3 top-24 flex items-center gap-2 rounded-full border border-line bg-card/90 px-4 py-2 text-sm shadow-xl backdrop-blur"><Star size={14} className="fill-accent text-accent"/>{t.rate}</motion.div>
      </motion.div></div></section>}
