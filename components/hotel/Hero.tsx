import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/1B0A1027_resized.jpg"
        alt="Интерьер обеденной зоны и кухни гостевого дома"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center animate-ken-burns"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-8 animate-fade-in-up [animation-delay:200ms]">
          Абхазия · Пицунда · Чёрное море
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.9] tracking-tighter text-balance mb-10 animate-fade-in-up [animation-delay:400ms]">
          Ваш идеальный <br />
          <span className="italic">отдых у моря</span>
        </h1>
        <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-xl mx-auto mb-12 font-light animate-fade-in-up [animation-delay:600ms]">
          Добро пожаловать в гостевой дом Sunrise — место, где время замедляется.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up [animation-delay:800ms]">
          <a
            href="https://azur.ru/picunda/o/25451"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent transition-colors duration-300"
          >
            Забронировать в azur
          </a>
          <a
            href="#rooms"
            className="px-10 py-4 border border-white/60 text-white text-sm tracking-[0.2em] uppercase font-light hover:bg-white/10 transition-colors duration-300"
          >
            Смотреть номера
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={28} aria-hidden="true" />
      </a>
    </section>
  )
}
