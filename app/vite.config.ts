import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync, statSync, mkdirSync, copyFileSync } from 'fs';

function copyDir(src: string, dest: string) {
  try {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
      const s = path.join(src, entry);
      const d = path.join(dest, entry);
      statSync(s).isDirectory() ? copyDir(s, d) : copyFileSync(s, d);
    }
  } catch {}
}

function recipesPlugin() {
  const VIRTUAL_ID = 'virtual:recipes';
  const RESOLVED_ID = '\0' + VIRTUAL_ID;
  return {
    name: 'vite-recipes',
    resolveId(id: string) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id: string) {
      if (id !== RESOLVED_ID) return;
      const dir = path.resolve(__dirname, '../recetas');
      const data: unknown[] = [];
      try {
        for (const cat of readdirSync(dir)) {
          const catDir = path.join(dir, cat);
          if (!statSync(catDir).isDirectory()) continue;
          for (const file of readdirSync(catDir)) {
            if (!file.endsWith('.json')) continue;
            const recipe = JSON.parse(readFileSync(path.join(catDir, file), 'utf-8'));
            data.push({ ...recipe, id: file.slice(0, -5), slug: file.slice(0, -5), category: cat });
          }
        }
      } catch {}
      return `export const recipes = ${JSON.stringify(data)};`;
    },
    closeBundle() {
      const out = path.resolve(__dirname, '../docs');
      copyDir(path.resolve(__dirname, '../recetas'), path.join(out, 'recetas'));
      copyDir(path.resolve(__dirname, '../fotos'), path.join(out, 'fotos'));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/recetario-rk10/',
  plugins: [react(), tailwindcss(), recipesPlugin()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
  server: {
    fs: { allow: ['..'] },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
