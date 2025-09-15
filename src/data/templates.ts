import type { Template } from "../store/requestProcessingSlice";

export const templates: Template[] = [
  {
    id: "identification",
    name: "Ідентифікація особи",
    content: "identification.docx"
  },
  {
    id: "rejection",
    name: "Відмова через недостатні дані",
    content: "rejection.docx"
  },
  {
    id: "regional",
    name: "Направити на область",
    content: "regional.docx"
  },
  {
    id: "free",
    name: "Довільний текст",
    content: "regional.docx"
  }
];

