import Image from 'next/image'
import Link from 'next/link'
import { ShowerHead, Wifi, Wind, Coffee, Refrigerator, Sofa } from 'lucide-react'
import { rooms } from '@/lib/rooms-data'

const icons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={14} aria-hidden="true" />,
  'Система кондиционирования': <Wind size={14} aria-hidden="true" />,
  'Душ': <ShowerHead size={14} aria-hidden="true" />,
  'Отдельная гостиная': <Sofa size={14} aria-hidden="true" />,
  'Чайник': <Coffee size={14} aria-hidden="true" />,
  'Холодильник': <Refrigerator size={14} aria-hidden="true" />,
}

export default function Rooms() {
  return (
    <section id="rooms" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            Размещение
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
            Наши номера
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="group bg-card overflow-hidden w-full md:w-[calc(50%-1rem)]"
            >
              {/* Image - Clickable */}
              <Link href={`/rooms/${room.id}`} className="block relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
                <div className="absolute top-4 right-4 bg-background/90 px-3 py-1">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">
                    {room.size}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
                  {room.subtitle}
                </p>
                <Link href={`/rooms/${room.id}`}>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-4 hover:text-primary transition-colors">
                    {room.title}
                  </h3>
                </Link>
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-2 py-1"
                    >
                      {icons[f]}
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">от</p>
                    <p className="font-serif text-2xl text-primary font-light">
                      {room.price} руб
                      <span className="text-sm text-muted-foreground font-sans"> / ночь</span>
                    </p>
                  </div>
                  <Link
                    href={`/rooms/${room.id}`}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:bg-accent transition-colors duration-300"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
