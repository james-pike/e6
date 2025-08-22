import { routeAction$ } from '@builder.io/qwik-city';
import * as mammoth from 'mammoth'; // ✅ Fix heres
import TurndownService from 'turndown';

export const useUploadNewsletterAction = routeAction$(async (_, { request }) => {
  const formData = await request.formData();
  const file = formData.get('doc') as File;

  if (!file) {
    return { success: false, error: 'No file uploaded' };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Convert DOCX to HTML
    const { value: html } = await mammoth.convertToHtml({ buffer });

    // Convert HTML to Markdown
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);

    return { success: true, markdown };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});
