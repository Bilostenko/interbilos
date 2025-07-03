import OpenAI from "openai";
const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { summary, manualData, templateName } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Ти помічник, який на основі короткого переказу запиту і додаткових даних створює фінальний JSON для заповнення Word-документа відповіді.

Ти маєш повернути ВИКЛЮЧНО валідний JSON без додаткових коментарів, текстів або пояснень.

JSON обов'язково має містити такі ключі (тут наведені точні назви, які мають збігатися з тегами в документі):

{
  "sender": "...",
  "reference": "...",
  "date": "...",
  "name": "...",
  "date_of_birth": "...",
  "residence_address": "...",
  "passport": "...",
  "criminal_records": "...",
  "additional_info": "..."
}

Пояснення для заповнення:
- "sender": країна або організація, що надіслала запит.
- "reference": референсний номер запиту.
- "date": дата запиту.
- "name": ПІБ особи, щодо якої проводиться перевірка.
- "date_of_birth": дата народження.
- "residence_address": адреса проживання, якщо є.
- "passpsort": номер або дані паспорта.
- "criminal_records": інформація про судимість (якщо немає – пиши "Немає").
- "additional_info": додаткова інформація або телефон.

ВАЖЛИВО:
- Якщо даних немає, обов'язково писати "Немає".
- Не додавай нічого, окрім JSON.
- Якщо деякі дані частково надані, заповни їх максимально повно.
`.trim(),
        },
      ],
      temperature: 0,
    });

    const responseData = JSON.parse(completion.choices[0].message.content);
    res.status(200).json({ responseData });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
