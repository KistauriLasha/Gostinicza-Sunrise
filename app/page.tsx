import Navbar from '@/components/hotel/Navbar'
import Hero from '@/components/hotel/Hero'
import About from '@/components/hotel/About'
import RoomsBooking from '@/components/hotel/RoomsBooking'
import Gallery from '@/components/hotel/Gallery'
import Contacts from '@/components/hotel/Contacts'
import Footer from '@/components/hotel/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <RoomsBooking />
      <Gallery />
      <Contacts />
      <Footer />
    </main>
  )
}
