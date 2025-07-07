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
  "additional_info": "..."
}

Пояснення:

1️⃣ "sender":
- Переклади країну на назву Центрального бюро Інтерполу:
  - УГОРЩИНА → BUDAPEST
  - НІМЕЧЧИНА → WIESBADEN
  - ІТАЛІЯ → ROME
  - ФРАНЦІЯ → PARIS
  - ІСПАНІЯ → MADRID
  - ПОЛЬЩА → WARSAW
  - якщо країна інша, пиши її англійською великими літерами.

2️⃣ "reference":
- Завжди зберігай номер запиту.

3️⃣ "date":
- Якщо дата відсутня, пиши "Немає".

4️⃣ "name":
- Формат:
  Прізвище великими літерами f/n Імʼя s/o По-батькові.
  Наприклад:
  BILOSTENKO f/n Dmytro s/o Yevhen
- Використовуй дані з manualData (якщо є). Якщо немає — з summary.

5️⃣ "date_of_birth":
- Спочатку пробуй з manualData.
- Якщо немає — із summary.
- Якщо ніде немає — "Немає".

6️⃣ "residence_address":
- Спочатку manualData.
- Потім summary.
- Якщо немає — "Немає".

7️⃣ "passport":
- Спочатку manualData.
- Якщо немає — summary.
- Якщо немає — "Немає".

8️⃣ "criminal_records":
- Спочатку manualData.
- Якщо немає — summary.
- Якщо немає — "Немає".

9️⃣ "additional_info":
- Спочатку manualData.
- Якщо немає — summary.
- Якщо немає — "Немає".

ВАЖЛИВО:
- Не додавай нічого поза JSON.

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
