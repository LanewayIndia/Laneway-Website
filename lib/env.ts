let publicEnv: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  apiUrl: string;
  siteUrl: string;
  cloudinaryCloudName?: string;
} | null = null;

export async function getPublicEnv() {
  if (publicEnv) return publicEnv;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/api/public-env`, {
      cache: 'force-cache',
      next: { tags: ['public-env'] },
    });

    if (!res.ok) throw new Error('Failed to fetch public env');

    publicEnv = await res.json();
    return publicEnv;
  } catch (error) {
    console.error('Failed to load public env:', error);
    throw error;
  }
}
