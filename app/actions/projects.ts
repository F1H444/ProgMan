'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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

// 6. Upload image action (saves to Supabase Storage)
export async function uploadProjectImageAction(file: File, folder: string = 'hero'): Promise<{ url: string | null; error: string | null }> {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const supabaseAdmin = (await import('@/lib/supabase-admin')).supabaseAdmin;
    
    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop() || 'png';
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${sanitizedName}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    if (!supabaseAdmin) {
      // Fallback: upload to public folder (only works in local/dev)
      console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using local storage (not compatible with production)');
      
      // Try local upload only in non-production
      if (process.env.NODE_ENV !== 'production') {
        try {
          const { mkdir, writeFile } = await import('fs/promises');
          const { join } = await import('path');
          const publicPath = join(process.cwd(), 'public', 'uploads', folder);
          await mkdir(publicPath, { recursive: true });
          const localFilePath = join(publicPath, fileName);
          await writeFile(localFilePath, buffer);
          return { url: `/uploads/${folder}/${fileName}`, error: null };
        } catch (fsError: any) {
          console.error('Local upload failed:', fsError);
        }
      }
      
      return { url: null, error: 'Storage configuration required for production. Set SUPABASE_SERVICE_ROLE_KEY.' };
    }

    const { data, error } = await supabaseAdmin.storage
      .from('project-images')
      .upload(filePath, buffer, {
        contentType: file.type || 'image/png',
        cacheControl: '3600',
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return { url: publicUrlData?.publicUrl || null, error: null };
  } catch (error: any) {
    console.error('Upload error:', error);
    return { url: null, error: error.message || 'Gagal mengupload gambar' };
  }
}
