import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";



// Головна функція 
export const parseFileToText = async (file: File): Promise<string> => {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    const text = await parsePdf(file);
    // console.log("Parsed text:", text);
    return text;
  }

  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const text = await parseDocx(file);
    return text;
  }

  throw new Error("Unsupported file type");
};

// Парсинг PDF
export const parsePdf = async (file: File): Promise<string> => {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        if ("str" in item && typeof item.str === "string") {
          return item.str;
        }
        return "";
      })
      .join(" ");
    text += pageText + "\n";
  }

  return text;
};





// Парсинг DOCX
const parseDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};
