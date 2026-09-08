//

export default function Logo({ withWordmark = true, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jt-logo-grad" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="55%" stopColor="#B84FE0" />
            <stop offset="100%" stopColor="#EC4FCB" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="28" height="28" rx="8" stroke="url(#jt-logo-grad)" strokeWidth="1.4" fill="rgba(139,92,246,0.06)" />
        <path
          d="M9 8.5H15.5C17.9853 8.5 20 10.5147 20 13V13C20 15.4853 17.9853 17.5 15.5 17.5H11"
          stroke="url(#jt-logo-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M11 17.5V21.5" stroke="url(#jt-logo-grad)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21.5" cy="21.5" r="1.6" fill="#EC4FCB" />
      </svg>
      {withWordmark && (
        <span className="font-display font-medium text-[15px] tracking-tight text-ink-100">
          Jayanth<span className="text-ink-400 font-normal"> Technologies</span>
        </span>
      )}
    </div>
  );
}
