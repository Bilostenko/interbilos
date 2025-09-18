import type { Template } from "../store/requestProcessingSlice";

export const templates: Template[] = [
  {
    id: "identification",
    name: "Ідентифікація особи",
    content: "identification.docx"
  },
  {
    id: "rejection",
    name: "Відмова через недостатні дані особи",
    content: "rejection.docx"
  },
  {
    id: "regional",
    name: "Направити на область",
    content: "regional.docx"
  },
  {
    id: "free",
    name: "Довільний текст",
    content: "regional.docx"
  }
];

export const templatesRegional: readonly Template[] = [
  { id: 'vinnytsia', name: 'у Вінницькій області' },
  { id: 'volyn', name: 'у Волинській області' },
  { id: 'dnipro', name: 'у Дніпропетровській області' },
  { id: 'donetsk', name: 'у Донецькій області' },
  { id: 'zhytomyr', name: 'у Житомирській області' },
  { id: 'zakarpattia', name: 'у Закарпатській області' },
  { id: 'zaporizhzhia', name: 'у Запорізькій області' },
  { id: 'ivano-frankivsk', name: 'в Івано-Франківській області' },
  { id: 'kyivska', name: 'у Київській області' },
  { id: 'kyiv', name: 'в місті Києві' },
  { id: 'kirovohrad', name: 'у Кіровоградській області' },
  { id: 'luhansk', name: 'у Луганській області' },
  { id: 'lviv', name: 'у Львівській області' },
  { id: 'mykolaiv', name: 'у Миколаївській області' },
  { id: 'odesa', name: 'в Одеській області' },
  { id: 'poltava', name: 'у Полтавській області' },
  { id: 'rivne', name: 'у Рівненській області' },
  { id: 'sumy', name: 'у Сумській області' },
  { id: 'ternopil', name: 'у Тернопільській області' },
  { id: 'kharkiv', name: 'у Харківській області' },
  { id: 'kherson', name: 'у Херсонській області' },
  { id: 'khmelnytskyi', name: 'у Хмельницькій області' },
  { id: 'cherkasy', name: 'у Черкаській області' },
  { id: 'chernivtsi', name: 'у Чернівецькій області' },
  { id: 'chernihiv', name: 'у Чернігівській області' }
] ;

