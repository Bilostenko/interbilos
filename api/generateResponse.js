const prompt = `
Ти помічник, який на основі короткого переказу запиту (summary) і додаткових даних (manualData) створює фінальний JSON для Word-документа відповіді.

Ти маєш повернути ВИКЛЮЧНО валідний JSON без коментарів.

JSON має містити ключі:
{
  "sender": "...",
  "reference": "...",
  "date": "...",
  "name": "...",
  "date_of_birth": "...",
  "residence_address": "...",
  "passport": "...",
  "criminal_records": "...",
  "additional_info": "...",
  "delete_photo": true/false,
  "delete_border": true/false
}

Пояснення:

1️⃣ "sender": Назва Центрального бюро Інтерполу. Як правило — це назва столиці країни, з якої прийшов запит.
- Якщо в назві є слово INTERPOL (наприклад, "INTERPOL BUDAPEST") — його треба видалити.
- Формат: TO: IP [місто великими літерами], наприклад: TO: IP BUDAPEST

Переклади країну на назву Центрального бюро Інтерполу:
  * УГОРЩИНА → BUDAPEST
  * НІМЕЧЧИНА → WIESBADEN
  * ІТАЛІЯ → ROME
  * ФРАНЦІЯ → PARIS
  * ІСПАНІЯ → MADRID
  * ПОЛЬЩА → WARSAW

2️⃣ "reference": номер запиту (залишай без змін).

3️⃣ "date": витягни дату з рядка виду "Date: ..." у форматі ДД/ММ/РРРР. Якщо такого рядка немає — поверни "UNKNOWN".

4️⃣ "name":  
- Формат: Прізвище великими літерами f/n Імʼя s/o По-батькові.
- Джерело: manualData → summary

5️⃣ "date_of_birth", "residence_address", "passport", "criminal_records", "additional_info":
- Спочатку бери з manualData, якщо немає — з summary. Якщо немає — "Немає".

6️⃣ "delete_photo":
- Якщо в manualData поле "photo" має значення false (тобто чекбокс не був вибраний), тоді значення delete_photo повинно бути true — це означає, що в Word-документі потрібно повністю видалити рядок з текстом "PHOTO: in attachment"
- Якщо значення manualData.photo === true — тоді delete_photo = false, і рядок у Word-документі залишаємо

7️⃣ "delete_border":
- Якщо в manualData поле "border" має значення false (тобто чекбокс не був вибраний), тоді значення delete_border повинно бути true — це означає, що в Word-документі потрібно повністю видалити рядок з текстом "BORDER RECORD: in attachment with the legend for translation"
- Якщо значення manualData.border === true — тоді delete_border = false, і рядок у Word-документі залишаємо

📌 У Word-документі:
- Якщо "delete_photo": true → треба повністю видалити рядок: PHOTO: in attachment
- Якщо "delete_border": true → треба повністю видалити рядок: BORDER RECORD: in attachment with the legend for translation
- Якщо значення false — залишити ці рядки як є

📌 Якщо в summary згадується, що потрібно перевірити або підтвердити якусь інформацію (навіть якщо це подано у вигляді готового списку англійською мовою), ти обов’язково маєш:

1. Перекласти усі ці питання або пункти на українську мову.
2. Записати їх як окремий блок у полі "additional_info".
3. Почати цей блок словами: "Що потрібно перевірити:"
4. Кожен пункт має бути з нового рядка і починатись з тире.

❗️Навіть якщо в summary вже є список типу:
- Is he known to your law enforcement authorities?
- Did he apply for a passport?
Ти все одно повинен перекласти їх українською.

📌 Перед цим блоком можеш додати текст типу: "жодної додаткової інформації не надано", якщо відповідних уточнень у manualData нема.

НЕ додавай нічого поза JSON.

Дані для обробки:

{
  "summary": ${JSON.stringify(summary, null, 2)},
  "manualData": ${JSON.stringify(verificationData, null, 2)}
}
`.trim();
