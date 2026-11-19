import {createContext,useContext,useEffect,useState} from 'react'
import {T} from './i18n'
import useLocalStorage from './hooks/useLocalStorage'
const Ctx=createContext();export const useC=()=>useContext(Ctx)
export function Provider({children}){
  const [lang,setLang]=useLocalStorage('lang',navigator.language.startsWith('en')?'en':'es')
  const [dark,setDark]=useLocalStorage('dark',matchMedia('(prefers-color-scheme: dark)').matches)
  const [name,setName]=useLocalStorage('name','')
  const [cart,setCart]=useLocalStorage('cart',[])
  const [bookings,setBookings]=useLocalStorage('bookings',[])
  const [points,setPoints]=useLocalStorage('points',0)
  const [drawer,setDrawer]=useState(false)
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark);document.documentElement.lang=lang},[dark,lang])
  const money=n=>new Intl.NumberFormat(lang==='es'?'es-CO':'en-US',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n)
  const toggle=id=>setCart(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id])
  const addBooking=b=>{const earned=Math.floor(b.total/1000);setBookings(x=>[{...b,earned,status:'ok'},...x]);setPoints(p=>p+earned-b.used)}
  const cancelBooking=code=>{const b=bookings.find(x=>x.code===code);if(!b||b.status!=='ok')return
    setBookings(x=>x.map(y=>y.code===code?{...y,status:'cancelled'}:y));setPoints(p=>Math.max(0,p-b.earned+b.used))}
  return <Ctx.Provider value={{lang,setLang,t:T[lang],dark,setDark,name,setName,cart,setCart,toggle,money,bookings,points,addBooking,cancelBooking,drawer,setDrawer}}>{children}</Ctx.Provider>}
