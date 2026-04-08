'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Номера', href: '/#rooms-booking' },
  { label: 'Галерея', href: '/#gallery' },
  { label: 'Контакты', href: '/#contacts' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      id="top"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#top" className="flex flex-col leading-none" aria-label="На главную">
          <span
            className={`font-serif text-2xl font-medium tracking-wider transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            SUNRISE
          </span>
          <span
            className={`text-xs tracking-[0.25em] uppercase transition-colors ${
              scrolled ? 'text-muted-foreground' : 'text-white/70'
            }`}
          >
            Гостевой дом
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-accent ${
                scrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://travel.yandex.ru/hotels/pitsunda/guest-house-sunrise-pitsunda/"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-4 px-6 py-2 border text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary ${
              scrolled ? 'border-primary text-primary' : 'border-white/70 text-white'
            }`}
          >
            Забронировать
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
          aria-label="Меню"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://travel.yandex.ru/hotels/pitsunda/guest-house-sunrise-pitsunda/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 px-6 py-3 bg-primary text-primary-foreground text-center text-sm tracking-widest uppercase"
          >
            Забронировать
          </a>
        </div>
      )}
    </header>
  )
}
