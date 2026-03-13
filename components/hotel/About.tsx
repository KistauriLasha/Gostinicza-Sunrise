import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-4">
              О нас
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 text-balance">
              Место, где море
              <br />
              <em>встречает покой</em>
            </h2>
            <div className="w-12 h-px bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-5">
              Grand Resort Пицунда расположен на живописном мысе Пицунда — одном из самых
              чистых уголков черноморского побережья. Здесь, среди вековых реликтовых сосен
              и кристально чистой воды, мы создали пространство для истинного отдыха.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Наш отель сочетает современный комфорт с местным колоритом: грузинская
              кухня, бассейн с панорамным видом на море, спа-центр и собственный пляж.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '48', label: 'Номеров' },
                { num: '300м', label: 'До пляжа' },
                { num: '15+', label: 'Лет опыта' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-light text-primary">{stat.num}</p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/images/beach.jpg"
                alt="Пляж Пицунды"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border border-primary/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
