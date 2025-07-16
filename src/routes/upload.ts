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

      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { success: false, error: 'File size must be less than 5MB' };
      }

      // Convert file to base64 for storage
      const bytes = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(bytes)));
      const dataUrl = `data:${file.type};base64,${base64}`;
      
      // For now, return the data URL
      // In production, you'd upload to a service like Cloudinary, S3, etc.
      return { 
        success: true, 
        url: dataUrl,
        filename: file.name 
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