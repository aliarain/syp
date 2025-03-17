export interface RuleFrontmatter {
  name: string;
  trigger: string;
  language: string;
  compatibility: string;
  author: string;
  votes: number;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Rule {
  slug: string;
  category: string;
  frontmatter: RuleFrontmatter;
  content: string;
  code: string | null;
  htmlContent?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
} 