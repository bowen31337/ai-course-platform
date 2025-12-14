export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'slides' | 'reading' | 'assignment';
  duration: string;
  slug: string;
  content?: string;
  videoUrl?: string;
  slidesUrl?: string;
  readings?: { title: string; url: string; duration: string }[];
  assignment?: { title: string; description: string; githubUrl: string; points?: number };
}

export interface Week {
  id: number;
  title: string;
  description: string;
  guestSpeaker?: { name: string; company: string; topic: string };
  keyTools: string[];
  lessons: Lesson[];
}

export const courseData: Week[] = [
  {
    id: 1,
    title: 'LLMs and Prompt Engineering',
    description: 'Foundations of large language models and effective prompting strategies for software development.',
    keyTools: ['Claude', 'GPT-4', 'Ollama'],
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to AI-Assisted Development',
        type: 'video',
        duration: '45 min',
        slug: 'introduction',
        videoUrl: 'https://www.youtube.com/embed/5sLYAQS9sWQ',
        content: `# Introduction to AI-Assisted Development

Welcome to the AI-Assisted Software Development course! This week, we'll explore the foundations of working with Large Language Models (LLMs) in your development workflow.

## Learning Objectives

By the end of this lesson, you will:
- Understand what LLMs are and how they work at a high level
- Recognize the capabilities and limitations of AI coding assistants
- Set up your development environment with AI tools
- Write your first AI-assisted code

## What are LLMs?

Large Language Models are neural networks trained on vast amounts of text data. They learn patterns in language that allow them to generate human-like text, understand context, and even write code.

### Key Concepts

1. **Token-based processing**: LLMs work with tokens, not characters
2. **Context windows**: The amount of text an LLM can "see" at once
3. **Temperature**: Controls randomness in outputs
4. **System prompts**: Instructions that shape model behavior

## The AI Development Landscape

Today's AI coding tools fall into several categories:

- **Chat interfaces**: Claude, ChatGPT, Gemini
- **IDE integrations**: Cursor, Windsurf, GitHub Copilot
- **Autonomous agents**: Devin, Claude Code
- **Specialized tools**: Warp (terminal), Graphite (code review)
`
      },
      {
        id: '1-2',
        title: 'Prompt Engineering Fundamentals',
        type: 'video',
        duration: '50 min',
        slug: 'prompt-engineering',
        videoUrl: 'https://www.youtube.com/embed/ujnLJru2LIs',
        content: `# Prompt Engineering Fundamentals

Effective prompting is the key to getting great results from AI coding assistants. This lesson covers essential techniques.

## The Anatomy of a Good Prompt

A well-structured prompt typically includes:

1. **Context**: Background information about your project
2. **Task**: Clear description of what you want
3. **Constraints**: Limitations or requirements
4. **Examples**: Sample inputs/outputs when helpful

## Prompting Techniques

### Zero-shot Prompting
Ask directly without examples:
\`\`\`python
# Write a Python function to validate email addresses using regex
import re

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))
\`\`\`

### Few-shot Prompting
Provide examples first:
\`\`\`typescript
// Convert these to TypeScript interfaces:
// Input: { name: "John", age: 30 }
// Output:
interface Person {
  name: string;
  age: number;
}

// Now convert: { title: "Post", views: 100, published: true }
interface Post {
  title: string;
  views: number;
  published: boolean;
}
\`\`\`

### Chain-of-Thought
Ask for step-by-step reasoning:
\`\`\`
Think through how you would design a rate limiter, 
then implement it in Python.
\`\`\`
`
      },
      {
        id: '1-3',
        title: 'Week 1 Readings',
        type: 'reading',
        duration: '60 min',
        slug: 'readings',
        readings: [
          { title: 'Attention Is All You Need (Original Transformer Paper)', url: 'https://arxiv.org/abs/1706.03762', duration: '30 min' },
          { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/', duration: '20 min' },
          { title: 'Claude Documentation', url: 'https://docs.anthropic.com/', duration: '10 min' }
        ]
      },
      {
        id: '1-4',
        title: 'Assignment: Prompting Techniques',
        type: 'assignment',
        duration: '3 hours',
        slug: 'assignment',
        assignment: {
          title: 'Prompting Techniques (60 pts)',
          description: 'Practice 6 prompting techniques: K-shot prompting, Chain-of-thought, Tool calling, Self-consistency prompting, RAG (Retrieval-Augmented Generation), and Reflexion. Uses Ollama with mistral-nemo:12b and llama3.1:8b models. Complete the implementation files and run the evaluation scripts.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week1',
          points: 60
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Coding Agents and MCP',
    description: 'Deep dive into autonomous coding agents and the Model Context Protocol.',
    guestSpeaker: { name: 'Claude Code Team', company: 'Anthropic', topic: 'Building with Claude Code' },
    keyTools: ['Claude Code', 'MCP', 'FastAPI'],
    lessons: [
      {
        id: '2-1',
        title: 'Understanding Coding Agents',
        type: 'video',
        duration: '55 min',
        slug: 'coding-agents',
        videoUrl: 'https://www.youtube.com/embed/ectyyex0IBo',
        content: `# Understanding Coding Agents

Coding agents represent the next evolution in AI-assisted development. Unlike chat-based tools, agents can take autonomous actions.

## What Makes an Agent?

An AI coding agent has three key capabilities:

1. **Perception**: Reading files, understanding codebases
2. **Reasoning**: Planning multi-step solutions
3. **Action**: Executing commands, writing files, running tests

## Agent Architectures

### ReAct Pattern
Reasoning + Acting in an interleaved loop:
- Observe the current state
- Think about what to do next
- Take an action
- Repeat

\`\`\`python
def react_loop(task: str, max_steps: int = 10):
    """ReAct pattern implementation"""
    observation = get_initial_state()
    
    for step in range(max_steps):
        # Reason about the current state
        thought = llm.reason(task, observation)
        
        # Decide on an action
        action = llm.decide_action(thought)
        
        # Execute the action
        observation = execute(action)
        
        if is_task_complete(observation):
            return observation
    
    return observation
\`\`\`

### Tool Use
Modern agents use tools to interact with the environment:
- File system operations
- Terminal commands
- Web browsing
- API calls

## Claude Code Deep Dive

Claude Code is Anthropic's agentic coding assistant. Key features:
- Full codebase understanding
- Multi-file editing
- Test execution
- Git operations
`
      },
      {
        id: '2-2',
        title: 'Model Context Protocol (MCP)',
        type: 'video',
        duration: '45 min',
        slug: 'mcp-protocol',
        videoUrl: 'https://www.youtube.com/embed/CQywdSdi5iA',
        content: `# Model Context Protocol (MCP)

MCP is an open standard for connecting AI models to external data sources and tools.

## Why MCP?

Before MCP, every AI tool needed custom integrations:
- Fragmented ecosystem
- Duplicate work
- Inconsistent experiences

MCP provides a universal protocol for AI-tool communication.

## Core Concepts

### Resources
Data that models can read:
- Files
- Database records
- API responses

### Tools
Actions that models can take:
- Run commands
- Call APIs
- Modify files

### Prompts
Templates for common interactions

## Building MCP Servers

You can create custom MCP servers to give AI access to your systems:

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({
  name: "my-server",
  version: "1.0.0"
});

server.addTool({
  name: "get_user",
  description: "Fetch user by ID",
  inputSchema: {
    type: "object",
    properties: {
      userId: { type: "string" }
    },
    required: ["userId"]
  },
  handler: async ({ userId }) => {
    const user = await db.users.find(userId);
    return { content: [{ type: "text", text: JSON.stringify(user) }] };
  }
});

server.start();
\`\`\`
`
      },
      {
        id: '2-3',
        title: 'Guest Speaker: Anthropic',
        type: 'video',
        duration: '60 min',
        slug: 'guest-anthropic',
        videoUrl: 'https://www.youtube.com/embed/m2VqaNKstGc'
      },
      {
        id: '2-4',
        title: 'Week 2 Readings',
        type: 'reading',
        duration: '45 min',
        slug: 'readings',
        readings: [
          { title: 'MCP Specification', url: 'https://modelcontextprotocol.io/', duration: '20 min' },
          { title: 'Claude Code Documentation', url: 'https://docs.anthropic.com/claude-code', duration: '15 min' },
          { title: 'ReAct: Synergizing Reasoning and Acting', url: 'https://arxiv.org/abs/2210.03629', duration: '10 min' }
        ]
      },
      {
        id: '2-5',
        title: 'Assignment: Action Item Extractor',
        type: 'assignment',
        duration: '4 hours',
        slug: 'assignment',
        assignment: {
          title: 'Action Item Extractor (100 pts)',
          description: 'Expand a FastAPI + SQLite app that converts notes to action items. Tasks include: LLM-powered extraction, unit tests, code refactoring, agentic mode automation, and README generation. Build an intelligent system that can parse meeting notes and extract actionable tasks.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week2',
          points: 100
        }
      }
    ]
  },
  {
    id: 3,
    title: 'AI IDE Setup and PRDs',
    description: 'Configure modern AI-powered IDEs and learn to write effective Product Requirements Documents.',
    keyTools: ['Cursor', 'Windsurf', 'MCP'],
    lessons: [
      { id: '3-1', title: 'Cursor IDE Deep Dive', type: 'video', duration: '50 min', slug: 'cursor-ide', videoUrl: 'https://www.youtube.com/embed/vSgqPSG-pzo' },
      { id: '3-2', title: 'Windsurf and Alternatives', type: 'video', duration: '40 min', slug: 'windsurf', videoUrl: 'https://www.youtube.com/embed/ocMOZpuAMw4' },
      { id: '3-3', title: 'Writing AI-Friendly PRDs', type: 'video', duration: '45 min', slug: 'prd-writing', videoUrl: 'https://www.youtube.com/embed/3289vhOUdKA' },
      { 
        id: '3-4', 
        title: 'Week 3 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'Cursor Documentation', url: 'https://docs.cursor.com/', duration: '15 min' },
          { title: 'Windsurf Guide', url: 'https://codeium.com/windsurf', duration: '15 min' }
        ]
      },
      { 
        id: '3-5', 
        title: 'Assignment: Build a Custom MCP Server', 
        type: 'assignment', 
        duration: '4 hours', 
        slug: 'assignment',
        assignment: {
          title: 'Build a Custom MCP Server (90 pts)',
          description: 'Design and build an MCP server that wraps an external API with 2+ tools. Choose between local (STDIO) or remote (HTTP) deployment. Bonus points available for implementing authentication. Connect your server to Claude or another MCP-compatible client.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week3',
          points: 90
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Agent Patterns and Autonomy',
    description: 'Explore advanced agent architectures with guest speaker from Cognition.',
    guestSpeaker: { name: 'Devin Team', company: 'Cognition', topic: 'Building Autonomous Agents' },
    keyTools: ['Devin', 'Claude Code'],
    lessons: [
      { id: '4-1', title: 'Agent Architecture Patterns', type: 'video', duration: '55 min', slug: 'agent-patterns', videoUrl: 'https://www.youtube.com/embed/gI0ZNhA0rvE' },
      { id: '4-2', title: 'Managing Agent Autonomy', type: 'video', duration: '45 min', slug: 'autonomy', videoUrl: 'https://www.youtube.com/embed/ZUw0JzZ1I2Q' },
      { id: '4-3', title: 'Guest Speaker: Cognition', type: 'video', duration: '60 min', slug: 'guest-cognition', videoUrl: 'https://www.youtube.com/embed/-6e7897zLQM' },
      { 
        id: '4-4', 
        title: 'Week 4 Readings', 
        type: 'reading', 
        duration: '40 min', 
        slug: 'readings',
        readings: [
          { title: 'Claude Code Best Practices', url: 'https://docs.anthropic.com/claude-code/best-practices', duration: '20 min' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents', duration: '20 min' }
        ]
      },
      { 
        id: '4-5', 
        title: 'Assignment: Autonomous Coding Agent', 
        type: 'assignment', 
        duration: '5 hours', 
        slug: 'assignment',
        assignment: {
          title: 'Autonomous Coding Agent with Claude Code',
          description: 'Build 2+ automations using Claude Code features: slash commands, CLAUDE.md files, SubAgents, and MCP servers. Apply these to a starter app (FastAPI + SQLite) to create automated development workflows.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week4'
        }
      }
    ]
  },
  {
    id: 5,
    title: 'AI Terminal and CLI',
    description: 'Master AI-enhanced terminal workflows with Warp.',
    guestSpeaker: { name: 'Warp Team', company: 'Warp', topic: 'The AI-Native Terminal' },
    keyTools: ['Warp'],
    lessons: [
      { id: '5-1', title: 'Introduction to AI Terminals', type: 'video', duration: '40 min', slug: 'ai-terminals', videoUrl: 'https://www.youtube.com/embed/TIfj8W775Sc' },
      { id: '5-2', title: 'Warp Deep Dive', type: 'video', duration: '50 min', slug: 'warp-deep-dive', videoUrl: 'https://www.youtube.com/embed/RwJhoWm0Aas' },
      { id: '5-3', title: 'Guest Speaker: Warp', type: 'video', duration: '60 min', slug: 'guest-warp', videoUrl: 'https://www.youtube.com/embed/qMfdPodjfmA' },
      { 
        id: '5-4', 
        title: 'Week 5 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'Warp Documentation', url: 'https://docs.warp.dev/', duration: '15 min' },
          { title: 'Terminal Productivity Tips', url: 'https://warp.dev/blog', duration: '15 min' }
        ]
      },
      { 
        id: '5-5', 
        title: 'Assignment: Agentic Development with Warp', 
        type: 'assignment', 
        duration: '3 hours', 
        slug: 'assignment',
        assignment: {
          title: 'Agentic Development with Warp',
          description: 'Build 2+ Warp automations using: saved prompts, rules, MCP servers, and multi-agent workflows. Work with a similar starter app as week 4 to create powerful terminal-based development automations.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week5'
        }
      }
    ]
  },
  {
    id: 6,
    title: 'Testing and Security',
    description: 'AI-assisted testing strategies and security considerations with Semgrep.',
    guestSpeaker: { name: 'Semgrep Team', company: 'Semgrep', topic: 'AI-Powered Security Analysis' },
    keyTools: ['Semgrep', 'SAST/DAST'],
    lessons: [
      { id: '6-1', title: 'AI-Assisted Testing', type: 'video', duration: '50 min', slug: 'ai-testing', videoUrl: 'https://www.youtube.com/embed/IdbTfBsU_bs' },
      { id: '6-2', title: 'Security Scanning with AI', type: 'video', duration: '45 min', slug: 'security-scanning', videoUrl: 'https://www.youtube.com/embed/O5mh8j7-An8' },
      { id: '6-3', title: 'Guest Speaker: Semgrep', type: 'video', duration: '60 min', slug: 'guest-semgrep', videoUrl: 'https://www.youtube.com/embed/gqnMrViFmWc' },
      { 
        id: '6-4', 
        title: 'Week 6 Readings', 
        type: 'reading', 
        duration: '45 min', 
        slug: 'readings',
        readings: [
          { title: 'Semgrep Documentation', url: 'https://semgrep.dev/docs/', duration: '25 min' },
          { title: 'OWASP Top 10', url: 'https://owasp.org/Top10/', duration: '20 min' }
        ]
      },
      { 
        id: '6-5', 
        title: 'Assignment: Security Audit with Semgrep', 
        type: 'assignment', 
        duration: '3 hours', 
        slug: 'assignment',
        assignment: {
          title: 'Scan and Fix Vulnerabilities with Semgrep',
          description: 'Run Semgrep static analysis on the week 6 starter app to identify security vulnerabilities. Fix a minimum of 3 security issues and document your findings. Learn to integrate security scanning into your development workflow.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week6'
        }
      }
    ]
  },
  {
    id: 7,
    title: 'Code Review and Debugging',
    description: 'Enhance code review workflows with AI and Graphite.',
    guestSpeaker: { name: 'Graphite Team', company: 'Graphite', topic: 'Modern Code Review' },
    keyTools: ['Graphite', 'Diamond'],
    lessons: [
      { id: '7-1', title: 'AI-Powered Code Review', type: 'video', duration: '45 min', slug: 'ai-code-review', videoUrl: 'https://www.youtube.com/embed/8ythOZaweck' },
      { id: '7-2', title: 'Debugging with AI', type: 'video', duration: '50 min', slug: 'ai-debugging', videoUrl: 'https://www.youtube.com/embed/H6MrR5NbTZA' },
      { id: '7-3', title: 'Guest Speaker: Graphite', type: 'video', duration: '60 min', slug: 'guest-graphite', videoUrl: 'https://www.youtube.com/embed/M9oVfdL6ihk' },
      { 
        id: '7-4', 
        title: 'Week 7 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'Graphite Documentation', url: 'https://graphite.dev/docs', duration: '15 min' },
          { title: 'Code Review Best Practices', url: 'https://google.github.io/eng-practices/review/', duration: '15 min' }
        ]
      },
      { 
        id: '7-5', 
        title: 'Assignment: AI Code Review with Graphite', 
        type: 'assignment', 
        duration: '4 hours', 
        slug: 'assignment',
        assignment: {
          title: 'AI Code Review with Graphite (100 pts)',
          description: 'Implement tasks from the provided TASKS.md file using an AI coding tool. Use Graphite Diamond for AI code review on your pull requests. Compare manual code review vs AI-assisted reviews and document your findings.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week7',
          points: 100
        }
      }
    ]
  },
  {
    id: 8,
    title: 'UI and App Building',
    description: 'Rapid prototyping and UI generation with v0 and Vercel.',
    guestSpeaker: { name: 'Vercel Team', company: 'Vercel', topic: 'AI-First Frontend Development' },
    keyTools: ['v0', 'Vercel', 'bolt.new'],
    lessons: [
      { id: '8-1', title: 'AI UI Generation', type: 'video', duration: '50 min', slug: 'ai-ui-generation', videoUrl: 'https://www.youtube.com/embed/61st-JJSvYA' },
      { id: '8-2', title: 'v0 and Design Systems', type: 'video', duration: '45 min', slug: 'v0-design-systems', videoUrl: 'https://www.youtube.com/embed/EG6ByVGvyXA' },
      { id: '8-3', title: 'Guest Speaker: Vercel', type: 'video', duration: '60 min', slug: 'guest-vercel', videoUrl: 'https://www.youtube.com/embed/qjhG8au_ffs' },
      { 
        id: '8-4', 
        title: 'Week 8 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'v0 by Vercel', url: 'https://v0.dev/', duration: '15 min' },
          { title: 'bolt.new Documentation', url: 'https://bolt.new/', duration: '15 min' }
        ]
      },
      { 
        id: '8-5', 
        title: 'Assignment: Multi-Stack Web App', 
        type: 'assignment', 
        duration: '6 hours', 
        slug: 'assignment',
        assignment: {
          title: 'Multi-Stack AI-Accelerated Web App Build (100 pts)',
          description: 'Build the same application in 3 distinct tech stacks. At least one implementation must use bolt.new, and one must use a non-JavaScript language. All implementations require CRUD functionality. Compare development speed and code quality across approaches.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week8',
          points: 100
        }
      }
    ]
  },
  {
    id: 9,
    title: 'Monitoring and Incident Response',
    description: 'AI-enhanced observability and incident management with Resolve.',
    guestSpeaker: { name: 'Resolve Team', company: 'Resolve', topic: 'AI in Operations' },
    keyTools: ['Observability Tools'],
    lessons: [
      { id: '9-1', title: 'AI-Enhanced Monitoring', type: 'video', duration: '45 min', slug: 'ai-monitoring', videoUrl: 'https://www.youtube.com/embed/m6hfn3QgGiA' },
      { id: '9-2', title: 'Incident Response with AI', type: 'video', duration: '50 min', slug: 'incident-response', videoUrl: 'https://www.youtube.com/embed/XP15D1PRiJc' },
      { id: '9-3', title: 'Guest Speaker: Resolve', type: 'video', duration: '60 min', slug: 'guest-resolve', videoUrl: 'https://www.youtube.com/embed/hfbblWXZldk' },
      { 
        id: '9-4', 
        title: 'Week 9 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'Site Reliability Engineering', url: 'https://sre.google/sre-book/table-of-contents/', duration: '20 min' },
          { title: 'Incident Management Best Practices', url: 'https://www.atlassian.com/incident-management', duration: '10 min' }
        ]
      },
      { 
        id: '9-5', 
        title: 'Assignment: Runbook Automation', 
        type: 'assignment', 
        duration: '3 hours', 
        slug: 'assignment',
        assignment: {
          title: 'AI-Powered Runbook Automation',
          description: 'Create automated runbooks for common incident response scenarios. Integrate AI-assisted diagnostics and implement automated remediation steps for identified issues.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments'
        }
      }
    ]
  },
  {
    id: 10,
    title: 'Future of AI Engineering',
    description: 'Industry perspectives and career preparation with a16z.',
    guestSpeaker: { name: 'a16z Team', company: 'Andreessen Horowitz', topic: 'The Future of Software Development' },
    keyTools: [],
    lessons: [
      { id: '10-1', title: 'Industry Trends', type: 'video', duration: '50 min', slug: 'industry-trends', videoUrl: 'https://www.youtube.com/embed/6Z5hlKIDV44' },
      { id: '10-2', title: 'Career in AI Development', type: 'video', duration: '45 min', slug: 'career-ai-dev', videoUrl: 'https://www.youtube.com/embed/EIPxf7rgIPI' },
      { id: '10-3', title: 'Guest Speaker: a16z', type: 'video', duration: '60 min', slug: 'guest-a16z', videoUrl: 'https://www.youtube.com/embed/xN81Nk-vH8M' },
      { 
        id: '10-4', 
        title: 'Week 10 Readings', 
        type: 'reading', 
        duration: '30 min', 
        slug: 'readings',
        readings: [
          { title: 'The AI Engineer Manifesto', url: 'https://www.latent.space/p/ai-engineer', duration: '15 min' },
          { title: 'Future of Programming', url: 'https://a16z.com/', duration: '15 min' }
        ]
      },
      { 
        id: '10-5', 
        title: 'Final Project', 
        type: 'assignment', 
        duration: '10 hours', 
        slug: 'final-project',
        assignment: {
          title: 'Capstone: AI-Enhanced Development Project',
          description: 'Demonstrate mastery of AI-assisted development by building a complete application that showcases multiple techniques learned throughout the course. Include prompt engineering, agent workflows, security scanning, and automated testing.',
          githubUrl: 'https://github.com/mihail911/modern-software-dev-assignments'
        }
      }
    ]
  }
];

export const glossaryData = [
  { term: 'LLM', definition: 'Large Language Model - A neural network trained on vast amounts of text data capable of understanding and generating human-like text.' },
  { term: 'Prompt Engineering', definition: 'The practice of crafting effective inputs to AI models to achieve desired outputs.' },
  { term: 'Token', definition: 'The basic unit of text that LLMs process, typically representing a word or word fragment.' },
  { term: 'Context Window', definition: 'The maximum amount of text an LLM can process in a single interaction.' },
  { term: 'MCP', definition: 'Model Context Protocol - An open standard for connecting AI models to external data sources and tools.' },
  { term: 'Agent', definition: 'An AI system that can perceive its environment, reason about actions, and execute tasks autonomously.' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation - A technique that enhances LLM responses by retrieving relevant information from external sources.' },
  { term: 'Fine-tuning', definition: 'The process of further training a pre-trained model on specific data to improve performance on particular tasks.' },
  { term: 'Hallucination', definition: 'When an AI model generates information that is factually incorrect or fabricated.' },
  { term: 'Temperature', definition: 'A parameter that controls the randomness of model outputs. Higher values produce more creative but less predictable results.' }
];

export const faqData = [
  { question: 'Is this course free?', answer: 'Yes! This course is completely free and open to everyone. No signup or payment required.' },
  { question: 'Do I need prior AI experience?', answer: 'No prior AI or machine learning experience is required. However, you should be comfortable with programming in at least one language.' },
  { question: 'How long does the course take?', answer: 'The course is designed for 10 weeks at approximately 5-10 hours per week. However, you can complete it at your own pace.' },
  { question: 'Will I get a certificate?', answer: 'Completion certificates will be available in a future update. For now, focus on the skills and projects you build.' },
  { question: 'What tools do I need?', answer: 'You will need access to AI coding tools like Claude, Cursor, or similar. Most offer free tiers sufficient for the course.' },
  { question: 'Can I skip weeks?', answer: 'While the course is designed to be taken sequentially, you can jump to any week that interests you.' }
];

export const toolsData = [
  { name: 'Claude', description: 'AI assistant for coding, analysis, and creative tasks', url: 'https://claude.ai', category: 'Chat' },
  { name: 'Cursor', description: 'AI-first code editor built on VS Code', url: 'https://cursor.sh', category: 'IDE' },
  { name: 'Windsurf', description: 'Alternative AI-powered IDE', url: 'https://codeium.com/windsurf', category: 'IDE' },
  { name: 'Claude Code', description: 'Agentic coding assistant from Anthropic', url: 'https://docs.anthropic.com', category: 'Agent' },
  { name: 'Warp', description: 'AI-native terminal application', url: 'https://warp.dev', category: 'Terminal' },
  { name: 'GitHub Copilot', description: 'AI pair programmer from GitHub/Microsoft', url: 'https://github.com/features/copilot', category: 'IDE Extension' }
];
