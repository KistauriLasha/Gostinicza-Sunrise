import Image from 'next/image'

export default function Restaurant() {
  return (
    <section id="restaurant" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/restaurant.jpg"
                alt="Ресторан Grand Resort Пицунда"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-2/3 h-2/3 border border-primary/30 -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-4">
              Гастрономия
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 text-balance">
              Ресторан
              <br />
              <em>«Апсны»</em>
            </h2>
            <div className="w-12 h-px bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-5">
              Наш ресторан предлагает авторскую кухню, вдохновлённую абхазскими и
              грузинскими кулинарными традициями. Свежие морепродукты, домашние вина,
              ароматные специи — всё это в обрамлении вида на Чёрное море.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Открытая терраса, живая музыка по вечерам и особое меню для детей
              сделают ваш ужин незабываемым.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Завтрак', time: '07:00 — 10:30' },
                { label: 'Обед', time: '12:30 — 15:00' },
                { label: 'Ужин', time: '18:00 — 22:30' },
                { label: 'Бар', time: '10:00 — 00:00' },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-primary pl-4">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">{item.label}</p>
                  <p className="font-serif text-lg text-foreground font-light">{item.time}</p>
                </div>
              ))}
            </div>
            <a
              href="#booking"
              className="inline-block px-10 py-3.5 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
            >
              Забронировать столик
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
