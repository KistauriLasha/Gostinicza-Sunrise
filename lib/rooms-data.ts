export interface Room {
  id: string
  title: string
  subtitle: string
  price: string
  size: string
  image: string
  images: string[]
  features: string[]
  description: string
  amenities: string[]
  capacity: number
  bookingUrl?: string
}

export const rooms: Room[] = [
  {
    id: 'deluxe',
    title: 'Двухместный номер "Делюкс"',
    subtitle: 'Уютный номер для двоих',
    bookingUrl: 'https://azur.ru/picunda/o/25451/79852',
    price: '1 500',
    size: '16 м²',
    image: '/images/1B0A1118.jpg',
    images: [
      '/images/1B0A1118.jpg',
      '/images/1B0A1164_resized.jpg',
      '/images/1B0A1150_resized.jpg',
      '/images/1B0A1147_resized.jpg',
      '/images/1B0A1137_resized.jpg',
      '/images/1B0A1140_resized.jpg',
      '/images/1B0A1128_resized.jpg',
    ],
    features: ['Wi-Fi', 'Система кондиционирования', 'Душ'],
    description:
      'Уютный двухместный номер "Делюкс" идеально подходит для комфортного отдыха вдвоём. Номер оснащён всем необходимым для приятного пребывания: удобная двуспальная кровать, современная ванная комната с душем, кондиционер и бесплатный Wi-Fi. Из окна открывается прекрасный вид на территорию гостевого дома.',
    amenities: [
      'Двуспальная кровать',
      'Индивидуальный кондиционер',
      'Бесплатный Wi-Fi',
      'Душевая кабина',
      'Полотенца и туалетные принадлежности',
      'Телевизор',
      'Шкаф для одежды',
    ],
    capacity: 2,
  },
  {
    id: 'deluxe-comfort',
    title: 'Двухместный номер "Делюкс комфорт"',
    subtitle: 'Повышенный комфорт',
    price: '1 500',
    size: '19 м²',
    image: '/images/1B0A1184.jpg',
    images: [
      '/images/1B0A1184.jpg',
      '/images/1B0A1169_resized.jpg',
      '/images/1B0A1175_resized.jpg',
      '/images/1B0A1196_resized.jpg',
      '/images/1B0A1203_resized.jpg',
      '/images/1B0A1204_resized.jpg',
    ],
    features: ['Wi-Fi', 'Система кондиционирования', 'Душ'],
    description:
      'Номер "Делюкс комфорт" предлагает больше пространства и повышенный уровень комфорта. Просторная комната площадью 19 м² с качественной мебелью и продуманным дизайном создаёт атмосферу домашнего уюта. Идеальный выбор для тех, кто ценит комфорт и простор.',
    amenities: [
      'Двуспальная кровать',
      'Индивидуальный кондиционер',
      'Бесплатный Wi-Fi',
      'Душевая кабина',
      'Полотенца и туалетные принадлежности',
      'Телевизор с плоским экраном',
      'Просторный шкаф для одежды',
      'Рабочий стол',
    ],
    capacity: 2,
  },
  {
    id: 'deluxe-king',
    title: 'Двухместный номер "Делюкс king-size"',
    subtitle: 'С большой кроватью',
    bookingUrl: 'https://azur.ru/picunda/o/25451/79854',
    price: '1 500',
    size: '19 м²',
    image: '/images/1B0A1108_resized.jpg',
    images: [
      '/images/1B0A1108_resized.jpg',
      '/images/1B0A1100_resized.jpg',
      '/images/1B0A1093_resized.jpg',
      '/images/1B0A1061_resized.jpg',
      '/images/1B0A1087_resized.jpg',
      '/images/1B0A1072_resized.jpg',
    ],
    features: ['Wi-Fi', 'Система кондиционирования', 'Душ'],
    description:
      'Номер "Делюкс king-size" отличается просторной кроватью размера king-size для максимального комфорта во время сна. Номер оформлен в современном стиле с использованием натуральных материалов и спокойных тонов, создающих расслабляющую атмосферу для полноценного отдыха.',
    amenities: [
      'Кровать размера king-size',
      'Индивидуальный кондиционер',
      'Бесплатный Wi-Fi',
      'Душевая кабина',
      'Премиум полотенца и косметика',
      'Телевизор с плоским экраном',
      'Шкаф для одежды',
      'Прикроватные тумбочки',
    ],
    capacity: 2,
  },
  {
    id: 'junior-suite',
    title: 'Двухместный номер "Полулюкс"',
    subtitle: 'Расширенные удобства',
    bookingUrl: 'https://azur.ru/picunda/o/25451/79889',
    price: '1 500',
    size: '20 м²',
    image: '/images/1B0A1273.jpg',
    images: [
      '/images/1B0A1273.jpg',
      '/images/1B0A1214_resized.jpg',
      '/images/1B0A1230_resized.jpg',
      '/images/1B0A1269_resized.jpg',
      '/images/1B0A1254_resized.jpg',
      '/images/1B0A1266_resized.jpg',
      '/images/1B0A1259_resized.jpg',
      '/images/1B0A1260_resized.jpg',
    ],
    features: ['Wi-Fi', 'Система кондиционирования', 'Душ', 'Чайник', 'Холодильник'],
    description:
      'Номер "Полулюкс" предлагает расширенный набор удобств для комфортного проживания. Помимо стандартного оснащения, в номере есть электрический чайник и холодильник, что позволяет гостям наслаждаться напитками и лёгкими закусками в любое время.',
    amenities: [
      'Двуспальная кровать',
      'Индивидуальный кондиционер',
      'Бесплатный Wi-Fi',
      'Душевая кабина',
      'Электрический чайник',
      'Мини-холодильник',
      'Телевизор с плоским экраном',
      'Шкаф для одежды',
      'Чайный набор',
    ],
    capacity: 2,
  },
  {
    id: 'suite',
    title: 'Улучшенный люкс (двухкомнатный)',
    subtitle: 'Премиум размещение',
    bookingUrl: 'https://azur.ru/picunda/o/25451/79851',
    price: '3 000',
    size: '36 м²',
    image: '/images/1B0A1294.jpg',
    images: [
      '/images/1B0A1294.jpg',
      '/images/1B0A1275-HDR_resized.jpg',
      '/images/1B0A1289-HDR_resized.jpg',
      '/images/1B0A1292_resized.jpg',
      '/images/1B0A1296_resized.jpg',
      '/images/1B0A1303_resized.jpg',
      '/images/1B0A1309_resized.jpg',
      '/images/1B0A1312_resized.jpg',
    ],
    features: [
      'Wi-Fi',
      'Система кондиционирования',
      'Душ',
      'Отдельная гостиная',
      'Чайник',
      'Холодильник',
    ],
    description:
      'Улучшенный люкс — это просторный номер площадью 36 м² с отдельной гостиной зоной, идеально подходящий для семей или компании из трёх человек. Номер включает все удобства премиум-класса: полностью оборудованную мини-кухню, комфортную зону отдыха и современную ванную комнату.',
    amenities: [
      'Двуспальная кровать + дополнительное спальное место',
      'Отдельная гостиная зона',
      'Индивидуальный кондиционер',
      'Бесплатный Wi-Fi',
      'Душевая кабина',
      'Электрический чайник',
      'Холодильник',
      'Телевизор с плоским экраном',
      'Диван',
      'Обеденная зона',
      'Шкаф для одежды',
    ],
    capacity: 3,
  },
]

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id)
}
