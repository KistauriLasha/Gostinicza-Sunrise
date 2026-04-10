import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ShowerHead,
  Wifi,
  Wind,
  Coffee,
  Refrigerator,
  Sofa,
  ArrowLeft,
  Users,
  Maximize,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { rooms, getRoomById } from '@/lib/rooms-data'
import Navbar from '@/components/hotel/Navbar'
import Footer from '@/components/hotel/Footer'
import RoomGallery from '@/components/hotel/RoomGallery'
import RoomBookingSidebar from './RoomBookingSidebar'

const icons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={18} />,
  'Система кондиционирования': <Wind size={18} />,
  'Душ': <ShowerHead size={18} />,
  'Отдельная гостиная': <Sofa size={18} />,
  'Чайник': <Coffee size={18} />,
  'Холодильник': <Refrigerator size={18} />,
}

export async function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const room = getRoomById(id)

  if (!room) {
    return {
      title: 'Номер не найден | Гостевой дом Sunrise',
    }
  }

  return {
    title: `${room.title} | Гостевой дом Sunrise`,
    description: room.description,
  }
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const room = getRoomById(id)

  if (!room) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href="/#rooms-booking"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Назад к номерам
        </Link>
      </div>

      {/* Title Section */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <p className="text-xs tracking-[0.35em] uppercase mb-3 text-muted-foreground">
          {room.subtitle}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
          {room.title}
        </h1>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pb-8 border-b border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Maximize size={20} />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={20} />
                <span>До {room.capacity} гостей</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                О номере
              </h2>
              <p className="text-muted-foreground leading-relaxed">{room.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                Основные удобства
              </h2>
              <div className="flex flex-wrap gap-3">
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground border border-border px-4 py-2"
                  >
                    {icons[feature]}
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                Все удобства номера
              </h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3 text-muted-foreground">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <RoomGallery images={room.images} title={room.title} />
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <RoomBookingSidebar room={room} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
