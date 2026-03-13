'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Номера', href: '#rooms' },
  { label: 'Услуги', href: '#services' },
  { label: 'Ресторан', href: '#restaurant' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Контакты', href: '#contacts' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span
            className={`font-serif text-2xl font-medium tracking-wider transition-colors ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}
          >
            ПИЦУНДА
          </span>
          <span
            className={`text-xs tracking-[0.25em] uppercase transition-colors ${
              scrolled ? 'text-muted-foreground' : 'text-white/70'
            }`}
          >
            Grand Resort
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-accent ${
                scrolled ? 'text-foreground' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-4 px-6 py-2 border text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary border-white/70 text-white"
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
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
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
