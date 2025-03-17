'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

export function CopyButton({ value, label = 'Copy' }) {
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