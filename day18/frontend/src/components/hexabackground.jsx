export default function HexaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0b0d12]" />

      {/* Hexagon grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex"
            width="60"
            height="52"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* Soft blue light sweep */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(99,102,241,0.18),transparent)] animate-scan blur-xl" />

      {/* Inner soft core (diffused, no sharp line) */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(160,170,255,0.25),transparent)] animate-scan-fast blur-2xl" />

      {/* Golden premium shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,215,150,0.12),transparent)] animate-gold blur-xl" />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#0b0d12_85%)]" />

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes scanFast {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes gold {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }

        .animate-scan {
          animation: scan 12s linear infinite;
        }

        .animate-scan-fast {
          animation: scanFast 8s linear infinite;
        }

        .animate-gold {
          animation: gold 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
