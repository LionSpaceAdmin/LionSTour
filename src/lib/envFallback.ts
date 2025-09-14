// Map Vercel env vars that may have been set with a custom prefix
// to the standard names our app expects. Runs on server only.

const mappings: Record<string, string[]> = {
  DATABASE_URL: [
    'LIOnSdata_DATABASE_URL',
    'LIOnSdata_POSTGRES_URL',
    'LIOnSdata_DATABASE_URL_UNPOOLED',
    'LIOnSdata_POSTGRES_PRISMA_URL',
    'LIOnSdata_POSTGRES_URL_NON_POOLING',
  ],
  ADMIN_API_TOKEN: ['LIOnSdata_STACK_SECRET_SERVER_KEY'],
};

for (const [target, sources] of Object.entries(mappings)) {
  if (!process.env[target]) {
    for (const src of sources) {
      const val = process.env[src];
      if (val && typeof val === 'string' && val.trim().length > 0) {
        process.env[target] = val;
        break;
      }
    }
  }
}

