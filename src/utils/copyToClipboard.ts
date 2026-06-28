import { success } from './toast';

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
  success('Copied to clipboard');
}
