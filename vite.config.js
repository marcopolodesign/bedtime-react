import react from '@vitejs/plugin-react'
import dotenvExpand from 'dotenv-expand';
import { loadEnv, defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  dotenvExpand.expand({ parsed: env });

  return {
    plugins: [
      react()
    ],
    define: {
      'process.env': process.env,
    }
  }
  
});
