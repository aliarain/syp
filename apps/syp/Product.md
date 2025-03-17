# ShipYourApp (SYP) - Cursor Rules Directory

## Core Purpose
ShipYourApp (SYP) is a specialized directory platform that stores and organizes rules for Cursor AI (an AI-powered code editor based on VS Code). Users can browse, search, and copy rules to paste into their own `cursor.rules.md` files, enhancing their AI-assisted coding workflows.

## Key Features

### 1. Rules Directory
- **Organized Collection**: Categorized repository of Cursor AI rules
- **Technology-Specific Rules**: Rules organized by programming language, framework, and use case
- **Copy-Paste Functionality**: Easy one-click copying of rules to clipboard

### 2. Search & Discovery
- **Powerful Search**: Find rules by keyword, technology, or purpose
- **Filtering Options**: Filter by popularity, recency, or compatibility
- **Preview Functionality**: See what a rule does before copying it

### 3. Community Contributions
- **User Submissions**: Allow users to submit their own effective rules
- **Voting System**: Community upvotes/downvotes to surface the best rules
- **Version Tagging**: Rules tagged with compatibility information (e.g., "Works with Next.js 14+")

### 4. Rule Documentation
- **Usage Instructions**: Clear documentation on how to implement each rule
- **Example Outputs**: Show before/after examples of what the rule produces
- **Compatibility Notes**: Information about which environments the rule works best in

### 5. User Accounts (Optional for MVP)
- **Favorites**: Save rules for later use
- **Contribution History**: Track which rules you've submitted
- **Personalized Recommendations**: Suggest rules based on previous selections

## Rule Structure Example
```yaml
- name: "React Functional Component"
  trigger: "create component"
  language: "typescript"
  compatibility: "React 16+"
  author: "username123"
  votes: 42
  rule: |
    Use functional components with TypeScript.
    Import React from 'react'.
    Add PropTypes if needed.
```

## User Experience Flow
1. User visits the SYP directory
2. Browses or searches for rules relevant to their project
3. Reviews rule details and examples
4. Copies selected rules with a single click
5. Pastes rules into their project's `cursor.rules.md` file
6. Optionally contributes their own rules back to the community

## Technical Implementation
- **Simple Web Interface**: Clean, searchable UI for browsing rules
- **Rule Storage**: Database of categorized and tagged rules
- **Contribution System**: Form for submitting new rules with validation
- **Voting Mechanism**: Simple upvote/downvote system for community curation

