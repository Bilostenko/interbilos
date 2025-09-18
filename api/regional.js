import OpenAI from "openai";
const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { summary, manualData } = req.body;

  try {
    const prompt = `
Ти помічник, який на основі короткого переказу запиту (summary) створює фінальний JSON для Word-документа "Направити на область".

Ти маєш повернути ВИКЛЮЧНО валідний JSON без коментарів.

JSON має містити ключі:
{
  "sender": "...",
  "fact_of_case": "...",
  "attachment_count": 0 | 1 | 2 | 3
}

Пояснення:

1️⃣ "sender": 
- Вказуємо країну, від імені якої прийшов запит (не місто).
- Має бути у формі родового відмінка українською мовою.
  Наприклад: "від НЦБ Інтерполу в Болгарії", "в Німеччині", "в Італії".

2️⃣ "fact_of_case": 
- Стисло і зрозуміло вкажи фабулу справи: про що йде мова (наприклад: "щодо осіб, причетних до підробки документів").
- Пиши українською мовою.

3️⃣ "attachment_count": 
- Бери значення з manualData. Якщо його там немає — став 0.

⚠️ Не додавай нічого поза JSON.

Дані для обробки:

{
  "summary": ${JSON.stringify(summary, null, 2)},
  "manualData": ${JSON.stringify(manualData, null, 2)}
}
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const jsonResponse = completion.choices[0].message.content;
    res.status(200).json({ response: JSON.parse(jsonResponse) });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
