import React, { useState } from 'react';

interface Template {
  id: string;
  name: string;
  content: string;
}

interface TemplateSelectionProps {
  templates?: Template[];
  onTemplateSelect?: (template: Template | null) => void;
}

const defaultTemplates: Template[] = [
  {
    id: 'identification',
    name: 'Identification Response Template',
    content: 'This is an identification response template.'
  },
  // {
  //   id: 'urgent',
  //   name: 'Urgent Response Template',
  //   content: 'This is an urgent response template for time-sensitive requests.'
  // },
  // {
  //   id: 'investigation',
  //   name: 'Investigation Response Template',
  //   content: 'This template is used for ongoing investigation requests.'
  // }
];

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  templates = defaultTemplates,
  onTemplateSelect
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    
    const template = templates.find(t => t.id === templateId) || null;
    onTemplateSelect?.(template);
  };

  return (
    <div className="px-4 py-3">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        4. Template Selection
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            value={selectedTemplate}
            onChange={handleChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] h-14 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal"
            style={{
              // backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(92,114,138)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            <option value="">Select a response template</option>
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