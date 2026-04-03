import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjfxlscjknipsdvcehax.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZnhsc2Nqa25pcHNkdmNlaGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTIwMjc3OCwiZXhwIjoyMDkwNzc4Nzc4fQ.p3x4g3FphohEJk9ShuHp6bMFy_t6_4w6z0i5iURGeLc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: number
  title: string
  category: string
  year: string
  tags: string[]
  color: string
  gradient: string
  accent: string
  description: string
  size: 'small' | 'medium' | 'large'
  order_index: number
}

export interface SocialLink {
  id: number
  name: string
  handle: string
  href: string
  icon: string
  color: string
  order_index: number
}

export interface SkillCategory {
  id: number
  name: string
  color: string
  tools: { name: string; level: number }[]
}

export interface SiteInfo {
  id: number
  hero_title: string
  hero_subtitle: string
  about_text: string
  availability_text: string
  location: string
  languages: string
}