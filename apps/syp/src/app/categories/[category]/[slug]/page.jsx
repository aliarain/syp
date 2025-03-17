import { getRuleBySlug, getCategories, getRulesByCategory } from '@shipyourapp/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const categories = getCategories();
  const paths = categories.flatMap(category => {
    const rules = getRulesByCategory(category.slug);
    return rules.map(rule => ({
      category: category.slug,
      slug: rule.slug
    }));
  });
  
  return paths;
}

export default function RulePage({ params }) {
  const { category, slug } = params;
  const rule = getRuleBySlug(category, slug);
  
  if (!rule) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/categories/${category}`}>
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back to {category}
          </Link>
        </Button>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{rule.frontmatter.name}</h1>
            <Badge variant="outline">{rule.frontmatter.language}</Badge>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {rule.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Trigger:</strong> {rule.frontmatter.trigger}</p>
              <p><strong>Compatibility:</strong> {rule.frontmatter.compatibility}</p>
            </div>
            <div>
              <p><strong>Author:</strong> {rule.frontmatter.author}</p>
              <p><strong>Votes:</strong> {rule.frontmatter.votes}</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Rule Content</h2>
            <CopyButton value={rule.content} />
          </div>
          
          <div className="prose dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: rule.htmlContent || '' }} />
        </div>
        
        {rule.code && (
          <div className="border rounded-lg p-4 bg-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Code Example</h2>
              <CopyButton value={rule.code} label="Copy Code" />
            </div>
            
            <pre className="p-4 rounded-md bg-muted overflow-x-auto">
              <code>{rule.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 