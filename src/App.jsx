import {Provider,useC} from './context'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Quiz from './components/Quiz'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Testi from './components/Testi'
import MyBookings from './components/MyBookings'
const Footer=()=>{const{t}=useC();return <footer className="border-t border-line py-10 text-center text-sm text-mute">{t.foot}</footer>}
export default function App(){return <Provider><Nav/><Hero/><Services/><Quiz/><Gallery/><Booking/><Testi/><Footer/><MyBookings/></Provider>}
