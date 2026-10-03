export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type Skill = {
  id: string
  name: string
  shortName: string
  hours: number
  difficulty: Difficulty
  reason: string
  practice: string[]
}

export type CareerGoal = {
  id: string
  name: string
  description: string
  roadmap: string[]
}

export const SKILLS: Record<string, Skill> = {
  html: {
    id: 'html',
    name: 'HTML Fundamentals',
    shortName: 'HTML',
    hours: 12,
    difficulty: 'Beginner',
    reason: 'HTML is the structure of every web page, so everything else builds on it.',
    practice: [
      'Build a personal bio page with headings, lists and images',
      'Create a contact form using semantic form elements',
      'Recreate a simple blog article layout using semantic tags',
    ],
  },
  css: {
    id: 'css',
    name: 'CSS Fundamentals',
    shortName: 'CSS',
    hours: 18,
    difficulty: 'Beginner',
    reason: 'CSS turns plain markup into polished, responsive interfaces.',
    practice: [
      'Style your bio page with a custom color palette',
      'Build a responsive card grid with Flexbox and Grid',
      'Recreate a landing page hero section from a screenshot',
    ],
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript Essentials',
    shortName: 'JavaScript',
    hours: 30,
    difficulty: 'Intermediate',
    reason: 'JavaScript adds interactivity and is required for every modern frontend framework.',
    practice: [
      'Build a to-do list with add, complete and delete',
      'Create a tip calculator that updates live',
      'Fetch and display data from a public JSON API',
    ],
  },
  git: {
    id: 'git',
    name: 'Git & GitHub',
    shortName: 'Git & GitHub',
    hours: 6,
    difficulty: 'Beginner',
    reason: 'Version control lets you save progress, collaborate and show your work to employers.',
    practice: [
      'Create a repository and push your first project',
      'Practice branching and merging a feature',
      'Open a pull request on a friend’s project',
    ],
  },
  react: {
    id: 'react',
    name: 'React.js',
    shortName: 'React',
    hours: 35,
    difficulty: 'Intermediate',
    reason: 'React is the most in-demand frontend library for building component-based apps.',
    practice: [
      'Rebuild your to-do list as React components',
      'Create a movie search app with state and props',
      'Build a multi-step form with validation',
    ],
  },
  apis: {
    id: 'apis',
    name: 'Working with APIs',
    shortName: 'APIs',
    hours: 12,
    difficulty: 'Intermediate',
    reason: 'Real apps talk to servers, so knowing how to request and handle data is essential.',
    practice: [
      'Build a weather app using a free weather API',
      'Handle loading and error states gracefully',
      'Paginate results from a public REST API',
    ],
  },
  'frontend-projects': {
    id: 'frontend-projects',
    name: 'Frontend Projects',
    shortName: 'Projects',
    hours: 40,
    difficulty: 'Advanced',
    reason: 'Portfolio projects prove your skills and are what recruiters look at first.',
    practice: [
      'Ship a responsive portfolio website',
      'Build a full e-commerce product page with cart',
      'Deploy a dashboard app and share the live link',
    ],
  },
  python: {
    id: 'python',
    name: 'Python Programming',
    shortName: 'Python',
    hours: 30,
    difficulty: 'Beginner',
    reason: 'Python is the most popular language for data, AI and backend scripting.',
    practice: [
      'Write a number guessing game',
      'Build a CLI expense tracker that saves to a file',
      'Automate renaming files in a folder',
    ],
  },
  java: {
    id: 'java',
    name: 'Java Programming',
    shortName: 'Java',
    hours: 30,
    difficulty: 'Beginner',
    reason: 'Java teaches strong object-oriented habits and powers many enterprise backends.',
    practice: [
      'Write a console calculator with classes',
      'Model a bank account with OOP principles',
      'Read and write data from a text file',
    ],
  },
  'programming-fundamentals': {
    id: 'programming-fundamentals',
    name: 'Programming Fundamentals',
    shortName: 'Fundamentals',
    hours: 20,
    difficulty: 'Beginner',
    reason: 'Data structures, algorithms and clean code make every backend you write more reliable.',
    practice: [
      'Implement a stack and a queue from scratch',
      'Solve five array and string problems',
      'Refactor an old script into small, tested functions',
    ],
  },
  databases: {
    id: 'databases',
    name: 'Database Design',
    shortName: 'Databases',
    hours: 14,
    difficulty: 'Intermediate',
    reason: 'Good schemas, indexes and relationships keep backend apps fast and consistent.',
    practice: [
      'Design a normalized schema for an online store',
      'Add indexes and compare query speed',
      'Write a migration that adds a new table',
    ],
  },
  'backend-framework': {
    id: 'backend-framework',
    name: 'Backend Framework',
    shortName: 'Framework',
    hours: 25,
    difficulty: 'Intermediate',
    reason: 'Frameworks like Django, FastAPI or Express give you routing, validation and structure out of the box.',
    practice: [
      'Build a notes REST API with FastAPI or Django',
      'Add request validation and error handling',
      'Connect your API to a database',
    ],
  },
  'data-cleaning': {
    id: 'data-cleaning',
    name: 'Data Cleaning',
    shortName: 'Data Cleaning',
    hours: 16,
    difficulty: 'Intermediate',
    reason: 'Real data is messy, and most analyst time is spent making it trustworthy.',
    practice: [
      'Handle missing values in a CSV with Pandas',
      'Fix inconsistent dates, names and categories',
      'Detect and treat outliers in sales data',
    ],
  },
  'power-bi': {
    id: 'power-bi',
    name: 'Power BI',
    shortName: 'Power BI',
    hours: 14,
    difficulty: 'Intermediate',
    reason: 'Power BI is one of the most requested tools in data analyst job listings.',
    practice: [
      'Import a dataset and build your first report',
      'Create measures with basic DAX',
      'Publish an interactive sales dashboard',
    ],
  },
  'data-preprocessing': {
    id: 'data-preprocessing',
    name: 'Data Preprocessing',
    shortName: 'Preprocessing',
    hours: 16,
    difficulty: 'Intermediate',
    reason: 'Models are only as good as their inputs, so scaling, encoding and splitting data matters.',
    practice: [
      'Encode categorical features for a model',
      'Scale features and compare model results',
      'Create train, validation and test splits',
    ],
  },
  'ai-fundamentals': {
    id: 'ai-fundamentals',
    name: 'AI Fundamentals',
    shortName: 'AI Basics',
    hours: 12,
    difficulty: 'Beginner',
    reason: 'Knowing how AI systems learn and where they fail helps you build with them responsibly.',
    practice: [
      'Explain supervised vs unsupervised learning with examples',
      'Try three AI tools and compare their strengths',
      'Write a short note on AI bias and safety',
    ],
  },
  'generative-ai': {
    id: 'generative-ai',
    name: 'Generative AI',
    shortName: 'GenAI',
    hours: 25,
    difficulty: 'Advanced',
    reason: 'Combining LLMs with retrieval and tools is how real GenAI products are built.',
    practice: [
      'Build a chat-with-your-notes app using embeddings',
      'Give a model a tool it can call',
      'Stream AI responses into a web UI',
    ],
  },
  sql: {
    id: 'sql',
    name: 'SQL Fundamentals',
    shortName: 'SQL',
    hours: 16,
    difficulty: 'Beginner',
    reason: 'Almost every company stores data in relational databases queried with SQL.',
    practice: [
      'Write SELECT queries with filters and sorting',
      'Join two tables to answer a business question',
      'Design a small schema for a library system',
    ],
  },
  nodejs: {
    id: 'nodejs',
    name: 'Node.js & Express',
    shortName: 'Node.js',
    hours: 25,
    difficulty: 'Intermediate',
    reason: 'Node.js lets you use JavaScript on the server to build fast APIs.',
    practice: [
      'Create a REST API for notes',
      'Add request validation and error handling',
      'Connect your API to a database',
    ],
  },
  auth: {
    id: 'auth',
    name: 'Authentication & Security',
    shortName: 'Auth',
    hours: 12,
    difficulty: 'Advanced',
    reason: 'Protecting user data is a core responsibility of every backend developer.',
    practice: [
      'Implement email and password sign-up',
      'Hash passwords and protect private routes',
      'Add rate limiting to a login endpoint',
    ],
  },
  'backend-projects': {
    id: 'backend-projects',
    name: 'Backend Projects',
    shortName: 'Projects',
    hours: 40,
    difficulty: 'Advanced',
    reason: 'Deployed APIs with real users show you can build production-ready systems.',
    practice: [
      'Build a URL shortener with analytics',
      'Create a blog API with auth and comments',
      'Deploy your API and document it',
    ],
  },
  excel: {
    id: 'excel',
    name: 'Excel & Spreadsheets',
    shortName: 'Excel',
    hours: 10,
    difficulty: 'Beginner',
    reason: 'Spreadsheets are the everyday tool of analysts and a fast way to explore data.',
    practice: [
      'Clean a messy sales dataset',
      'Build a pivot table summary',
      'Create a simple KPI dashboard',
    ],
  },
  statistics: {
    id: 'statistics',
    name: 'Statistics for Data',
    shortName: 'Statistics',
    hours: 20,
    difficulty: 'Intermediate',
    reason: 'Statistics helps you draw honest, reliable conclusions from data.',
    practice: [
      'Calculate mean, median and spread of a dataset',
      'Run a simple A/B test analysis',
      'Explain correlation vs causation with an example',
    ],
  },
  pandas: {
    id: 'pandas',
    name: 'Pandas & NumPy',
    shortName: 'Pandas',
    hours: 20,
    difficulty: 'Intermediate',
    reason: 'Pandas is the standard Python toolkit for cleaning and analyzing data.',
    practice: [
      'Load a CSV and explore it with Pandas',
      'Group and aggregate sales by region',
      'Handle missing values and outliers',
    ],
  },
  'data-viz': {
    id: 'data-viz',
    name: 'Data Visualization',
    shortName: 'Data Viz',
    hours: 14,
    difficulty: 'Intermediate',
    reason: 'Clear charts are how analysts communicate insights to decision makers.',
    practice: [
      'Recreate a chart from a news article',
      'Build an interactive dashboard',
      'Tell a story with three charts',
    ],
  },
  'data-projects': {
    id: 'data-projects',
    name: 'Data Analysis Projects',
    shortName: 'Projects',
    hours: 35,
    difficulty: 'Advanced',
    reason: 'End-to-end case studies are the strongest proof of your analysis skills.',
    practice: [
      'Analyze a public dataset end-to-end',
      'Write a findings report with recommendations',
      'Publish a notebook portfolio',
    ],
  },
  'ml-math': {
    id: 'ml-math',
    name: 'Mathematics for ML',
    shortName: 'Mathematics',
    hours: 25,
    difficulty: 'Intermediate',
    reason: 'Linear algebra, calculus and probability explain how models actually learn.',
    practice: [
      'Implement vector and matrix operations in Python',
      'Visualize gradient descent on a simple function',
      'Compute probabilities from a real dataset',
    ],
  },
  'ml-basics': {
    id: 'ml-basics',
    name: 'Machine Learning',
    shortName: 'Machine Learning',
    hours: 35,
    difficulty: 'Intermediate',
    reason: 'Core algorithms like regression and decision trees are the base of every ML role.',
    practice: [
      'Train a linear regression model on house prices',
      'Build a spam classifier with scikit-learn',
      'Evaluate models with cross-validation',
    ],
  },
  'deep-learning': {
    id: 'deep-learning',
    name: 'Deep Learning',
    shortName: 'Deep Learning',
    hours: 45,
    difficulty: 'Advanced',
    reason: 'Neural networks power modern vision, language and recommendation systems.',
    practice: [
      'Train a digit classifier on MNIST',
      'Fine-tune a pretrained image model',
      'Track experiments and compare results',
    ],
  },
  'ml-projects': {
    id: 'ml-projects',
    name: 'ML Projects & Deployment',
    shortName: 'Projects',
    hours: 40,
    difficulty: 'Advanced',
    reason: 'Deployed models show you can take ML from a notebook to the real world.',
    practice: [
      'Deploy a model behind a simple API',
      'Build a recommendation system demo',
      'Write a model card for your project',
    ],
  },
  'llm-basics': {
    id: 'llm-basics',
    name: 'LLM Fundamentals',
    shortName: 'LLMs',
    hours: 15,
    difficulty: 'Intermediate',
    reason: 'Understanding tokens, context and model behavior is the base of GenAI development.',
    practice: [
      'Compare outputs from different models',
      'Experiment with temperature and context length',
      'Summarize long documents with an LLM',
    ],
  },
  'prompt-engineering': {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    shortName: 'Prompting',
    hours: 8,
    difficulty: 'Beginner',
    reason: 'Good prompts dramatically improve the quality and reliability of AI output.',
    practice: [
      'Write few-shot prompts for classification',
      'Get structured JSON output from a model',
      'Build a prompt test set and score results',
    ],
  },
  rag: {
    id: 'rag',
    name: 'RAG & Embeddings',
    shortName: 'RAG',
    hours: 20,
    difficulty: 'Advanced',
    reason: 'Retrieval lets AI apps answer questions using your own documents.',
    practice: [
      'Embed a set of documents and search them',
      'Build a chat-with-your-notes app',
      'Evaluate answer quality with citations',
    ],
  },
  'ai-agents': {
    id: 'ai-agents',
    name: 'AI Agents & Tools',
    shortName: 'Agents',
    hours: 20,
    difficulty: 'Advanced',
    reason: 'Agents that call tools can complete multi-step tasks on their own.',
    practice: [
      'Give a model a calculator tool',
      'Build an agent that searches and summarizes',
      'Add guardrails and step limits',
    ],
  },
  'genai-projects': {
    id: 'genai-projects',
    name: 'AI Projects',
    shortName: 'Projects',
    hours: 40,
    difficulty: 'Advanced',
    reason: 'Shipped AI products show employers you can build real GenAI experiences.',
    practice: [
      'Ship an AI study assistant',
      'Build a document Q&A app for a niche',
      'Deploy and gather feedback from real users',
    ],
  },
}

export const CAREER_GOALS: CareerGoal[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    description: 'Build beautiful, interactive user interfaces for the web.',
    roadmap: ['html', 'css', 'javascript', 'git', 'react', 'apis', 'frontend-projects'],
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    description: 'Design APIs, databases and the systems that power apps.',
    roadmap: ['python', 'programming-fundamentals', 'sql', 'databases', 'apis', 'backend-framework', 'backend-projects'],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description: 'Turn raw data into insights that drive decisions.',
    roadmap: ['python', 'sql', 'statistics', 'data-cleaning', 'data-viz', 'power-bi', 'data-projects'],
  },
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    description: 'Train, evaluate and deploy machine learning models.',
    roadmap: ['python', 'ml-math', 'statistics', 'data-preprocessing', 'ml-basics', 'deep-learning', 'ml-projects'],
  },
  {
    id: 'genai',
    name: 'Generative AI Developer',
    description: 'Build apps powered by large language models.',
    roadmap: ['python', 'ai-fundamentals', 'ml-basics', 'prompt-engineering', 'llm-basics', 'generative-ai', 'genai-projects'],
  },
]

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const
export type Level = (typeof LEVELS)[number]

export const PREFERENCES = [
  { id: 'videos', label: 'Videos' },
  { id: 'notes', label: 'Notes' },
  { id: 'practice', label: 'Practice' },
  { id: 'projects', label: 'Projects' },
  { id: 'combination', label: 'Combination' },
] as const
export type Preference = (typeof PREFERENCES)[number]['id']

export const SELECTABLE_SKILLS = ['html', 'css', 'javascript', 'python', 'java', 'sql', 'react', 'ml-basics', 'git'] as const
