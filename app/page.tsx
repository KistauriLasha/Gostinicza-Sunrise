import Navbar from '@/components/hotel/Navbar'
import Hero from '@/components/hotel/Hero'
import About from '@/components/hotel/About'
import Rooms from '@/components/hotel/Rooms'
import Services from '@/components/hotel/Services'
import Restaurant from '@/components/hotel/Restaurant'
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
      <Services />
      <Restaurant />
      <Gallery />
      <Booking />
      <Contacts />
      <Footer />
    </main>
  )
}
