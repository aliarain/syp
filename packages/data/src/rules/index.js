import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const rulesDirectory = path.join(process.cwd(), 'src', 'rules');

export function getCategories() {
    try {
        const categories = fs.readdirSync(rulesDirectory).filter(
            (dir) => !dir.startsWith('.') && fs.statSync(path.join(rulesDirectory, dir)).isDirectory()
        );

        return categories.map(category => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            slug: category,
            count: fs.readdirSync(path.join(rulesDirectory, category))
                .filter(file => file.endsWith('.md')).length
        }));
    } catch (error) {
        console.error('Error getting categories:', error);
        return [];
    }
}

export function getRulesByCategory(category) {
    try {
        const categoryPath = path.join(rulesDirectory, category);
        const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));

        return files.map(file => {
            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            const codeMatch = content.match(/```(?:typescript|javascript)([\s\S]*?)```/);
            const code = codeMatch ? codeMatch[1].trim() : null;

            return {
                slug: file.replace('.md', ''),
                category,
                frontmatter: {
                    name: data.name || '',
                    trigger: data.trigger || '',
                    language: data.language || '',
                    compatibility: data.compatibility || '',
                    author: data.author || '',
                    votes: data.votes || 0,
                    tags: data.tags || [],
                },
                content,
                code,
                htmlContent: marked(content)
            };
        });
    } catch (error) {
        console.error('Error getting rules:', error);
        return [];
    }
}

export function getRuleBySlug(category, slug) {
    try {
        const filePath = path.join(rulesDirectory, category, `${slug}.md`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const codeMatch = content.match(/```(?:typescript|javascript)([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[1].trim() : null;

        return {
            slug,
            category,
            frontmatter: {
                name: data.name || '',
                trigger: data.trigger || '',
                language: data.language || '',
                compatibility: data.compatibility || '',
                author: data.author || '',
                votes: data.votes || 0,
                tags: data.tags || [],
            },
            content,
            code,
            htmlContent: marked(content)
        };
    } catch (error) {
        console.error('Error getting rule:', error);
        return null;
    }
}

export function searchRules(query) {
    const allRules = [];
    const categories = getCategories();

    categories.forEach(category => {
        const rules = getRulesByCategory(category.slug);
        allRules.push(...rules);
    });

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