import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Rule, Category } from '../types';

const rulesDirectory = path.join(process.cwd(), 'src', 'rules');

export function parseRuleFile(filePath: string, category: string): Rule {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Extract code blocks
  const codeMatch = content.match(/```(?:typescript|javascript)([\s\S]*?)```/);
  const code = codeMatch ? codeMatch[1].trim() : null;
  
  // Convert markdown to HTML (excluding code blocks)
  const htmlContent = marked(content.replace(/```(?:typescript|javascript)([\s\S]*?)```/g, ''));
  
  return {
    slug: path.basename(filePath, '.md'),
    category,
    frontmatter: {
      name: data.name || '',
      trigger: data.trigger || '',
      language: data.language || '',
      compatibility: data.compatibility || '',
      author: data.author || '',
      votes: data.votes || 0,
      tags: data.tags || [],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
    },
    content: content,
    code,
    htmlContent: htmlContent as string
  };
}

export function getAllRules(): Rule[] {
  const categories = fs.readdirSync(rulesDirectory).filter(
    (dir) => dir !== 'index.ts' && !dir.startsWith('.')
  );

  const allRules = categories.flatMap((category) => {
    const categoryPath = path.join(rulesDirectory, category);
    
    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
      return [];
    }
    
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));
    
    return files.map((file) => {
      const filePath = path.join(categoryPath, file);
      return parseRuleFile(filePath, category);
    });
  });

  return allRules;
}

export function getRulesByCategory(category: string): Rule[] {
  const categoryPath = path.join(rulesDirectory, category);
  
  if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
    return [];
  }
  
  const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));
  
  return files.map((file) => {
    const filePath = path.join(categoryPath, file);
    return parseRuleFile(filePath, category);
  });
}

export function getRuleBySlug(category: string, slug: string): Rule | undefined {
  const filePath = path.join(rulesDirectory, category, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  
  return parseRuleFile(filePath, category);
}

export function getCategories(): Category[] {
  const categories = fs.readdirSync(rulesDirectory).filter(
    (dir) => !dir.startsWith('.') && dir !== 'index.ts' && fs.statSync(path.join(rulesDirectory, dir)).isDirectory()
  );

  return categories.map(category => {
    const categoryPath = path.join(rulesDirectory, category);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));
    
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      slug: category,
      count: files.length
    };
  });
}

export function searchRules(query: string): Rule[] {
  const allRules = getAllRules();
  
  if (!query) return allRules;
  
  const lowerQuery = query.toLowerCase();
  
  return allRules.filter(rule => {
    return (
      rule.frontmatter.name.toLowerCase().includes(lowerQuery) ||
      rule.frontmatter.trigger.toLowerCase().includes(lowerQuery) ||
      rule.frontmatter.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      rule.content.toLowerCase().includes(lowerQuery)
    );
  });
} 