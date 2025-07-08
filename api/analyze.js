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
  "summary": "...",
  "checks": [
    "...",
    "..."
  ]
}

Пояснення:
- "date":  Знайди рядок, що починається зі слова "Date:" і витягни дату після двокрапки у форматі ДД/ММ/РРРР.
  Якщо такого рядка немає, поверни "UNKNOWN".
 Спочатку знайди рядок, що починається зі слів "NCB" або "INTERPOL" і містить назву міста (наприклад, "INTERPOL BUDAPEST"). Якщо такий рядок є, витягни назву міста великими літерами (наприклад, "BUDAPEST").
  Якщо такого рядка немає, але у тексті є назва країни, перетвори назву країни на назву її столиці англійською великими літерами.
  Наприклад:
    Hungary → BUDAPEST
    Germany → BERLIN
    France → PARIS
  Якщо країна інша, напиши назву її столиці англійською великими літерами.
  Якщо нічого не знайдено, поверни "UNKNOWN".
- "reference": референс справи (що йде після слова Ref).
- "subject": тема запиту.
- "items": Імена або предмети запиту (лише ті особи чи предмети, щодо яких прямо або побічно запитується інформація чи вживаються заходи).
  ВАЖЛИВО: якщо є дата народження, вона має стояти безпосередньо після імені та прізвища, через кому. Наприклад: "Сергій Узун, 14.04.1978". Лише потім (якщо потрібно) інші дані (громадянство тощо).
- "summary": короткий опис змісту документа (контекст, хто кого згадує, що сталося).
- "checks": чітко по пунктах, що запитують перевірити або надати.

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
