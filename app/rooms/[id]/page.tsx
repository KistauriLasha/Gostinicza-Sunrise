import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
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
import { rooms, getRoomById } from '@/lib/rooms-data'
import Navbar from '@/components/hotel/Navbar'
import Footer from '@/components/hotel/Footer'

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
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="text-xs tracking-[0.35em] uppercase mb-3 text-white/80">
              {room.subtitle}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
              {room.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href="/#rooms"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Назад к номерам
        </Link>
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
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-6">
                Фотографии
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.images.map((img, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${room.title} - фото ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-card border border-border p-6">
              <div className="mb-6">
                <p className="text-xs text-muted-foreground">от</p>
                <p className="font-serif text-3xl text-primary font-light">
                  {room.price} руб
                  <span className="text-base text-muted-foreground font-sans"> / ночь</span>
                </p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Площадь</span>
                  <span className="text-foreground">{room.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Вместимость</span>
                  <span className="text-foreground">До {room.capacity} гостей</span>
                </div>
              </div>

              <Link
                href="/#booking"
                className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors duration-300"
              >
                Забронировать
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Бесплатная отмена за 24 часа до заезда
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
