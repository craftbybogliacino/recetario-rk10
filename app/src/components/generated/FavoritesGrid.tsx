import React, { useState } from 'react';
import { recipes, fotoUrl } from '../../data/recipes';
import { useFavorites } from '../../hooks/useFavorites';
import type { NavigateFn } from '../../types/navigation';

const HEART_ACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg';
const HEART_INACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg';

const RecipeCard: React.FC<{ image: string; title: string; info: string; isFav: boolean; onToggle: () => void; onClick: () => void }> = ({ image, title, info, isFav, onToggle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(255, 255, 255, 1.00) 0%, rgba(245, 244, 240, 1.00) 100%)', boxSizing: 'border-box', boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '12px', overflow: 'hidden', flexGrow: 1, flexShrink: 1, flexBasis: '0', minWidth: '0', cursor: 'pointer', transform: isHovered ? 'translateY(-2px)' : 'none', transition: 'transform 0.2s ease-in-out' }} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <figure style={{ height: '101.8125px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', alignSelf: 'stretch', position: 'relative', backgroundImage: image ? `url("${image}")` : undefined, backgroundColor: 'rgba(0, 43, 32, 0.06)', margin: 0 }}>
      <button aria-label="Quitar de favoritos" onClick={e => { e.stopPropagation(); onToggle(); }} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isFav ? 'rgba(251, 44, 54, 0.08)' : 'rgba(0, 43, 32, 0.08)', borderRadius: '50%', position: 'absolute', right: '8.5px', top: '8px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
        <img src={isFav ? HEART_ACTIVE : HEART_INACTIVE} alt="Heart" style={{ width: '20px', height: '20px' }} />
      </button>
    </figure>
    <div style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', alignSelf: 'stretch', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', letterSpacing: '-0.076px', textAlign: 'center' }}>{info}</span>
    </div>
  </div>;
};

export const FavoritesGrid: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return <div style={{ width: '100%', maxWidth: '402px', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(235, 232, 224, 1.00) 0%, rgba(255, 255, 255, 1.00) 100%)', boxSizing: 'border-box', overflow: 'hidden', position: 'relative', margin: '0 auto' }}>

    {/* Header */}
    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', padding: '80px 16px 0 16px', gap: '20px', boxSizing: 'border-box', flexShrink: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '40px' }} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/3af7108f-0721-427e-beda-157ceb28edc7.svg" alt="Favoritos" style={{ width: '21px', height: '18px' }} />
          <h1 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '35.2px', letterSpacing: '-0.64px' }}>Favoritos</h1>
        </div>
        <div style={{ width: '40px' }} />
      </div>
    </div>

    {/* Content */}
    <main style={{ display: 'flex', flexDirection: 'column', padding: '32px 16px 16px 16px', gap: '12px', flexGrow: 1, overflowY: 'auto', boxSizing: 'border-box' }}>
      {favoriteRecipes.length === 0
        ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '12px', opacity: 0.5 }}>
          <span style={{ fontSize: '48px' }}>♡</span>
          <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, textAlign: 'center' }}>Todavía no tenés favoritos.</p>
          <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: 'center' }}>Tocá el ♡ en cualquier receta para guardarla acá.</p>
        </div>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {favoriteRecipes.map(recipe => <RecipeCard key={recipe.id} image={fotoUrl(recipe.foto)} title={recipe.nombre} info={`${recipe.tiempo_preparacion + recipe.tiempo_coccion} min - ${recipe.porciones} porciones`} isFav={isFavorite(recipe.id)} onToggle={() => toggleFavorite(recipe.id)} onClick={() => onNavigate('recipe-detail', { recipeId: recipe.id })} />)}
        </div>}
    </main>

    {/* Nav */}
    <nav style={{ width: '100%', height: '83px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '12px', paddingBottom: '24px', gap: '27px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', boxSizing: 'border-box' }}>
      <button onClick={() => onNavigate('home')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ca5e5f96-078f-4d9e-b2a6-fbf2f89aa0bb.svg" alt="Recetario" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Recetario</span>
      </button>
      <button onClick={() => onNavigate('search')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/4c65dcba-4c6a-4f4d-98dd-76a281b26c6e.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Buscar</span>
      </button>
      <button style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/cc8e7be0-8a94-4c3e-a3cd-6b967636b40b.svg" alt="Favoritas" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 122, 75, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>Favoritas</span>
      </button>
    </nav>
  </div>;
};
