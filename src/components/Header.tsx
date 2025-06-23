import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#eaedf1] px-10 py-3">
      <div className="flex items-center gap-4 text-[#101418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em]">
          Global Police Network
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbplJZKd71GM00IESDmi3j1Xic5JP9UtgzMjJVTWXqd2fbAS6jpA1nc4CAyZpHzssg-BBIOPdhe0UZEovwesqhdMFr0JnPNjGfnPidbecekmHZ41zc7l5-y3sJkFrK-QnH4cUXx8dPADfApIX3Yqs0P7D1Gt34RJ9FABr1VJpXrPirPsl9FHTK49K7bF-UOOwZvFDsL4yctI5LfabNfrZo0YCVeqj7O128vklDspRxAM8E7AA1qnfhQXgahoDiNkqUu00TGIuy")`
          }}
        />
      </div>
    </header>
  );
};

export default Header;