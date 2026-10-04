export default function TelegramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M21.5 3.7 18.2 20c-.25 1.15-.92 1.43-1.87.9l-5.16-3.8-2.49 2.4c-.28.28-.51.51-1.05.51l.37-5.25 9.56-8.64c.42-.37-.09-.58-.65-.21L5.1 13.47.02 11.88c-1.1-.35-1.12-1.1.23-1.61L20.1 2.66c.91-.34 1.71.21 1.4 1.04Z" fill="currentColor" />
    </svg>
  );
}
