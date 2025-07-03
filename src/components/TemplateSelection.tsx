import React, { useState } from 'react';
import { templates } from "../data/templates"; // твій правильний список

interface Template {
  id: string;
  name: string;
  content: string;
}

interface TemplateSelectionProps {
  onTemplateSelect?: (template: Template | null) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  onTemplateSelect
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    const template = templates.find(t => t.id === templateId) || null;
    onTemplateSelect?.(template);
  };

  return (
    <div className="px-4 py-3">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        4. Вибір шаблону
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            value={selectedTemplate}
            onChange={handleChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            <option value="" className="font-bold">
              Обери шаблон відповіді
            </option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default TemplateSelection;
