export interface Tour {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  days: string;
  people: number;
  type: string;
  rating: number;
  image: string;
}

export const toursData: Tour[] = [
  {
    id: 1,
    title: "Минск — сердце Беларуси",
    description: "Познакомьтесь с культурой, архитектурой и уютными улочками столицы.",
    location: "Минск, Беларусь",
    price: 100,
    days: "2 дня",
    people: 10,
    type: "Городской тур",
    rating: 4.7,
    image: "/images/mainpage/popularrutes/Minsk.jpg",
  },
  {
    id: 2,
    title: "Мир и Несвиж — замки князей Радзивиллов",
    description: "Откройте тайны белорусских замков, внесённых в список ЮНЕСКО.",
    location: "Мир и Несвиж, Беларусь",
    price: 200,
    days: "3 дня",
    people: 15,
    type: "Исторический маршрут",
    rating: 4.9,
    image: "/images/mainpage/popularrutes/mir.jpg",
  },
  {
    id: 3,
    title: "Беловежская пуща — мир зубров",
    description: "Уникальный заповедник, где природа сохранилась в первозданном виде.",
    location: "Беловежская пуща, Беларусь",
    price: 150,
    days: "2 дня",
    people: 15,
    type: "Природа",
    rating: 4.8,
    image: "/images/mainpage/popularrutes/bel_puscha.jpg",
  },
  {
    id: 4,
    title: "Браславские озёра — жемчужина севера",
    description: "Отдых у живописных озёр и прогулки по Национальному парку.",
    location: "Браслав, Беларусь",
    price: 250,
    days: "5 дней",
    people: 10,
    type: "Экотуризм",
    rating: 4.9,
    image: "/images/mainpage/popularrutes/braslav.jpg",
  },
  {
    id: 5,
    title: "Полоцк — колыбель белорусской государственности",
    description: "Самый древний город страны с богатой историей и атмосферой.",
    location: "Полоцк, Беларусь",
    price: 120,
    days: "2 дня",
    people: 20,
    type: "Исторический тур",
    rating: 4.6,
    image: "/images/mainpage/popularrutes/polotsk.jpg",
  },
  {
    id: 6,
    title: "Витебск — город Марка Шагала",
    description: "Прогулка по старинным улочкам и знакомство с культурной столицей.",
    location: "Витебск, Беларусь",
    price: 100,
    days: "2 дня",
    people: 12,
    type: "Культурный отдых",
    rating: 4.7,
    image: "/images/mainpage/popularrutes/vitebsk.jpg",
  },
];