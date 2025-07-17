import OpenAI from "openai";
const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { summary, verificationData } = req.body;

  try {
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
  * ПОЛЬЩА → WARSA

2️⃣ "reference": номер запиту (залишай без змін).

3️⃣ "date": витягни дату з рядка виду "Date: ..." у форматі ДД/ММ/РРРР. Якщо такого рядка немає — поверни "UNKNOWN".

4️⃣ "name":  
- Формат: Прізвище великими літерами f/n Імʼя s/o По-батькові.
- Джерело: manualData → summary

5️⃣ "date_of_birth", "residence_address", "passport", "criminal_records", "additional_info":
- Спочатку бери з manualData, якщо немає — з summary. Якщо немає — "Немає".

6️⃣ "delete_photo":
- Якщо manualData.photo === false → true
- Якщо manualData.photo === true → false

7️⃣ "delete_border":
- Якщо manualData.border === false → true
- Якщо manualData.border === true → false

📌 У Word-документі:
- Якщо "delete_photo": true → треба повністю видалити рядок: PHOTO: in attachment
- Якщо "delete_border": true → треба повністю видалити рядок: BORDER RECORD: in attachment with the legend for translation
- Якщо значення false — залишити ці рядки як є

НЕ додавай нічого поза JSON.

Дані для обробки:

{
  "summary": ${JSON.stringify(summary, null, 2)},
  "manualData": ${JSON.stringify(verificationData, null, 2)}
}
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
    });

    const jsonResponse = completion.choices[0].message.content;
    res.status(200).json({ response: JSON.parse(jsonResponse) });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
