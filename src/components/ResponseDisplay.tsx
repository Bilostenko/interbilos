import React from 'react';

interface ResponseDisplayProps {
  onDownload?: () => void;
  isGenerating?: boolean;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  onDownload,
  isGenerating = false
}) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

return (
  <div className="px-4 py-3">
    <div className="flex items-center gap-2">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em]">
        5.
      </h3>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
          !isGenerating
            ? 'bg-[#dce7f3] text-[#101418] hover:bg-[#c8daf0]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span className="truncate">СКАЧАТИ ВІДПОВІДЬ</span>
      </button>
    </div>
  </div>
);
};

export default ResponseDisplay;
