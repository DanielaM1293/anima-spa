export const btn='rounded-full px-6 py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none'
export const primary=btn+' bg-accent text-bg hover:brightness-110'
export const ghost=btn+' border border-line hover:bg-card'
export const SLOTS=['09:00','10:30','12:00','14:00','15:30','17:00','18:30']
export const taken=(d,s)=>[...d.toDateString()+s].reduce((a,c)=>a+c.charCodeAt(0),0)%4===0
export const isPast=s=>{const[h,m]=s.split(':');const d=new Date();d.setHours(+h,+m,0,0);return d<new Date()}
export const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return n.length>=13&&s%10===0}
const TH=[0,300,800]
export const tierOf=p=>{const i=TH.reduce((a,t,k)=>p>=t?k:a,0);const next=TH[i+1];return{i,next,pct:next?((p-TH[i])/(next-TH[i]))*100:100}}
