// Environment configuration for LionSTour
export const config = {
  // Project Info
  projectId: 'prj_n6SFiKNhA4whUjyXNNw8Nvtu54H8',
  projectName: 'lionstour',
  
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/lionstour'
  },
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRole: process.env.SUPABASE_SERVICE_ROLE || ''
  },
  
  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
  },
  
  // AI Services
  ai: {
    openaiKey: process.env.OPENAI_API_KEY || 'sk-test-placeholder'
  },
  
  // Maps
  mapbox: {
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.test_placeholder'
  },
  
  // Admin
  admin: {
    token: process.env.ADMIN_API_TOKEN || 'dev-admin-token'
  }
}

export default config