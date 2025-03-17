import { RuleCard } from '@/components/rule-card';

export function RuleList({ rules, emptyMessage = 'No rules found' }) {
  if (rules.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {rules.map((rule) => (
        <RuleCard key={`${rule.category}-${rule.slug}`} rule={rule} />
      ))}
    </div>
  );
} 