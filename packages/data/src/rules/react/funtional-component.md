---
name: "React Functional Component"
trigger: "create component"
language: "typescript"
compatibility: "React 16+"
author: "shipyourapp"
votes: 42
tags: ["react", "component", "typescript"]
---

# React Functional Component

Use functional components with TypeScript for better type safety and inference.

```typescript
import React from 'react';
import { type FC } from 'react';

interface ComponentProps {
  title: string;
  description?: string;
}

export const Component: FC<ComponentProps> = ({ 
  title,
  description
}) => {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};
```

## Usage

This component can be imported and used in your React application:

```typescript
import { Component } from './Component';

function App() {
  return (
    <Component 
      title="Hello World" 
      description="This is a TypeScript React component" 
    />
  );
}
```
```

Create a few more example rules in different categories.

## Phase 2: Next.js Application Setup

### 1. Set up Next.js app with the necessary configuration

```bash
cd apps/syp
```

### 2. Configure layout and theme

```typescript:apps/syp/src/app/layout.tsx
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ShipYourApp - Cursor Rules Directory',
  description: 'Browse, search, and copy rules for Cursor AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Create main page layout and components

```typescript:apps/syp/src/components/layout/header.tsx
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">ShipYourApp</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/yourusername/shipyourapp" target="_blank">
              <GitHubLogoIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

### 4. Implement the home page with search and categories

```typescript:apps/syp/src/app/page.tsx
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
```

### 5. Create search components

```typescript:apps/syp/src/components/search-form.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for rules, languages, or frameworks..."
          className="pl-10 pr-16"
        />
        <Button 
          type="submit" 
          size="sm" 
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
```

### 6. Create category components

```typescript:apps/syp/src/components/category-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Category } from '@shipyourapp/data';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
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
```

## Phase 3: Rule Display and Interaction

### 1. Create the rule list component

```typescript:apps/syp/src/components/rule-list.tsx
import type { Rule } from '@shipyourapp/data';
import { RuleCard } from '@/components/rule-card';

interface RuleListProps {
  rules: Rule[];
  emptyMessage?: string;
}

export function RuleList({ rules, emptyMessage = 'No rules found' }: RuleListProps) {
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
```

### 2. Create the rule card component

```typescript:apps/syp/src/components/rule-card.tsx
'use client';

import type { Rule } from '@shipyourapp/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

interface RuleCardProps {
  rule: Rule;
}

export function RuleCard({ rule }: RuleCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rule.content);
    setCopied(true);
    toast.success('Rule copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Link href={`/categories/${rule.category}/${rule.slug}`}>
            <CardTitle className="hover:underline">{rule.frontmatter.name}</CardTitle>
          </Link>
          <Badge variant="outline">{rule.frontmatter.language}</Badge>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {rule.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          <strong>Trigger:</strong> {rule.frontmatter.trigger}
        </div>
        <div className="text-sm text-muted-foreground">
          <strong>Compatibility:</strong> {rule.frontmatter.compatibility}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          By {rule.frontmatter.author} • {rule.frontmatter.votes} votes
        </div>
        <Button size="sm" onClick={copyToClipboard}>
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### 3. Implement the rule detail page

```typescript:apps/syp/src/app/categories/[category]/[slug]/page.tsx
import { getRuleBySlug, getCategories } from '@shipyourapp/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface RulePageProps {
  params: {
    category: string;
    slug: string;
  };
}

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

export default function RulePage({ params }: RulePageProps) {
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
```

### 4. Create a copy button component

```typescript:apps/syp/src/components/copy-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CopyButtonProps {
  value: string;
  label?: string;
}

export function CopyButton({ value, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('Copied to clipboard');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button size="sm" onClick={copyToClipboard}>
      {copied ? (
        <>
          <CheckIcon className="h-4 w-4 mr-2" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}
```

## Phase 4: Search and Categories Implementation

### 1. Implement the search results page

```typescript:apps/syp/src/app/search/page.tsx
import { searchRules } from '@shipyourapp/data';
import { RuleList } from '@/components/rule-list';
import { SearchForm } from '@/components/search-form';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
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
```

### 2. Implement the categories index page

```typescript:apps/syp/src/app/categories/page.tsx
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
```

### 3. Implement the category detail page

```typescript:apps/syp/src/app/categories/[category]/page.tsx
import { getRulesByCategory, getCategories } from '@shipyourapp/data';
import { notFound } from 'next/navigation';
import { RuleList } from '@/components/rule-list';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map(category => ({
    category: category.slug
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
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
```

## Phase 5: Final UI Components and UI Polish

### 1. Create a theme toggle component

```typescript:apps/syp/src/components/theme-toggle.tsx
"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### 2. Create theme provider

```typescript:apps/syp/src/components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 3. Implement the 404 page

```typescript:apps/syp/src/app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-10 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
```

## Phase 6: Implementation Steps

Follow these steps to implement the application:

1. **Set up the monorepo structure** as outlined previously
2. **Install dependencies** in each workspace package
3. **Create the data package** with the rule parser and example rules
4. **Build the Next.js application** UI components and pages
5. **Test the application** locally and fix any issues
6. **Deploy to Vercel** using their monorepo support

### Step-by-step Implementation:

1. Initialize the monorepo:
```bash
mkdir shipyourapp && cd shipyourapp
npm init -y
```

2. Install Turborepo:
```bash
npm install turbo --save-dev
```

3. Add configuration files (package.json, turbo.json, etc.) as outlined earlier

4. Create the directory structure:
```bash
mkdir -p apps/syp/src/{app,components,lib,emails}
mkdir -p packages/data/src/{rules,mcp,popular}
mkdir -p packages/kv/src
```

5. Set up the data package with example rules

6. Build the Next.js application UI components

7. Test the application:
```bash
npm run dev
```

8. Create a GitHub repository and push your code

9. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Configure the monorepo settings to point to the `apps/syp` directory
   - Deploy the application

## Additional Features for Future Iterations

1. **User Authentication**: Allow users to create accounts and save favorite rules
2. **Rule Voting**: Implement upvote/downvote functionality
3. **Rule Submission**: Allow users to submit new rules
4. **Rule Collections**: Group related rules into collections
5. **Rule Versioning**: Track changes to rules over time
6. **Analytics**: Track which rules are most popular
7. **Direct Cursor Integration**: Create a browser extension or API to directly integrate with Cursor

This implementation plan provides a comprehensive approach to building your ShipYourApp Cursor Rules Directory. By following these steps, you'll create a fully functional application that allows users to browse, search, and copy rules to enhance their Cursor AI experience.