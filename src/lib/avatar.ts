export function getAvatarUrl(seed: string | number): string {
  if (!seed) return `https://api.dicebear.com/7.x/bottts/svg?seed=default`;
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
}
