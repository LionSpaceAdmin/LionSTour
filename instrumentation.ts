import { registerOTel } from '@vercel/otel';

export function register() {
  // Avoid dev crashes related to reading Next build manifests in development.
  if (process.env.NODE_ENV !== 'production') return;
  registerOTel({ serviceName: 'lionstour' });
}
