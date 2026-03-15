import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            Свяжитесь с нами
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
            Контакты
          </h2>
          <div className="w-12 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-2xl mx-auto">
          {[
            {
              icon: <MapPin size={24} />,
              title: 'Адрес',
              lines: ['Абхазия, Пицунда', 'ул Агрба 20/2'],
            },
            {
              icon: <Phone size={24} />,
              title: 'Телефон',
              lines: ['+7 (940) 920-43-73'],
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="text-primary mt-1 shrink-0">{item.icon}</div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {item.title}
                </p>
                {item.lines.map((line) => (
                  <p key={line} className="text-foreground font-light">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="w-full h-72 bg-secondary flex items-center justify-center border border-border overflow-hidden">
          <iframe
            title="Пицунда на Яндекс Картах"
            src="https://yandex.ru/map-widget/v1/?text=Пицунда%2C%20ул%20Агрба%2020%2F2&z=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
