'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export function RuleCard({ rule }) {
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