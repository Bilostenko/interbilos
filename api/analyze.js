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
Твоя відповідь повинна містити ТІЛЬКИ наступні поля (ніякого додаткового тексту):
- Тема
- Відправник (лише назва країни)
- Дата
- Короткий зміст суті запиту
- Референс справи (якщо є, що йде після слова Ref)
- Імена осіб, документів або предмет запиту (вкажи всі, що згадуються)

Формат відповіді суворо такий:

Дата: ...
Відправник: ...
Референс справи: ...
Тема: ...
Імена/Предмет запиту: ...
Короткий зміст: ...

Якщо якоїсь інформації немає в тексті, пиши "Немає".

Важливо: НЕ додавати жодних пояснень чи коментарів, тільки ці пункти.
        `.trim()
      },
      {
        role: "user",
        content: `Зроби стислий переказ цього тексту:\n\n${text}`
      }
    ],
    temperature: 0.2
  });


    const summary = completion.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to create summary" });
  }
}