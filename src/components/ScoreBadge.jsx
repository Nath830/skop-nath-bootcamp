export default function ScoreBadge({ score, max = 100, size = 'md' }) {
  const sizes = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-32 h-32 text-4xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-skop-pink flex flex-col items-center justify-center shrink-0 border border-skop-pink-vivid/20`}
    >
      <span className="font-title font-bold text-skop-black leading-none">{score}</span>
      <span className="text-[10px] text-skop-gray-700 font-medium mt-1">/ {max}</span>
    </div>
  );
}
