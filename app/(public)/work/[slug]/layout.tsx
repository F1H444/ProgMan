import { Metadata } from 'next';
import { fetchProjectBySlug } from '@/lib/projects';

type Props = {
  // Di Next.js 15, params untuk generateMetadata harus dikonsumsi secara asinkron (sebagai Promise)
  params: Promise<{ slug: string }>;
};

// SEO Dinamis berdasarkan slug (Parameter URL)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return { title: 'Proyek Tidak Ditemukan | ProgMan' };
  }

  return {
    title: `${project.title} | ProgMan`,
    description: `Studi Kasus: ${project.title} - Kategori: ${project.category}. Solusi cerdas untuk bisnis digitalmu.`,
    openGraph: {
      title: project.title,
      description: `Lihat hasil proyek ${project.title} di ProgMan.`,
      images: [project.image],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  // Hanya me-render children yang berisi page.tsx (Client Component aslinya)
  return <>{children}</>;
}
