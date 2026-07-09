export interface StarterProfile {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
  status: 'active' | 'inactive';
}
