// ─── Project Types ───────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  featured: boolean;
  category: string;
  tags: string[];
  shortDesc: string;
  longDesc: string;
  tech: string[];
  live: string;
  github: string | null;
  image: string;
}

// ─── Skill Types ─────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface SkillsData {
  wordpress: SkillCategory;
  frontend: SkillCategory;
  seo: SkillCategory;
  tools: SkillCategory;
  other: SkillCategory;
  [key: string]: SkillCategory;
}

// ─── Experience Types ────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Freelance';
  description: string;
  highlights: string[];
}

// ─── Education Types ─────────────────────────────────────────────────────────

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'Completed' | 'In Progress' | 'Dropped';
  description: string;
  highlights: string[];
}

// ─── Contact Types ───────────────────────────────────────────────────────────

export type ContactSubject =
  | 'Job Opportunity'
  | 'Project Inquiry'
  | 'General'
  | 'SEO Consultation'
  | 'WordPress Support';

export interface ContactFormData {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Stat Types ──────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}
