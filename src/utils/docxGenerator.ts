import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export interface GenerateDocxOptions {
  templateUrl: string;
  data: Record<string, string>;
  outputFileName: string;
}

export async function generateDocx({
  templateUrl,
  data,
  outputFileName,
}: GenerateDocxOptions) {
  // Завантажуємо шаблон
  const response = await fetch(templateUrl);
  const arrayBuffer = await response.arrayBuffer();

  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // 🔧 Створюємо змінні для умовних блоків у шаблоні
  function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return Boolean(value);
}

  const processedData = {
    ...data,
    show_photo: !toBoolean(data.delete_photo),
    show_border: !toBoolean(data.delete_border),
  };

  // Підставляємо дані
  doc.setData(processedData);

  try {
    doc.render();
  } catch (error) {
    console.error("Docxtemplater render error", error);
    throw error;
  }

  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  saveAs(out, outputFileName);
}

