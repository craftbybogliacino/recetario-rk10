import React, { useState } from 'react';
import { ALL_CATEGORIES, CATEGORY_META, getRecipesByCategory } from '../../data/recipes';
import type { NavigateFn } from '../../types/navigation';

interface CategoryBrowserProps {
  onNavigate: NavigateFn;
  onBack: () => void;
}

const CategoryCard: React.FC<{ emoji: string; label: string; count: number; onClick: () => void }> = ({ emoji, label, count, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', gap: '12px', backgroundColor: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(0, 43, 32, 0.05)', boxSizing: 'border-box', boxShadow: isHovered ? '0px 4px 20px rgba(0, 0, 0, 0.08)' : '1px 2px 10px rgba(0, 0, 0, 0.05)', borderRadius: '12px', overflow: 'hidden', flex: '1 1 0px', minWidth: '0', cursor: 'pointer', transition: 'all 0.2s ease-in-out', transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', outline: 'none' }}>
    <span style={{ fontSize: '26px', lineHeight: '31.5px' }}>{emoji}</span>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', alignSelf: 'stretch' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', alignSelf: 'stretch' }}>{label}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', textAlign: 'center' }}>{count} recetas</span>
    </div>
  </button>;
};

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onNavigate, onBack }) => {
  const categories = ALL_CATEGORIES.map(id => ({
    id,
    emoji: CATEGORY_META[id]?.emoji ?? '🍽️',
    label: CATEGORY_META[id]?.label ?? id,
    count: getRecipesByCategory(id).length,
  }));

  return <div style={{ width: '100%', maxWidth: '402px', height: '100vh', margin: '0 auto', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #EBE8E0 0%, #FFFFFF 100%)', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      <header style={{ padding: '80px 16px 0 16px', display: 'flex', flexDirection: 'column', gap: '20px', alignSelf: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 43, 32, 0.08)', borderRadius: '50%', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 43, 32, 0.12)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0, 43, 32, 0.08)'}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ddcf4b63-dcb2-4f4a-806f-4c87236102ae.svg" alt="Volver" style={{ width: '20px', height: '20px' }} />
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flex: 1 }}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/29c42aef-0a94-4cd6-bf01-b06a323693a6.svg" alt="Categorías" style={{ width: '24px', height: '24px' }} />
            <h1 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '35.2px', letterSpacing: '-0.64px' }}>Categorías</h1>
          </div>
          <div style={{ width: '40px' }} />
        </div>
      </header>

      <main style={{ padding: '32px 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {categories.map(cat => <CategoryCard key={cat.id} emoji={cat.emoji} label={cat.label} count={cat.count} onClick={() => onNavigate('home')} />)}
        </div>
        <div style={{ height: '16px' }} />
      </main>
    </div>

    <nav style={{ height: '83px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 27px 24px 27px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', zIndex: 10 }}>
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
