import React from 'react';

interface ResponseDisplayProps {
  response?: string;
  onDownload?: () => void;
  isGenerating?: boolean;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  onDownload,
  isGenerating = false
}) => {
  const handleDownload = () => {
    if (response && onDownload) {
      onDownload();
    }
  };

  return (
    <div className="px-4 py-3">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        5. Response Display
      </h3>
      
      <div className="min-h-[200px] p-4 rounded-xl border border-[#d4dbe2] bg-gray-50 mb-4">
        {isGenerating ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#101418]"></div>
            <span className="ml-2 text-[#5c728a]">Generating response...</span>
          </div>
        ) : response ? (
          <div className="text-[#101418] text-base font-normal leading-normal whitespace-pre-wrap">
            {response}
          </div>
        ) : (
          <p className="text-[#5c728a] text-base font-normal leading-normal">
            Response will be displayed here after template selection.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          disabled={!response || isGenerating}
          className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
            response && !isGenerating
              ? 'bg-[#dce7f3] text-[#101418] hover:bg-[#c8daf0]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span className="truncate">Download Response</span>
        </button>
      </div>
    </div>
  );
};

export default ResponseDisplay; 