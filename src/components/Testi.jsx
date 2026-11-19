import {useEffect,useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {TESTI} from '../i18n'
import {useC} from '../context'

export default function Testi(){const{lang,t}=useC();const [i,setI]=useState(0)
  useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%TESTI.length),5500);return()=>clearInterval(id)},[])
  return <section id="opiniones" className="scroll-mt-16 px-5 py-24 text-center"><h2 className="font-display text-3xl text-mute">{t.tT}</h2>
    <div className="mx-auto mt-10 min-h-[11rem] max-w-3xl"><AnimatePresence mode="wait"><motion.blockquote key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.5}}>
      <p className="font-display text-3xl font-light italic leading-snug sm:text-4xl">“{TESTI[i][lang]}”</p><footer className="mt-5 text-sm text-mute">{TESTI[i].n}</footer></motion.blockquote></AnimatePresence></div>
    <div className="mt-6 flex justify-center gap-2">{TESTI.map((_,k)=><button key={k} aria-label={'review '+(k+1)} onClick={()=>setI(k)} className={`h-2 rounded-full transition-all ${k===i?'w-8 bg-accent':'w-2 bg-line'}`}/>)}</div></section>}
