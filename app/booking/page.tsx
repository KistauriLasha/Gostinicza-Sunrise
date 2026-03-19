import { Metadata } from 'next'
import Navbar from '@/components/hotel/Navbar'
import Footer from '@/components/hotel/Footer'
import RoomsBooking from '@/components/hotel/RoomsBooking'

export const metadata: Metadata = {
  title: 'Бронирование | Гостевой дом Sunrise',
  description: 'Забронируйте номер в гостевом доме Sunrise онлайн. Выберите даты и тип номера для комфортного отдыха.',
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/placeholder.svg')] bg-cover bg-center opacity-20" />
        <div className="relative text-center text-primary-foreground px-6">
          <p className="text-xs tracking-[0.35em] uppercase mb-3 text-primary-foreground/70">
            Онлайн бронирование
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
            Забронировать номер
          </h1>
        </div>
      </section>
      
      <RoomsBooking />
      <Footer />
    </main>
  )
}
