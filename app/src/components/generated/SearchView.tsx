import React, { useState } from 'react';
import { searchRecipes, fotoUrl } from '../../data/recipes';
import { useFavorites } from '../../hooks/useFavorites';
import type { NavigateFn } from '../../types/navigation';

const HEART_ACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg';
const HEART_INACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg';

const RECENT_SEARCHES = ['Carne paleta', 'Cebolla', 'Morrón'];

const RecipeCard: React.FC<{ image: string; title: string; subtitle: string; isFavorited: boolean; onToggle: () => void; onClick: () => void }> = ({ image, title, subtitle, isFavorited, onToggle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(255, 255, 255, 1.00) 0%, rgba(245, 244, 240, 1.00) 100%)', boxSizing: 'border-box', boxShadow: isHovered ? '1px 4px 15px rgba(0, 0, 0, 0.1)' : '1px 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '12px', overflow: 'hidden', flexGrow: 1, flexShrink: 1, flexBasis: '0', minWidth: '0', cursor: 'pointer', transition: 'transform 0.2s ease', transform: isHovered ? 'translateY(-2px)' : 'none' }} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <figure style={{ height: '101.8125px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', alignSelf: 'stretch', position: 'relative', backgroundImage: image ? `url("${image}")` : undefined, backgroundColor: 'rgba(0, 43, 32, 0.06)', margin: 0 }}>
      <button onClick={e => { e.stopPropagation(); onToggle(); }} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isFavorited ? 'rgba(0, 122, 75, 0.15)' : 'rgba(0, 43, 32, 0.08)', border: 'none', borderRadius: '50%', position: 'absolute', right: '8px', top: '8px', cursor: 'pointer', transition: 'background-color 0.2s ease' }} aria-label={isFavorited ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
        <img src={isFavorited ? HEART_ACTIVE : HEART_INACTIVE} alt="Heart" style={{ width: '20px', height: '20px' }} />
      </button>
    </figure>
    <div style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', alignSelf: 'stretch', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', letterSpacing: '-0.076px', textAlign: 'center' }}>{subtitle}</span>
    </div>
  </div>;
};

export const SearchView: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const results = query.trim().length > 1 ? searchRecipes(query) : [];
  const hasQuery = query.trim().length > 0;

  return <div style={{ width: '100%', maxWidth: '402px', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(235, 232, 224, 1.00) 0%, rgba(255, 255, 255, 1.00) 100%)', boxSizing: 'border-box', overflow: 'hidden', position: 'relative', margin: '0 auto' }}>

    {/* Header */}
    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', padding: '80px 16px 0 16px', gap: '20px', boxSizing: 'border-box', flexShrink: 0, alignSelf: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/0e103a44-fdfb-4828-891d-0c1d7e1feae5.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
        <h1 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '35.2px', letterSpacing: '-0.64px' }}>Buscar</h1>
      </div>
    </div>

    {/* Scrollable content */}
    <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 16px 16px 16px', gap: '12px', flexGrow: 1, minHeight: '0', overflowY: 'auto', boxSizing: 'border-box' }}>

      {/* Search input */}
      <div style={{ height: '56px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 16px', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: isInputFocused ? 'rgba(0, 43, 32, 0.4)' : 'rgba(0, 43, 32, 0.12)', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', borderRadius: '56px', alignSelf: 'stretch', flexShrink: 0, transition: 'border-color 0.2s ease' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/12561c7f-c515-41da-864f-69cc2b913418.svg" alt="" style={{ width: '20px', height: '20px' }} />
        <input type="text" placeholder="Buscar por nombre" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)} style={{ border: 'none', outline: 'none', width: '100%', color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Inter", sans-serif', fontWeight: 400, backgroundColor: 'transparent' }} />
        {query && <button onClick={() => setQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/72dd1ed3-d097-4935-ad87-73c4a1771325.svg" alt="Borrar" style={{ width: '24px', height: '24px' }} />
        </button>}
      </div>

      {/* Empty state: recent searches */}
      {!hasQuery && <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 0', gap: '4px' }}>
        <div style={{ padding: '8px 0' }}>
          <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '17.6px' }}>Recientes</span>
        </div>
        {RECENT_SEARCHES.map(term => <button key={term} onClick={() => setQuery(term)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', alignSelf: 'stretch' }}>
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '17.6px' }}>{term}</span>
        </button>)}
      </div>}

      {/* Results */}
      {hasQuery && <>
        <div style={{ padding: '12px 0' }}>
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '17.6px' }}>
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
          </span>
        </div>
        {results.length > 0
          ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', flexShrink: 0, alignSelf: 'stretch' }}>
            {results.map(recipe => <RecipeCard key={recipe.id} image={fotoUrl(recipe.foto)} title={recipe.nombre} subtitle={`${recipe.tiempo_preparacion + recipe.tiempo_coccion} min - ${recipe.porciones} porciones`} isFavorited={isFavorite(recipe.id)} onToggle={() => toggleFavorite(recipe.id)} onClick={() => onNavigate('recipe-detail', { recipeId: recipe.id })} />)}
          </div>
          : <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>
            <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Sin resultados para "{query}"</p>
          </div>}
      </>}
    </div>

    {/* Nav */}
    <nav style={{ width: '100%', height: '83px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 0 24px', gap: '27px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', boxSizing: 'border-box' }}>
      <button onClick={() => onNavigate('home')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5 }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ca5e5f96-078f-4d9e-b2a6-fbf2f89aa0bb.svg" alt="Recetario" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Recetario</span>
      </button>
      <button style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/4c65dcba-4c6a-4f4d-98dd-76a281b26c6e.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 122, 75, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Buscar</span>
      </button>
      <button onClick={() => onNavigate('favorites')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5 }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/cc8e7be0-8a94-4c3e-a3cd-6b967636b40b.svg" alt="Favoritas" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Favoritas</span>
      </button>
    </nav>
  </div>;
};
