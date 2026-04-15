import type { Recipe } from '../types/recipe';
// @ts-ignore – virtual module injected by vite-recipes plugin
import { recipes as raw } from 'virtual:recipes';

export const recipes: Recipe[] = raw;

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}

export function getRecipesByCategory(cat: string): Recipe[] {
  return recipes.filter(r => r.category === cat);
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return recipes.filter(
    r =>
      r.nombre.toLowerCase().includes(q) ||
      r.ingredientes.some(s => s.items.some(i => i.nombre.toLowerCase().includes(q)))
  );
}

export function fotoUrl(foto: string): string {
  if (!foto) return '';
  return `${import.meta.env.BASE_URL}fotos/${foto}`;
}

export const CATEGORY_META: Record<string, { emoji: string; label: string }> = {
  entradas: { emoji: '🥗', label: 'Entradas' },
  principales: { emoji: '🍽️', label: 'Platos principales' },
  'pastas-y-arroces': { emoji: '🍝', label: 'Pastas y Arroces' },
  vegetarianos: { emoji: '🥦', label: 'Vegetarianos' },
  'panes-y-masas': { emoji: '🍞', label: 'Panes y masas' },
  'sopas-y-caldos': { emoji: '🥣', label: 'Sopas y caldos' },
  'salsas-y-aderezos': { emoji: '🍯', label: 'Salsas y aderezos' },
  postres: { emoji: '🍰', label: 'Postres' },
  bebidas: { emoji: '🍹', label: 'Bebidas' },
  'dulces-y-conservas': { emoji: '🥫', label: 'Dulces y conservas' },
  fermentados: { emoji: '🍶', label: 'Fermentados' },
  snacks: { emoji: '🥨', label: 'Snacks' },
  'al-vapor': { emoji: '🥟', label: 'Al vapor' },
  'guisos-y-estofados': { emoji: '🥘', label: 'Guisos y estofados' },
};

// The 6 categories shown on the home screen
export const HOME_CATEGORIES = [
  'entradas',
  'principales',
  'panes-y-masas',
  'sopas-y-caldos',
  'al-vapor',
  'guisos-y-estofados',
];

// All 14 categories in display order
export const ALL_CATEGORIES = Object.keys(CATEGORY_META);
