import { getCategories } from '@shipyourapp/data';
import { CategoryCard } from '@/components/category-card';

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
} 