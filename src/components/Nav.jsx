import {motion,AnimatePresence} from 'framer-motion'
import {Sun,Moon,Languages,User} from 'lucide-react'
import {primary} from '../lib/utils'
import {useC} from '../context'

export default function Nav(){const{t,cart,dark,setDark,lang,setLang,setDrawer,points}=useC()
  const ids=['rituales','ritual','resultados','reservar','opiniones']
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
      <a href="#" className="font-display text-2xl">ánima</a>
      <nav className="hidden gap-8 text-sm md:flex">{t.nav.map((n,i)=><a key={n} href={'#'+ids[i]} className="text-mute transition hover:text-ink">{n}</a>)}</nav>
      <div className="flex items-center gap-2">
        <button onClick={()=>setDrawer(true)} className="icon hidden sm:flex"><User size={15} className="mr-1.5"/>{t.mine}<span className="ml-1.5 text-xs text-accent">{points}</span></button>
        <button aria-label="Language" onClick={()=>setLang(lang==='es'?'en':'es')} className="icon"><Languages size={16}/><span className="ml-1 text-xs">{lang==='es'?'EN':'ES'}</span></button>
        <button aria-label="Theme" onClick={()=>setDark(!dark)} className="icon w-9 justify-center !px-0">
          <AnimatePresence mode="wait" initial={false}><motion.span key={String(dark)} initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.2}}>{dark?<Sun size={16}/>:<Moon size={16}/>}</motion.span></AnimatePresence></button>
        <a href="#reservar" className={primary+' relative !py-2'}>{t.cta}
          {cart.length>0&&<motion.span key={cart.length} initial={{scale:0}} animate={{scale:1}} className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-moss text-[11px] text-bg">{cart.length}</motion.span>}</a>
      </div></div></header>}
