import React from 'react';

export interface AnalysisResult {
  date: string;
  sender: string;
  reference: string;
  subject: string;
  items: string;
  summary: string;
  checks: string[];
}
interface AIAnalysisProps {
  analysisData: AnalysisResult | undefined;
  isLoading?: boolean;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ 
  analysisData, 
  isLoading = false 
}) => {
  return (
    <div className="px-4 py-3">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        2. Відображення короткого змісту твого запиту
      </h3>
      <div className="min-h-[100px] p-4 rounded-xl border border-[#d4dbe2] bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#101418]"></div>
            <span className="ml-2 text-[#5c728a]">Я думаю...</span>
          </div>
        ) : analysisData ? (
         <div className="text-[#101418] text-base font-normal leading-normal">
    <div className="p-4 space-y-3">
      <p>✅ <strong>Дата:</strong> {analysisData.date}</p>
      <p>✅ <strong>Відправник:</strong> {analysisData.sender}</p>
      <p>✅ <strong>Референс справи:</strong> {analysisData.reference}</p>
      <p>✅ <strong>Тема:</strong> {analysisData.subject}</p>
      <p>✅ <strong>Імена/Предмет запиту:</strong> {analysisData.items}</p>
      <p>✅ <strong>Короткий зміст:</strong> {analysisData.summary}</p>

      {analysisData.checks && analysisData.checks.length > 0 && (
        <div>
          <p>✅ <strong>Що потрібно перевірити:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            {analysisData.checks.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
        ) : (
          <p className="text-[#5c728a] text-base font-normal leading-normal">
            Короткий зміст буде виведено тут після завантаження документа.
          </p>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;