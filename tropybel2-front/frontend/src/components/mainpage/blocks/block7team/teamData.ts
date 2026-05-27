export interface TeamMember {
  id: number;
  name: string;
  category: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Иван Петров", category: "Экскурсионный гид", image: "/images/mainpage/guides/ivan.jpg" },
  { id: 2, name: "Анна Сидорова", category: "Природный гид", image: "/images/mainpage/guides/anna.jpg" },
  { id: 3, name: "Алексей Кузнецов", category: "Исторический гид", image: "/images/mainpage/guides/alexey.jpg" },
  { id: 4, name: "Мария Лукина", category: "Культурный гид", image: "/images/mainpage/guides/maria.jpg" },
];