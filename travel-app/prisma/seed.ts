import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Начинаем заполнение базы данных...');

  await prisma.cancelRequest.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.routeDate.deleteMany();
  await prisma.routePlace.deleteMany();
  await prisma.guideReview.deleteMany();
  await prisma.routeReview.deleteMany();
  await prisma.placeReview.deleteMany();
  await prisma.route.deleteMany();
  await prisma.place.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.tourist.deleteMany();
  await prisma.user.deleteMany();

  console.log('Старые данные очищены');

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('123456', saltRounds);
  const hashedPasswordLong = await bcrypt.hash('12345678', saltRounds);

  const user1 = await prisma.user.create({
    data: { username: 'ana2', password: hashedPassword, role: 'guide' },
  });
  const user2 = await prisma.user.create({
    data: { username: 'ana', password: hashedPassword, role: 'guide' },
  });
  const user3 = await prisma.user.create({
    data: { username: 'lida', password: hashedPassword, role: 'tourist' },
  });
  const user4 = await prisma.user.create({
    data: { username: 'lida2', password: hashedPassword, role: 'tourist' },
  });
  const user5 = await prisma.user.create({
    data: { username: 'nastya', password: hashedPasswordLong, role: 'tourist' },
  });

  console.log('Пользователи созданы');

  await prisma.guide.createMany({
    data: [
      {
        userId: user1.id,
        name: 'Anastasia R.',
        about: 'Опытный гид с 5-летним стажем',
        phone: '+375291234567',
        email: 'guide@mail.ru',
        photo: 'https://img.freepik.com/free-photo/attractive-positive-elegant-young-woman-cafe_23-2148071691.jpg?semt=ais_hybrid&w=740&q=80',
        rating: 4.3,
      },
      {
        userId: user2.id,
        name: 'ana',
        about: 'Молодой гид, специалист по замкам Беларуси',
        phone: '+375297654321',
        email: 'ana.guide@mail.ru',
        photo: 'https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg?semt=ais_hybrid&w=740&q=80',
        rating: 0,
      },
    ],
  });
  console.log('Гиды созданы');

  await prisma.tourist.createMany({
    data: [
      { userId: user3.id, name: 'lida', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2v0C_Fu-81u0iAUgXu-WQrJYG3bd0BWe3Q3F244F7zh5xffzucmC-rq3vzFwmaCmtJA&usqp=CAU' },
      { userId: user4.id, name: 'lida_makeenok', photo: '' },
      { userId: user5.id, name: 'nastya', photo: '' },
    ],
  });
  console.log('Туристы созданы');

  const places = await prisma.place.createManyAndReturn({
    data: [
      { title: 'Мирский замок', address: 'Мир, Красноармейская ул. 2', region: 'Гродненская обл.', shortDescription: 'Уникальный памятник национальной культуры Беларуси, включенный в Список всемирного наследия ЮНЕСКО', description: 'Замок был основан князем Юрием из династии Ильиничей в XVI веке...', tags: ['Историческое'], photos: ['https://minskholidays.by/img/carousel/mirskii-i-nesvijskii-zamki-1.jpg'], rating: 4.5, guideUserId: user1.id },
      { title: 'Дворец Пусловских (Коссовский замок)', address: 'г. Коссово, ул. Т. Костюшко, 108', region: 'Брестская область', shortDescription: 'Уникальный памятник неоготической архитектуры XIX века', description: 'Романтичный дворец с 12 башнями, по числу месяцев...', tags: ['Историческое', 'культурное'], photos: ['https://bestbelarus.by/upload/resize_cache/iblock/f0c/0_510_2a18e1f56f4eaac9195ab4f8530310a0f/d0xltedhhfs40brhbfwdalmtypz9m7o9.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Костёл Святой Троицы', address: 'Гервяты, ул. Набережная 10', region: 'Гродненская', shortDescription: 'Один из самых красивых и высоких храмов нашей страны', description: 'Храм был построен в самом начале ХХ столетия...', tags: ['Религия', 'культура'], photos: ['https://cdn.belarus.travel/Files/News/church-of-the-holy-trinity-in-gervyaty//kostyol-svyatoy-troicy-v-gervyatah-1.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Дворец Булгаков', address: 'п. Жиличи, ул. Мира 5', region: 'Могилевская', shortDescription: 'Дворец в стиле классицизма', description: 'Современные Жиличи – это небольшая деревня...', tags: ['Культура'], photos: ['https://34travel.me/media/upload/images/2023/AUGUST/zhylichy/296A3842%20copy.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Усадьба Козел-Поклевских', address: 'н.п. Красный Берег, ул. Исаева, 14', region: 'Гомельская', shortDescription: 'Фантастическая усадьба', description: 'Имение Красный Берег — фантастическая усадьба Беларуси...', tags: ['Культура'], photos: ['https://www.belarus.by/dadvimages/002529_474564.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Церковь Рождества Богородицы', address: 'д. Мурованка, ул. Церковная 7А', region: 'гродненская', shortDescription: 'Церковь оборонительного типа', description: 'Церковь оборонительного типа, памятник готическо-ренессансной архитектуры...', tags: ['Религия'], photos: ['https://upload.wikimedia.org/wikipedia/commons/5/5f/Murovanka_Church_1.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Дворец-усадьба Умястовских', address: 'аг. Жемыславль', region: 'Гродненская', shortDescription: 'Памятник усадебно-парковой архитектуры', description: 'Дворец выстроен в 1877 году в стиле неоклассицизм...', tags: ['Архитектура'], photos: ['https://34travel.me/media/upload/images/2020/MAY/zhamyslaul/296A8544.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Дворец Рдултовских', address: 'ул. Несвижская 38, Снов', region: 'Минская', shortDescription: 'Крупнейший дворцово-парковый комплекс', description: 'Один из самых масштабных примеров классицизма в Беларуси...', tags: ['Архитектура'], photos: ['https://problr.by/images/putevoditel/minskaya_oblast/snov/dvorets-rdultovskih-2.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Костёл Святой Анны', address: 'д. Мосар, ул. Молодежная, д. 3а', region: 'Витебская', shortDescription: 'Памятник архитектуры в стиле классицизм', description: 'Памятник архитектуры в стиле классицизма, построен в 1792 году...', tags: ['Религия', 'архитектура'], photos: ['https://cdn.belarus.travel/Files/001522_635567.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Усадьба Святополк-Четвертинских', address: 'п. Желудок', region: 'Гродненская', shortDescription: 'Замок с привидениями', description: 'Замок с привидениями, родовое гнездо вампиров-аристократов...', tags: ['Архитектура'], photos: ['https://poshyk.info/wp-content/uploads/2020/08/usadba-zheludok.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Дворец Румянцевых-Паскевичей', address: 'пл. Ленина 4, Гомель', region: 'Гомельская', shortDescription: 'Памятник архитектуры XVIII—XIX веков', description: 'Дворец был построен на месте деревянного замка...', tags: ['Культура', 'история'], photos: ['https://belarustourist.by/upload/resize_cache/iblock/f79/848_502_2/f7985ae8ab4710118baf0bc28012bfac.jpg'], rating: 0, guideUserId: user1.id },
    ],
  });
  console.log('Места созданы');

  const routes = await prisma.route.createManyAndReturn({
    data: [
      { title: 'Усадьбы родовых семей', shortDescription: 'Посетите родовые усадьбы знатных семей Беларуси', description: 'Увлекательное путешествие по родовым имениям знаменитых семей Беларуси...', duration: '3 дня', people: '20', price: '250', type: 'исторический', photos: ['https://www.belarus.by/nimages/002333_884763.jpg'], rating: 0, guideUserId: user1.id },
      { title: 'Замки Беларуси', shortDescription: 'Посетите потрясающие памятники архитектуры', description: 'Отправьтесь в уникальное путешествие по следам великих династий...', duration: '3 дня', people: '15', price: '200', type: 'исторический, культурный', photos: ['https://turistas.me/uploads/touristic_materials/big_webp/8uXXdQIKxEkm0isV2nOj.webp'], rating: 5.0, guideUserId: user1.id },
      { title: 'Дворцы и замки Беларуси', shortDescription: 'Тур по дворцам и замкам Беларуси', description: 'Обзорная экскурсия по самым красивым дворцам и замкам Беларуси...', duration: '4 дня', people: '20', price: '200', type: 'исторический', photos: ['https://34travel.me/media/upload/images/2023/AUGUST/zhylichy/296A3842%20copy.jpg'], rating: 0, guideUserId: user1.id },
    ],
  });
  console.log('Маршруты созданы');

  await prisma.routePlace.createMany({
    data: [
      { routeId: routes[0].id, placeId: places[0].id },
      { routeId: routes[0].id, placeId: places[3].id },
      { routeId: routes[1].id, placeId: places[0].id },
      { routeId: routes[1].id, placeId: places[1].id },
      { routeId: routes[1].id, placeId: places[2].id },
      { routeId: routes[1].id, placeId: places[5].id },
      { routeId: routes[1].id, placeId: places[6].id },
      { routeId: routes[1].id, placeId: places[7].id },
      { routeId: routes[2].id, placeId: places[0].id },
      { routeId: routes[2].id, placeId: places[1].id },
      { routeId: routes[2].id, placeId: places[3].id },
      { routeId: routes[2].id, placeId: places[4].id },
      { routeId: routes[2].id, placeId: places[9].id },
    ],
  });
  console.log('Связи маршрутов с местами созданы');

  await prisma.routeDate.createMany({
    data: [
      { routeId: routes[0].id, date: new Date('2026-06-07') },
      { routeId: routes[0].id, date: new Date('2026-06-08') },
      { routeId: routes[1].id, date: new Date('2026-06-13') },
      { routeId: routes[1].id, date: new Date('2026-06-14') },
      { routeId: routes[1].id, date: new Date('2026-07-08') },
      { routeId: routes[1].id, date: new Date('2026-07-26') },
      { routeId: routes[2].id, date: new Date('2026-07-18') },
      { routeId: routes[2].id, date: new Date('2026-07-20') },
    ],
  });
  console.log('Даты маршрутов созданы');

  await prisma.booking.createMany({
    data: [
      { routeId: routes[1].id, guideUserId: user1.id, touristUserId: user3.id, date: new Date('2026-05-13'), people: 1, fio: 'отдяотд', phone: '+7678745709', email: 'jknzjdf@mail.ru', note: '', status: 'done', createdAt: new Date('2026-04-08T17:39:01.466Z'), confirmedAt: new Date('2026-04-09T10:00:00.000Z'), completedAt: new Date('2026-05-15T14:57:00.095Z') },
      { routeId: routes[1].id, guideUserId: user1.id, touristUserId: user3.id, date: new Date('2026-05-07'), people: 1, fio: 'отдяотд', phone: '+7678745709', email: 'jknzjdf@mail.ru', note: '', status: 'done', createdAt: new Date('2026-04-08T17:39:01.466Z'), confirmedAt: new Date('2026-04-09T10:00:00.000Z'), completedAt: new Date('2026-05-08T17:59:44.178Z') },
      { routeId: routes[1].id, guideUserId: user1.id, touristUserId: user3.id, date: new Date('2026-06-26'), people: 1, fio: 'Рыбакова А.В.', phone: '+375291234567', email: 'hng@xdhbgf.ru', note: '', status: 'confirmed', createdAt: new Date('2026-05-22T12:03:01.634Z'), confirmedAt: new Date('2026-05-22T12:04:50.704Z') },
      { routeId: routes[0].id, guideUserId: user1.id, touristUserId: user3.id, date: new Date('2026-07-15'), people: 2, fio: 'Иванов И.И.', phone: '+375331234567', email: 'ivanov@mail.ru', note: 'Жду с нетерпением!', status: 'pending', createdAt: new Date('2026-06-25T10:30:00.000Z') },
      { routeId: routes[1].id, guideUserId: user1.id, touristUserId: user5.id, date: new Date('2026-06-10'), people: 2, fio: 'nastya', phone: '+375291234568', email: 'nastya@mail.ru', note: '', status: 'confirmed', createdAt: new Date('2026-05-30T11:20:00.000Z') },
      { routeId: routes[0].id, guideUserId: user1.id, touristUserId: user4.id, date: new Date('2026-06-05'), people: 1, fio: 'lida2', phone: '+375291234569', email: 'lida2@mail.ru', note: '', status: 'pending', createdAt: new Date('2026-05-29T09:15:00.000Z') },
    ],
  });
  console.log('Бронирования созданы');

  await prisma.placeReview.createMany({
    data: [
      { placeId: places[0].id, userId: user3.id, username: 'lida', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2v0C_Fu-81u0iAUgXu-WQrJYG3bd0BWe3Q3F244F7zh5xffzucmC-rq3vzFwmaCmtJA&usqp=CAU', rating: 5, text: 'мне все нравиться', createdAt: new Date('2025-12-15T16:09:42.939Z') },
      { placeId: places[0].id, userId: user3.id, username: 'lida', rating: 4, text: 'класс', createdAt: new Date('2025-12-18T06:37:44.947Z') },
    ],
  });
  console.log('Отзывы о местах созданы');

  await prisma.routeReview.createMany({
    data: [
      { routeId: routes[1].id, userId: user3.id, username: 'lida', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2v0C_Fu-81u0iAUgXu-WQrJYG3bd0BWe3Q3F244F7zh5xffzucmC-rq3vzFwmaCmtJA&usqp=CAU', rating: 5, text: 'класс очень понравилось', createdAt: new Date('2025-12-20T07:11:48.763Z') },
      { routeId: routes[1].id, userId: user3.id, username: 'lida', rating: 5, text: 'супер', createdAt: new Date('2025-12-15T16:09:42.939Z') },
    ],
  });
  console.log('Отзывы о маршрутах созданы');

  await prisma.guideReview.createMany({
    data: [
      { guideUserId: user1.id, userId: user3.id, username: 'lida', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2v0C_Fu-81u0iAUgXu-WQrJYG3bd0BWe3Q3F244F7zh5xffzucmC-rq3vzFwmaCmtJA&usqp=CAU', rating: 5, text: 'гид очень понравился', createdAt: new Date('2025-12-15T16:09:42.939Z') },
      { guideUserId: user1.id, userId: user3.id, username: 'lida', rating: 4, text: 'гид понравился', createdAt: new Date('2025-12-15T16:35:43.749Z') },
    ],
  });
  console.log('Отзывы о гидах созданы');

  const allPlaces = await prisma.place.findMany({ include: { reviews: true } });
  for (const place of allPlaces) {
    const avgRating = place.reviews.length > 0
      ? place.reviews.reduce((sum, r) => sum + Number(r.rating), 0) / place.reviews.length
      : 0;
    await prisma.place.update({ where: { id: place.id }, data: { rating: avgRating } });
  }

  const allRoutes = await prisma.route.findMany({ include: { reviews: true } });
  for (const route of allRoutes) {
    const avgRating = route.reviews.length > 0
      ? route.reviews.reduce((sum, r) => sum + Number(r.rating), 0) / route.reviews.length
      : route.rating;
    await prisma.route.update({ where: { id: route.id }, data: { rating: avgRating } });
  }

  const allGuides = await prisma.guide.findMany({ include: { reviews: true } });
  for (const guide of allGuides) {
    const avgRating = guide.reviews.length > 0
      ? guide.reviews.reduce((sum, r) => sum + Number(r.rating), 0) / guide.reviews.length
      : guide.rating;
    await prisma.guide.update({ where: { userId: guide.userId }, data: { rating: avgRating } });
  }

  console.log('Рейтинги обновлены');
  console.log('База данных успешно заполнена!');
}

main()
  .catch((e) => {
    console.error('Ошибка при заполнении базы:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });