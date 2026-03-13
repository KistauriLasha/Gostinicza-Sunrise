import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Гостиница Пицунда Grand Resort — вид на море"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-6">
          Абхазия · Пицунда · Чёрное море
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-none tracking-wide text-balance mb-8">
          Добро пожаловать в гостиницу Sunrise
        </h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
          Лучший отдых на побережье
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#booking"
            className="px-10 py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:bg-accent transition-colors duration-300"
          >
            Забронировать номер
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
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
