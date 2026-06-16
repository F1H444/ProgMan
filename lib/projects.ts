import { supabase } from './supabase';

export interface Project {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  tech: string[];
  image: string;
  longImages?: string[]; // Array of long vertical screenshots for gallery
  size?: string;
}

// Static fallback data
const staticProjects: Project[] = [
  {
    id: 1,
    slug: "website-bromotrail",
    title: "Website Bromotrail",
    category: "Pemrograman Web",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind", "Framer-Motion"],
    image: "/hero/bromotrail-hero.png",
    longImages: ["/all/bromotrail-all.jpeg"],
  },
  {
    id: 2,
    slug: "website-mumu-kitchen",
    title: "Website Mumu Kitchen",
    category: "Pemrograman Web",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind", "Framer-Motion"],
    image: "/hero/mumu-hero.png",
  },
  {
    id: 3,
    slug: "website-sbytickets",
    title: "Website SbyTickets",
    category: "Pemrograman Web",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind", "Framer-Motion"],
    image: "/hero/sbytickets-hero.png",
    longImages: ["/all/sbytickets-all.jpeg"],
  },
  {
    id: 4,
    slug: "website-sikalori",
    title: "Website Sikalori",
    category: "Pemrograman Web",
    tech: ["Next.js", "React", "Tailwind", "Framer-Motion"],
    image: "/hero/sikalori-hero.png",
    longImages: ["/all/sikalori-all.jpeg"],
  },
  {
    id: 5,
    slug: "website-befresh",
    title: "Website Befresh",
    category: "Pemrograman Web",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind", "Framer-Motion"],
    image: "/hero/befresh-hero.png",
    longImages: ["/all/befresh-all.jpeg"],
  },
];

// Fetch projects from Supabase, fallback to static
export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log('Using static projects fallback');
      return staticProjects;
    }

    return data.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      tech: p.tech || [],
      image: p.image,
      longImages: p.long_images || undefined,
      size: p.size || 'small',
    }));
  } catch (error: any) {
    console.log('Using static projects fallback due to error:', error.message);
    return staticProjects;
  }
}

// Fetch single project by slug from Supabase
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (error) {
      // Fallback to static
      const staticProject = staticProjects.find(p => p.slug === slug);
      return staticProject || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      category: data.category,
      tech: data.tech || [],
      image: data.image,
      longImages: data.long_images || undefined,
      size: data.size || 'small',
    };
  } catch (error: any) {
    console.log('Using static project fallback due to error:', error.message);
    const staticProject = staticProjects.find(p => p.slug === slug);
    return staticProject || null;
  }
}

// Keep static export for backward compatibility during transition
export const projects: Project[] = staticProjects;
