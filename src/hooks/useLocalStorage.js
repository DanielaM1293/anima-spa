import {useEffect,useState} from 'react'
export default function useLocalStorage(k,d){
  const [v,setV]=useState(()=>{try{const s=localStorage.getItem(k);return s===null?d:JSON.parse(s)}catch{return d}})
  useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},[k,v])
  return [v,setV]}
