import { useState } from 'react';
import { RecipeBook } from './components/generated/RecipeBook';
import { CategoryBrowser } from './components/generated/CategoryBrowser';
import { RecentlyCooked } from './components/generated/RecentlyCooked';
import { SearchView } from './components/generated/SearchView';
import { FavoritesGrid } from './components/generated/FavoritesGrid';
import { RecipeDetail } from './components/generated/RecipeDetail';
import type { NavigateFn, Screen } from './types/navigation';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [recipeId, setRecipeId] = useState<string | null>(null);
  const [prevScreen, setPrevScreen] = useState<Screen>('home');

  const navigate: NavigateFn = (next, params) => {
    setPrevScreen(screen);
    if (params?.recipeId) setRecipeId(params.recipeId);
    setScreen(next);
  };

  const goBack = () => setScreen(prevScreen);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {screen === 'home' && <RecipeBook onNavigate={navigate} />}
      {screen === 'categories' && <CategoryBrowser onNavigate={navigate} onBack={goBack} />}
      {screen === 'recent' && <RecentlyCooked onNavigate={navigate} onBack={goBack} />}
      {screen === 'search' && <SearchView onNavigate={navigate} />}
      {screen === 'favorites' && <FavoritesGrid onNavigate={navigate} />}
      {screen === 'recipe-detail' && recipeId && (
        <RecipeDetail recipeId={recipeId} onNavigate={navigate} onBack={goBack} />
      )}
    </div>
  );
}

export default App;
