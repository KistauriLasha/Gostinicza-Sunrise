import Navbar from '@/components/hotel/Navbar'
import Hero from '@/components/hotel/Hero'
import About from '@/components/hotel/About'
import Rooms from '@/components/hotel/Rooms'
import Gallery from '@/components/hotel/Gallery'
import Booking from '@/components/hotel/Booking'
import Contacts from '@/components/hotel/Contacts'
import Footer from '@/components/hotel/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Booking />
      <Contacts />
      <Footer />
    </main>
  )
}
