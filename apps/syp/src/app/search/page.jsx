import { searchRules } from '@shipyourapp/data';
import { RuleList } from '@/components/rule-list';
import { SearchForm } from '@/components/search-form';

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const rules = searchRules(query);

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <SearchForm />
        </div>
        
        {query ? (
          <>
            <p className="text-muted-foreground">
              Found {rules.length} result{rules.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <RuleList 
              rules={rules} 
              emptyMessage={`No rules found for "${query}"`} 
            />
          </>
        ) : (
          <p className="text-muted-foreground">Enter a search term to find rules</p>
        )}
      </div>
    </div>
  );
} 