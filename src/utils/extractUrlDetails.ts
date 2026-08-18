import { formatDate } from './formatter';

export interface UrlDetails {
  url: string;
  filename: string;
  extension: string;
  uploadedAt: string;
}

export async function extractUrlDetails(url: string): Promise<UrlDetails> {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    const filename = response.headers.get('x-amz-meta-filename') ?? 'Unknown';
    const extension = response.headers.get('Content-Type')?.split('/')[1] ?? 'Unknown';
    const uploadedAt = response.headers.get('Last-Modified') ?? 'Unknown';

    return {
      url,
      filename,
      extension,
      uploadedAt: formatDate(uploadedAt),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching file metadata:', error);
    return {
      url,
      filename: 'Unknown',
      extension: 'Unknown',
      uploadedAt: 'Unknown',
    };
  }
}
