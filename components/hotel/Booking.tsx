'use client'

import { useState } from 'react'

export default function Booking() {
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    room: 'standard',
    name: '',
    phone: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className="py-24 bg-primary">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-primary-foreground/70 mb-3">
            Бронирование
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-primary-foreground text-balance">
            Запланируйте отдых
          </h2>
          <div className="w-12 h-px bg-primary-foreground/40 mx-auto mt-6" />
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <p className="font-serif text-3xl text-primary-foreground font-light mb-4">
              Спасибо за заявку!
            </p>
            <p className="text-primary-foreground/70">
              Мы свяжемся с вами в течение нескольких часов для подтверждения бронирования.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-background p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Dates */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Дата заезда
                </label>
                <input
                  type="date"
                  required
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Дата выезда
                </label>
                <input
                  type="date"
                  required
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              {/* Guests + Room type */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Взрослых
                </label>
                <select
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {['1', '2', '3', '4'].map((n) => (
                    <option key={n} value={n}>{n} {n === '1' ? 'взрослый' : 'взрослых'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Тип номера
                </label>
                <select
                  value={form.room}
                  onChange={(e) => setForm({ ...form, room: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="deluxe">Делюкс</option>
                  <option value="deluxe-king">Делюкс king-size</option>
                  <option value="junior-suite">Полулюкс</option>
                  <option value="suite">Люкс</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (000) 000-00-00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="mail@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-16 py-4 bg-primary text-primary-foreground text-sm tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
