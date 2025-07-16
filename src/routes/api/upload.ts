import { routeAction$, zod$, z } from '@builder.io/qwik-city';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const useUploadImage = routeAction$(
  async (data, event) => {
    try {
      const formData = await event.request.formData();
      const file = formData.get('image') as File;
      
      if (!file) {
        return { success: false, error: 'No file provided' };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return { success: false, error: 'File must be an image' };
      }

      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { success: false, error: 'File size must be less than 5MB' };
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `workshop-${timestamp}.${extension}`;
      const filepath = join(uploadsDir, filename);

      // Convert file to buffer and save
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Return the public URL
      const publicUrl = `/uploads/${filename}`;
      
      return { 
        success: true, 
        url: publicUrl,
        filename: filename 
      };
    } catch (error) {
      console.error('Upload error:', error);
      return { 
        success: false, 
        error: 'Failed to upload file' 
      };
    }
  },
  zod$({
    image: z.any(), // File validation handled manually
  })
); 