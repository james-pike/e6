import { routeAction$, zod$, z } from '@builder.io/qwik-city';

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

      // Validate file size (e.g., 2MB limit for base64 storage)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        return { success: false, error: 'File size must be less than 2MB' };
      }

      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64String}`;

      // Store in database (you can create a separate table for images if needed)
      // For now, we'll return the data URL directly
      // In a production app, you might want to store this in a separate images table
      
      return { 
        success: true, 
        url: dataUrl,
        filename: file.name,
        type: file.type
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