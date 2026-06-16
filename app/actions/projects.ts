'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export interface Project {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  tech: string[];
  image: string;
  long_images?: string[] | null;
  description?: string | null;
  size?: string | null;
  created_at?: string;
  updated_at?: string;
}

// 1. Fetch all projects
export async function getProjectsAction(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// 2. Fetch single project by ID
export async function getProjectByIdAction(id: string | number): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .limit(1)
      .single();

    if (error) throw error;
    return data as Project;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
}

// 3. Create project
export async function createProjectAction(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        slug: project.slug,
        title: project.title,
        category: project.category,
        tech: project.tech,
        image: project.image,
        long_images: project.long_images || null,
        description: project.description || null,
        size: project.size || 'small',
      })
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/work');
    revalidatePath('/');
    return data as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

// 4. Update project
export async function updateProjectAction(id: string | number, project: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        slug: project.slug,
        title: project.title,
        category: project.category,
        tech: project.tech,
        image: project.image,
        long_images: project.long_images || null,
        description: project.description || null,
        size: project.size || 'small',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath('/work');
    revalidatePath(`/work/${project.slug}`);
    revalidatePath('/');
    return data as Project;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

// 5. Delete project
export async function deleteProjectAction(id: string | number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/work');
    revalidatePath('/');
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}

// 6. Upload image action (saves locally to public/uploads)
export async function uploadProjectImageAction(file: File, folder: string = 'hero'): Promise<{ url: string | null; error: string | null }> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const fileExt = file.name.split('.').pop() || 'png';
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${sanitizedName}.${fileExt}`;

    // Target path in public directory: public/uploads/hero or public/uploads/gallery
    const publicPath = join(process.cwd(), 'public', 'uploads', folder);
    
    // Ensure directory exists
    await mkdir(publicPath, { recursive: true });

    const filePath = join(publicPath, fileName);
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${folder}/${fileName}`;
    return { url: relativeUrl, error: null };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { url: null, error: error.message || 'Gagal mengupload gambar' };
  }
}
