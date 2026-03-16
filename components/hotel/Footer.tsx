import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const footerLinks = [
  { label: 'Номера', href: '/#rooms' },
  { label: 'Галерея', href: '/#gallery' },
  { label: 'Контакты', href: '/#contacts' },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl font-medium tracking-wider mb-1">SUNRISE</p>
            <p className="text-xs tracking-[0.25em] uppercase text-primary-foreground/50 mb-4">
              Гостевой дом
            </p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Лучший курортный гостевой дом на черноморском побережье Абхазии.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-widest uppercase text-primary-foreground/50 mb-5">
              Навигация
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs tracking-widest uppercase text-primary-foreground/50 mb-5">
              Контакты
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-start text-sm text-primary-foreground/70">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                Абхазия, Пицунда, ул Агрба 20/2
              </li>
              <li className="flex gap-3 items-center text-sm text-primary-foreground/70">
                <Phone size={14} className="shrink-0 text-accent" />
                +7 (940) 920-43-73
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex items-center justify-center">
          <p className="text-xs text-primary-foreground/40">
            L.K.
          </p>
        </div>
      </div>
    </footer>
  )
}
