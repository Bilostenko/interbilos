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

  // Підставляємо дані
  doc.setData(data);

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
