import { TYPE_COLORS, TYPE_EMOJIS } from '../constants/pokemon';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const colors = TYPE_COLORS[type] || TYPE_COLORS['Colorless'];
  const emoji = TYPE_EMOJIS[type] || '⭐';

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors.badge} ${sizeClasses[size]}`}>
      <span>{emoji}</span>
      <span>{type}</span>
    </span>
  );
}
