const images = import.meta.glob('/src/assets/images/**/*', { eager: true, import: 'default' });
const gifs = import.meta.glob('/src/assets/gifs/**/*', { eager: true, import: 'default' });
const sounds = import.meta.glob('/src/assets/sounds/**/*', { eager: true, import: 'default' });

export const getImagePath = (path: string): string => {
  const cleanPath = path.replace(/^(assets\/images\/|images\/)/, '');
  const key = `/src/assets/images/${cleanPath}`;
  return (images[key] as string) || '';
};

export const getGifPath = (name: string): string => {
  const cleanName = name.replace(/^(assets\/gifs\/|gifs\/)/, '').replace(/\.gif$/, '');
  const key = `/src/assets/gifs/${cleanName}.gif`;
  return (gifs[key] as string) || '';
};

export const getSoundPath = (name: string): HTMLAudioElement => {
  const cleanName = name.replace(/^(assets\/sounds\/|sounds\/)/, '').replace(/\.wav$/, '');
  const key = `/src/assets/sounds/${cleanName}.wav`;
  const src = (sounds[key] as string) || '';
  return new Audio(src);
};
