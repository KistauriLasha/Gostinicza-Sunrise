import Image from 'next/image'
import { Waves, Leaf, Utensils, Umbrella, Car, Baby } from 'lucide-react'

const services = [
  {
    icon: <Waves size={28} />,
    title: 'Бассейн',
    desc: 'Открытый инфинити-бассейн с панорамным видом на Чёрное море и горы.',
    image: '/images/pool.jpg',
  },
  {
    icon: <Leaf size={28} />,
    title: 'СПА-центр',
    desc: 'Широкий выбор массажей, процедур и оздоровительных программ.',
    image: '/images/spa.jpg',
  },
  {
    icon: <Utensils size={28} />,
    title: 'Ресторан',
    desc: 'Авторская кухня на основе местных продуктов с видом на море.',
    image: '/images/restaurant.jpg',
  },
  {
    icon: <Umbrella size={28} />,
    title: 'Пляж',
    desc: 'Собственный пляж с шезлонгами и зонтиками в 300 метрах от отеля.',
    image: '/images/beach.jpg',
  },
  {
    icon: <Car size={28} />,
    title: 'Трансфер',
    desc: 'Встреча в аэропорту Сочи или Адлера, организация экскурсий.',
    image: null,
  },
  {
    icon: <Baby size={28} />,
    title: 'Детский клуб',
    desc: 'Анимация и досуг для детей от 3 лет на территории отеля.',
    image: null,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            Для вашего комфорта
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
            Услуги и удобства
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mt-6" />
        </div>

        {/* Featured cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {services.slice(0, 2).map((s) => (
            <div key={s.title} className="relative h-80 overflow-hidden group">
              <Image
                src={s.image!}
                alt={s.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/50" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-accent mb-3">{s.icon}</div>
                <h3 className="font-serif text-2xl text-white font-light mb-2">{s.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {services.slice(2, 4).map((s) => (
            <div key={s.title} className="relative h-60 overflow-hidden group md:col-span-1">
              <Image
                src={s.image!}
                alt={s.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/50" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-accent mb-2">{s.icon}</div>
                <h3 className="font-serif text-xl text-white font-light mb-1">{s.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
          {/* last two plain cards */}
          <div className="flex flex-col gap-8">
            {services.slice(4).map((s) => (
              <div key={s.title} className="bg-secondary p-6 flex gap-4 items-start">
                <div className="text-primary mt-1">{s.icon}</div>
                <div>
                  <h3 className="font-serif text-lg text-foreground font-light mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
