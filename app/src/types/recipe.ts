export interface RobotStep {
  funcion: string;
  velocidad: string;
  temperatura: number | null;
  tiempo: string;
}

export interface RecipeStep {
  instruccion: string;
  robot?: RobotStep | null;
}

export interface IngredientItem {
  cantidad: number | null;
  unidad: string | null;
  nombre: string;
}

export interface IngredientSection {
  seccion: string;
  items: IngredientItem[];
}

export interface Recipe {
  id: string;
  slug: string;
  category: string;
  nombre: string;
  categoria: string;
  dificultad: string;
  tiempo_preparacion: number;
  tiempo_coccion: number;
  porciones: number;
  foto: string;
  ingredientes: IngredientSection[];
  accesorios: string[];
  pasos: RecipeStep[];
  notas?: string;
}
