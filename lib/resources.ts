export type Resource = {
  title: string
  channel: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  url: string
  description: string
}

// Add more skills here using the skill id from lib/skillpath-data.ts as the key.
export const RESOURCES: Record<string, Resource[]> = {
  html: [
    {
      title: 'HTML Full Course - Build a Website Tutorial',
      channel: 'freeCodeCamp.org',
      duration: '2h 02m',
      level: 'Beginner',
      url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
      description: 'Learn the basics of HTML5 and web development by building a simple website.',
    },
    {
      title: 'HTML & CSS Full Course - Beginner to Pro',
      channel: 'SuperSimpleDev',
      duration: '6h 31m',
      level: 'Beginner',
      url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
      description: 'A project-based course that rebuilds YouTube’s layout step by step.',
    },
    {
      title: 'HTML Tutorial for Beginners: HTML Crash Course',
      channel: 'Programming with Mosh',
      duration: '1h 00m',
      level: 'Beginner',
      url: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
      description: 'A fast, clear crash course covering the essential HTML concepts.',
    },
    {
      title: 'HTML Full Course for Free',
      channel: 'Bro Code',
      duration: '1h 07m',
      level: 'Beginner',
      url: 'https://www.youtube.com/watch?v=HD13eq_Pmp8',
      description: 'Short, practical lessons on tags, links, images, tables and forms.',
    },
  ],
}

export function getResources(skillId: string): Resource[] {
  return RESOURCES[skillId] ?? []
}

export function youtubeSearchUrl(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${query} full course`)}`
}
