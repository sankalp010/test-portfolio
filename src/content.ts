export type IconName = 'code' | 'briefcase' | 'layers' | 'sparkles' | 'graduation' | 'flask' | 'github' | 'arrow' | 'sun' | 'moon' | 'external' | 'menu' | 'close' | 'terminal' | 'globe' | 'database' | 'server'

export const portfolio = {
  name: 'Sankalp Shrivastava',
  firstName: 'Sankalp',
  handle: 'sankalp010',
  location: 'Bengaluru, India',
  headline: 'Software engineer · AI / ML engineering focus',
  intro: 'I build useful, dependable products across the stack. I’m now channeling that product engineering experience toward AI and machine learning engineering.',
  github: 'https://github.com/sankalp010',
  email: '',
  availability: 'Open to AI / ML engineering opportunities',
  navigation: [
    { id: 'stack', label: 'Stack', icon: 'code' as const },
    { id: 'experience', label: 'Experience', icon: 'briefcase' as const },
    { id: 'builds', label: 'Builds', icon: 'layers' as const },
    { id: 'dev-moments', label: 'Dev moments', icon: 'sparkles' as const },
    { id: 'education', label: 'Education', icon: 'graduation' as const },
    { id: 'poc', label: 'Proof of concept', icon: 'flask' as const },
  ],
  stack: [
    { category: 'Languages', items: ['JavaScript', 'Python', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Vite', 'Material UI', 'HTML', 'CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Flask', 'REST APIs'] },
    { category: 'Data & services', items: ['MongoDB', 'SQLite', 'Firebase', 'CoinGecko API'] },
    { category: 'Tools & deployment', items: ['Git', 'Railway', 'npm'] },
  ],
  experience: [] as { role: string; company: string; period: string; description: string; tags: string[] }[],
  builds: [
    {
      title: 'Bit Tracker',
      category: 'Data-driven web app',
      description: 'A cryptocurrency dashboard built with React and Vite, using CoinGecko for market data and Firebase for app services.',
      tags: ['React', 'Vite', 'Material UI', 'CoinGecko', 'Firebase'],
      links: [{ label: 'GitHub profile', href: 'https://github.com/sankalp010', icon: 'github' as const }],
      accent: 'mint',
    },
    {
      title: 'MERA BHARAT',
      category: 'Full-stack community product',
      description: 'A travel community for sharing stories and photographs, discovering destinations, and connecting with other travelers.',
      tags: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'],
      links: [{ label: 'Source code', href: 'https://github.com/sankalp010/MERA-BHARAT', icon: 'github' as const }],
      accent: 'blue',
    },
    {
      title: 'Expenses',
      category: 'Personal finance app',
      description: 'A rupee-based expense tracker with sign-in, expense management, summaries, category breakdowns, and date filters.',
      tags: ['Python', 'Flask', 'Jinja', 'SQLite'],
      links: [
        { label: 'Live app', href: 'https://expense-tracker-production-1bcb.up.railway.app', icon: 'external' as const },
        { label: 'GitHub source', href: 'https://github.com/sankalp010/expenses', icon: 'github' as const },
      ],
      accent: 'amber',
    },
  ],
  devMoments: [] as { title: string; description: string; link?: string }[],
  education: [] as { degree: string; school: string; period: string; detail?: string }[],
  poc: [] as { title: string; description: string; tags: string[] }[],
}

export type Portfolio = typeof portfolio
