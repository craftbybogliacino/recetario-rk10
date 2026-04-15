import React, { useState } from 'react';
import { recipes, fotoUrl } from '../../data/recipes';
import { useFavorites } from '../../hooks/useFavorites';
import type { NavigateFn } from '../../types/navigation';

const HEART_ACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg';
const HEART_INACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg';

interface RecentlyCookedProps {
  onNavigate: NavigateFn;
  onBack: () => void;
}

const RecipeCard: React.FC<{ image: string; title: string; details: string; isFavorite: boolean; onToggle: () => void; onClick: () => void }> = ({ image, title, details, isFavorite, onToggle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(180deg, rgba(255, 255, 255, 1.00) 0%, rgba(245, 244, 240, 1.00) 100%)', boxSizing: 'border-box', boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '12px', overflow: 'hidden', flexGrow: 1, flexShrink: 1, flexBasis: '0', minWidth: '0', transition: 'transform 0.2s ease', transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', cursor: 'pointer' }} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <figure style={{ height: '101.8125px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', boxSizing: 'border-box', alignSelf: 'stretch', minWidth: '0', position: 'relative', backgroundImage: image ? `url("${image}")` : undefined, backgroundColor: 'rgba(0, 43, 32, 0.06)', margin: 0 }}>
      <button onClick={e => { e.stopPropagation(); onToggle(); }} aria-label="Añadir a favoritos" style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: isFavorite ? 'rgba(0, 122, 75, 0.15)' : 'rgba(0, 43, 32, 0.08)', border: 'none', boxSizing: 'border-box', borderRadius: '50%', position: 'absolute', right: '8px', top: '8px', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
        <img src={isFavorite ? HEART_ACTIVE : HEART_INACTIVE} alt="Heart" style={{ width: '20px', height: '20px' }} />
      </button>
    </figure>
    <div style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', alignSelf: 'stretch', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', letterSpacing: '-0.076px', textAlign: 'center', display: 'block' }}>{details}</span>
    </div>
  </div>;
};

export const RecentlyCooked: React.FC<RecentlyCookedProps> = ({ onNavigate, onBack }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return <div style={{ width: '100%', maxWidth: '402px', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(235, 232, 224, 1.00) 0%, rgba(255, 255, 255, 1.00) 100%)', boxSizing: 'border-box', overflow: 'hidden', position: 'relative', margin: '0 auto' }}>
    <main style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'auto', flexGrow: 1, flexShrink: 1, flexBasis: '0', minHeight: '0', alignSelf: 'stretch' }}>
      <header style={{ height: 'auto', display: 'flex', flexDirection: 'column', padding: '80px 16px 0 16px', gap: '20px', boxSizing: 'border-box', flexShrink: 0, alignSelf: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', boxSizing: 'border-box', alignSelf: 'stretch' }}>
          <button onClick={onBack} aria-label="Volver" style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 43, 32, 0.08)', border: 'none', borderRadius: '50%', cursor: 'pointer', transition: 'background-color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 43, 32, 0.12)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0, 43, 32, 0.08)'}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/230d546e-500b-4d67-9618-fd98d32d57d7.svg" alt="Volver" style={{ width: '20px', height: '20px' }} />
          </button>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/fe44f7be-e6af-4a3c-81e9-61360f20e2ee.svg" alt="Reloj" style={{ width: '24px', height: '24px' }} />
            <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '35.2px', letterSpacing: '-0.64px' }}>Recientes</span>
          </div>
          <div style={{ width: '40px', height: '40px' }} />
        </div>
      </header>

      <section style={{ padding: '32px 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {recipes.map(recipe => <RecipeCard key={recipe.id} image={fotoUrl(recipe.foto)} title={recipe.nombre} details={`${recipe.tiempo_preparacion + recipe.tiempo_coccion} min - ${recipe.porciones} porciones`} isFavorite={isFavorite(recipe.id)} onToggle={() => toggleFavorite(recipe.id)} onClick={() => onNavigate('recipe-detail', { recipeId: recipe.id })} />)}
        </div>
      </section>
    </main>

    <nav style={{ width: '100%', height: '83px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: '12px', paddingBottom: '24px', gap: '27px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', boxSizing: 'border-box' }}>
      <button onClick={() => onNavigate('home')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ca5e5f96-078f-4d9e-b2a6-fbf2f89aa0bb.svg" alt="Recetario" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 122, 75, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px' }}>Recetario</span>
      </button>
      <button onClick={() => onNavigate('search')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/4c65dcba-4c6a-4f4d-98dd-76a281b26c6e.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px' }}>Buscar</span>
      </button>
      <button onClick={() => onNavigate('favorites')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/cc8e7be0-8a94-4c3e-a3cd-6b967636b40b.svg" alt="Favoritas" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px' }}>Favoritas</span>
      </button>
    </nav>
  </div>;
};
