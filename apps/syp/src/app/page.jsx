import { getCategories } from '@shipyourapp/data';
import { SearchForm } from '@/components/search-form';
import { CategoryCard } from '@/components/category-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const categories = getCategories();

  return (
    <div className="container px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Cursor Rules Directory
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse, search, and copy rules to enhance your Cursor AI experience
          </p>
        </div>

        <SearchForm />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
            <Button asChild variant="ghost">
              <Link href="/categories">View all</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 