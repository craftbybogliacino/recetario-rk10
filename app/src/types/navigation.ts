export type Screen =
  | 'home'
  | 'categories'
  | 'recent'
  | 'search'
  | 'favorites'
  | 'recipe-detail';

export type NavigateFn = (screen: Screen, params?: { recipeId?: string }) => void;
