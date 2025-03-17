import { getRulesByCategory, getCategories } from '@shipyourapp/data';
import { notFound } from 'next/navigation';
import { RuleList } from '@/components/rule-list';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map(category => ({
    category: category.slug
  }));
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const rules = getRulesByCategory(category);
  
  if (rules.length === 0) {
    notFound();
  }
  
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/categories">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back to categories
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{categoryName} Rules</h1>
      
      <div className="max-w-3xl">
        <RuleList 
          rules={rules} 
          emptyMessage={`No rules found in ${categoryName}`} 
        />
      </div>
    </div>
  );
} 