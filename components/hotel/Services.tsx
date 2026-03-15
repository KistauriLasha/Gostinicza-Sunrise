import Image from 'next/image'
import { Umbrella, Car } from 'lucide-react'

const services = [
  {
    icon: <Umbrella size={28} />,
    title: 'Пляж',
    desc: 'Собственный пляж с шезлонгами и зонтиками в 1,1 км от отеля.',
    image: '/images/beach.jpg',
  },
  {
    icon: <Car size={28} />,
    title: 'Трансфер',
    desc: 'Встреча в аэропорту Сочи или Адлера, организация экскурсий.',
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

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.title} className="relative group">
              {s.image ? (
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={s.image}
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
              ) : (
                <div className="bg-secondary p-8 h-80 flex flex-col justify-center">
                  <div className="text-primary mb-4">{s.icon}</div>
                  <h3 className="font-serif text-2xl text-foreground font-light mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
