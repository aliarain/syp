import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function CategoryCard({ category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="h-full transition-colors hover:bg-accent/40">
        <CardHeader className="pb-2">
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{category.count} rules</Badge>
        </CardContent>
      </Card>
    </Link>
  );
} 