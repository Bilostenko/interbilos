import OpenAI from "openai";
console.log("ENV KEY:", process.env.OPENAI_API_KEY);
const openai = new OpenAI();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Ти помічник, який робить структурований стислий переказ офіційних документів українською мовою.
Ти маєш повертати відповідь ТІЛЬКИ у форматі валідного JSON з такими полями:
{
  "date": "...",
  "sender": "...",
  "reference": "...",
  "subject": "...",
  "items": "...",
  "summary": "..."
}

Пояснення:
- "date": дата документа або запиту.
- "sender": лише назва країни.
- "reference": референс справи (що йде після слова Ref).
- "subject": тема запиту.
- "items": Імена або предмети запиту (лише ті особи чи предмети, щодо яких прямо або побічно запитується інформація чи вживаються заходи). Якщо є дата народження, пиши після коми.
- "summary": короткий зміст запиту, а також решта осіб чи організацій, що згадуються у тексті.

Якщо якоїсь інформації немає, пиши "Немає".
НЕ додавай нічого поза JSON.
`.trim(),
        },
        {
          role: "user",
          content: `Зроби стислий переказ цього тексту:\n\n${text}`,
        },
      ],
      temperature: 0.2,
    });

     const summary = JSON.parse(completion.choices[0].message.content);
     res.status(200).json({ summary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to create summary" });
  }
}
