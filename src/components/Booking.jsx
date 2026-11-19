import {useEffect,useMemo,useState} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {Check,Lock,Download} from 'lucide-react'
import {SERVICES,PROS} from '../i18n'
import {primary,ghost,SLOTS,taken,isPast,luhn} from '../lib/utils'
import {processPayment} from '../lib/payment'
import {useC} from '../context'
import Field from './Field'

export default function Booking(){const{t,lang,money,cart,setCart,name,points,addBooking}=useC()
  const days=useMemo(()=>Array.from({length:14},(_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return d}),[])
  const [step,setStep]=useState(0);const [di,setDi]=useState(0);const [slot,setSlot]=useState(null);const [pro,setPro]=useState('any')
  const [f,setF]=useState({name:name,email:'',phone:'',notes:''});const [cc,setCc]=useState({num:'',exp:'',cvc:'',holder:''})
  const [promo,setPromo]=useState('');const [ok,setOk]=useState(null);const [aroma,setAroma]=useState(false)
  const [flip,setFlip]=useState(false);const [busy,setBusy]=useState(false);const [done,setDone]=useState(null);const [show,setShow]=useState(false);const [usePts,setUsePts]=useState(false)
  useEffect(()=>setF(x=>x.name?x:{...x,name}),[name])
  const items=SERVICES.filter(s=>cart.includes(s.id));const mins=items.reduce((a,s)=>a+s.min,0)
  const sub=items.reduce((a,s)=>a+s.price,0)+(aroma&&items.length?25000:0);const disc=ok?Math.round(sub*.1):0;const pts=usePts&&points>=500?Math.min(50000,sub-disc):0;const total=sub-disc-pts
  const fv={name:f.name.trim().length>2,email:/^\S+@\S+\.\S+$/.test(f.email),phone:f.phone.replace(/\D/g,'').length>=7}
  const [mm,yy]=cc.exp.split('/');const exp=+mm>=1&&+mm<=12&&yy?.length===2&&new Date(2000+ +yy,+mm)>new Date()
  const cv={num:luhn(cc.num.replace(/\s/g,'')),exp,cvc:/^\d{3,4}$/.test(cc.cvc),holder:cc.holder.trim().length>2}
  const can=[items.length>0,!!slot,Object.values(fv).every(Boolean),Object.values(cv).every(Boolean)][step]
  const pay=async()=>{setShow(true);if(!can)return;setBusy(true);const r=await processPayment({amount:total,card:cc});setBusy(false);if(r.ok){setDone(r.code);const[h,m]=slot.split(':'),d=new Date(days[di]);d.setHours(+h,+m,0,0);addBooking({code:r.code,ids:cart,date:d.toISOString(),slot,pro,total,used:pts?500:0})}}
  const ics=()=>{const[h,m]=slot.split(':');const s=new Date(days[di]);s.setHours(+h,+m);const e=new Date(+s+mins*6e4);const z=x=>x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${z(s)}\nDTEND:${z(e)}\nSUMMARY:Ánima Spa (${done})\nEND:VEVENT\nEND:VCALENDAR`],{type:'text/calendar'}));a.download='anima.ics';a.click()}
  const reset=()=>{setDone(null);setStep(0);setSlot(null);setCart([]);setCc({num:'',exp:'',cvc:'',holder:''});setShow(false);setOk(null);setUsePts(false)}
  const fmt=n=>n.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  return <section id="reservar" className="scroll-mt-16 px-5 py-20"><div className="mx-auto max-w-6xl">
    <h2 className="font-display text-4xl sm:text-5xl">{t.bT}</h2>
    {done?<motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} className="mt-10 grid place-items-center rounded-3xl border border-line bg-card p-12 text-center">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:.2}} className="grid h-20 w-20 place-items-center rounded-full bg-moss text-bg"><Check size={36}/></motion.div>
      <h3 className="mt-6 font-display text-4xl">{t.done}</h3><p className="mt-2 text-mute">{t.code}: <b className="text-ink">{done}</b></p>
      <p className="mt-1 text-mute">{days[di].toLocaleDateString(lang==='es'?'es-CO':'en-US',{weekday:'long',day:'numeric',month:'long'})} · {slot}</p>
      <div className="mt-6 flex gap-3"><button onClick={ics} className={primary}><Download size={14} className="mr-1 inline"/>{t.ics}</button><button onClick={reset} className={ghost}>{t.again}</button></div></motion.div>
    :<div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
        <ol className="mb-8 flex gap-2">{t.steps.map((s,i)=><li key={s} className="flex-1"><div className={`h-1 rounded transition-colors duration-500 ${i<=step?'bg-accent':'bg-line'}`}/><span className={`mt-2 block text-xs ${i===step?'text-ink':'text-mute'}`}>{s}</span></li>)}</ol>
        <AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.3}}>
          {step===0&&(items.length?<div className="space-y-3">{items.map(s=><div key={s.id} className="flex items-center justify-between rounded-2xl border border-line p-4"><div><b className="font-display text-lg">{s.n[lang]}</b><p className="text-xs text-mute">{s.min} {t.min}</p></div><div className="flex items-center gap-3">{money(s.price)}<button aria-label="remove" onClick={()=>setCart(c=>c.filter(x=>x!==s.id))} className="text-mute hover:text-ink">✕</button></div></div>)}
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-line p-4 text-sm"><span>{t.aroma} <span className="text-mute">+{money(25000)}</span></span><input type="checkbox" checked={aroma} onChange={e=>setAroma(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--accent))]"/></label>
            {points>=500&&<label className="flex cursor-pointer items-center justify-between rounded-2xl border border-line p-4 text-sm"><span>{t.usePts}</span><input type="checkbox" checked={usePts} onChange={e=>setUsePts(e.target.checked)} className="h-4 w-4 accent-[rgb(var(--accent))]"/></label>}
            <div className="flex gap-2"><input value={promo} onChange={e=>setPromo(e.target.value)} placeholder={t.promo} className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-accent"/><button onClick={()=>setOk(promo.trim().toUpperCase()==='ANIMA10')} className={ghost}>{t.apply}</button></div>
            {ok!==null&&<p className={`text-xs ${ok?'text-moss':'text-red-500'}`}>{ok?t.okp:t.invalid}</p>}</div>
            :<p className="py-10 text-center text-mute">{t.empty}</p>)}
          {step===1&&<div><p className="mb-3 text-sm text-mute">{t.date}</p><div className="no-bar flex gap-2 overflow-x-auto pb-2">{days.map((d,i)=><button key={i} onClick={()=>{setDi(i);setSlot(null)}} className={`w-16 shrink-0 rounded-2xl border py-3 text-center transition ${di===i?'border-accent bg-accent text-bg':'border-line hover:bg-bg'}`}><span className="block text-xs">{d.toLocaleDateString(lang==='es'?'es-CO':'en-US',{weekday:'short'})}</span><b className="font-display text-xl">{d.getDate()}</b></button>)}</div>
            <p className="mb-3 mt-6 text-sm text-mute">{t.time}</p><div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{SLOTS.map(s=>{const off=taken(days[di],s)||(di===0&&isPast(s));return <button key={s} disabled={off} onClick={()=>setSlot(s)} className={`rounded-xl border py-2.5 text-sm transition disabled:line-through disabled:opacity-30 ${slot===s?'border-moss bg-moss text-bg':'border-line hover:bg-bg'}`}>{s}</button>})}</div>
            <p className="mb-3 mt-6 text-sm text-mute">{t.pro}</p><div className="flex flex-wrap gap-2">{[{id:'any',n:t.any},...PROS].map(p=><button key={p.id} onClick={()=>setPro(p.id)} className={`rounded-full border px-4 py-2 text-sm transition ${pro===p.id?'border-accent bg-accent text-bg':'border-line hover:bg-bg'}`}>{p.n}{p.r&&<span className="ml-1 opacity-70">★{p.r}</span>}</button>)}</div></div>}
          {step===2&&<div className="grid gap-4 sm:grid-cols-2"><Field label={t.name} value={f.name} err={show&&!fv.name} onChange={e=>setF({...f,name:e.target.value})}/><Field label={t.email} type="email" value={f.email} err={show&&!fv.email} onChange={e=>setF({...f,email:e.target.value})}/><Field label={t.phone} type="tel" value={f.phone} err={show&&!fv.phone} onChange={e=>setF({...f,phone:e.target.value})}/><Field label={t.notes} value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/></div>}
          {step===3&&<div className="grid gap-6 md:grid-cols-2"><div className="[perspective:1000px]"><motion.div animate={{rotateY:flip?180:0}} transition={{duration:.6}} style={{transformStyle:'preserve-3d'}} className="relative h-48 w-full">
              <div style={{backfaceVisibility:'hidden'}} className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-moss to-accent p-5 text-bg shadow-xl"><Lock size={18}/><p className="font-mono text-lg tracking-widest">{cc.num||'•••• •••• •••• ••••'}</p><div className="flex justify-between text-xs"><span>{cc.holder||t.holder}</span><span>{cc.exp||'MM/YY'}</span></div></div>
              <div style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}} className="absolute inset-0 rounded-2xl bg-moss py-6 text-bg shadow-xl"><div className="h-9 bg-black/60"/><p className="mx-5 mt-5 rounded bg-bg p-2 text-right font-mono text-ink">{cc.cvc||'•••'}</p></div></motion.div></div>
            <div className="space-y-3"><Field label={t.card} inputMode="numeric" value={cc.num} err={show&&!cv.num} onChange={e=>setCc({...cc,num:fmt(e.target.value)})}/><Field label={t.holder} value={cc.holder} err={show&&!cv.holder} onChange={e=>setCc({...cc,holder:e.target.value})}/>
              <div className="grid grid-cols-2 gap-3"><Field label={t.exp} placeholder="08/29" value={cc.exp} err={show&&!cv.exp} onChange={e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+'/'+v.slice(2);setCc({...cc,exp:v})}}/><Field label={t.cvc} inputMode="numeric" value={cc.cvc} err={show&&!cv.cvc} onFocus={()=>setFlip(true)} onBlur={()=>setFlip(false)} onChange={e=>setCc({...cc,cvc:e.target.value.replace(/\D/g,'').slice(0,4)})}/></div>
              <p className="text-xs text-mute">{show&&!can?<span className="text-red-500">{t.err}</span>:t.secure}</p></div></div>}
        </motion.div></AnimatePresence>
        <div className="mt-8 flex justify-between"><button disabled={step===0||busy} onClick={()=>setStep(step-1)} className={ghost}>{t.back}</button>
          {step<3?<button disabled={!can} onClick={()=>{if(step===2)setShow(false);setStep(step+1)}} className={primary}>{t.cont}</button>
          :<button disabled={busy} onClick={pay} className={primary}>{busy?t.paying:`${t.pay} ${money(total)}`}</button>}</div></div>
      <aside className="h-fit rounded-3xl bg-ink p-7 text-bg lg:sticky lg:top-24"><p className="font-display text-2xl">Ánima</p>
        <div className="mt-5 space-y-2 text-sm">{items.map(s=><div key={s.id} className="flex justify-between"><span>{s.n[lang]}</span><span>{money(s.price)}</span></div>)}{aroma&&items.length>0&&<div className="flex justify-between"><span>{t.aroma}</span><span>{money(25000)}</span></div>}</div>
        {slot&&<p className="mt-4 text-sm opacity-70">{days[di].toLocaleDateString(lang==='es'?'es-CO':'en-US',{weekday:'short',day:'numeric',month:'short'})} · {slot} · {mins} {t.min}{pro!=='any'&&' · '+PROS.find(p=>p.id===pro).n}</p>}
        <div className="mt-5 space-y-1 border-t border-bg/20 pt-4 text-sm"><div className="flex justify-between opacity-70"><span>{t.sub2}</span><span>{money(sub)}</span></div>{disc+pts>0&&<div className="flex justify-between text-accent"><span>{t.disc}</span><span>−{money(disc+pts)}</span></div>}
          <div className="flex justify-between pt-2 font-display text-2xl"><span>{t.total}</span><motion.span key={total} initial={{y:8,opacity:0}} animate={{y:0,opacity:1}}>{money(total)}</motion.span></div></div></aside></div>}
  </div></section>}
