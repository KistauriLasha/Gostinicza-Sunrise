'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Инициализация карты
    map.current = L.map(mapContainer.current, {
      center: [43.153, 40.341],
      zoom: 16,
      scrollWheelZoom: true,
    })

    // Добавление слоя OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current)

    // Добавление маркера с информацией о гостинице
    const marker = L.marker([43.153, 40.341], {
      icon: L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNFNzE0MjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOSAtNiAtOSAtMTNhOSA5IDAgMCAxIDE4IDB6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyIvPjwvc3ZnPg==',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      }),
    }).addTo(map.current)

    marker.bindPopup(
      '<div style="text-align: center; font-family: sans-serif;">' +
        '<p style="margin: 0; font-weight: bold; font-size: 14px;">Guest House Sunrise</p>' +
        '<p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Пицунда, ул. Агрба 20/2</p>' +
        '<p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">+7 (940) 920-43-73</p>' +
        '</div>'
    )

    // Открыть попап при загрузке
    setTimeout(() => {
      marker.openPopup()
    }, 500)

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}
