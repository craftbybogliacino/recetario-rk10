import React, { useState } from 'react';
import { recipes, fotoUrl, CATEGORY_META, HOME_CATEGORIES, getRecipesByCategory } from '../../data/recipes';
import { useFavorites } from '../../hooks/useFavorites';
import type { NavigateFn } from '../../types/navigation';

const HEART_ACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg';
const HEART_INACTIVE = 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg';

interface CategoryCardProps {
  emoji: string;
  title: string;
  recipeCount: number;
  onClick: () => void;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ emoji, title, recipeCount, onClick }) => {
  return <button onClick={onClick} style={{
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    gap: '12px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
    flex: '1 1 0',
    minWidth: '0',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    appearance: 'none'
  }} onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '1px 4px 15px rgba(0, 0, 0, 0.08)';
  }} onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '1px 2px 10px rgba(0, 0, 0, 0.05)';
  }}>
    <span style={{ fontSize: '26px', lineHeight: '31.5px' }}>{emoji}</span>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', width: '100%' }}>{title}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', textAlign: 'center' }}>{recipeCount} recetas</span>
    </div>
  </button>;
};

interface RecipeCardProps {
  image: string;
  title: string;
  time: string;
  servings: number;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}
const RecipeCard: React.FC<RecipeCardProps> = ({ image, title, time, servings, isFavorited, onToggleFavorite, onClick }) => {
  return <div style={{
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 1.00) 0%, rgba(245, 244, 240, 1.00) 100%)',
    boxSizing: 'border-box',
    boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
    flex: '1 1 0',
    minWidth: '0',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }} onClick={onClick} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    <figure style={{ height: '101.8125px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', alignSelf: 'stretch', position: 'relative', margin: 0, backgroundImage: image ? `url("${image}")` : undefined, backgroundColor: 'rgba(0, 43, 32, 0.06)' }}>
      <button onClick={e => { e.stopPropagation(); onToggleFavorite(); }} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isFavorited ? 'rgba(0, 122, 75, 0.15)' : 'rgba(0, 43, 32, 0.08)', border: 'none', borderRadius: '50%', position: 'absolute', right: '8.5px', top: '8px', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
        <img src={isFavorited ? HEART_ACTIVE : HEART_INACTIVE} alt="Favorito" style={{ width: '20px', height: '20px' }} />
      </button>
    </figure>
    <div style={{ width: '100%', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '18.9px', letterSpacing: '-0.2px', textAlign: 'center', alignSelf: 'stretch', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</span>
      <span style={{ color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '15.1px', letterSpacing: '-0.076px', textAlign: 'center', display: 'block' }}>{time} - {servings} porciones</span>
    </div>
  </div>;
};

export const RecipeBook: React.FC<{ onNavigate: NavigateFn }> = ({ onNavigate }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const categories = HOME_CATEGORIES.map(id => ({
    id,
    emoji: CATEGORY_META[id]?.emoji ?? '🍽️',
    title: CATEGORY_META[id]?.label ?? id,
    recipeCount: getRecipesByCategory(id).length,
  }));

  const recentRecipes = recipes.slice(0, 10);

  return <div style={{ maxWidth: '402px', width: '100%', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(235, 232, 224, 1.00) 0%, rgba(255, 255, 255, 1.00) 100%)', boxSizing: 'border-box', overflow: 'hidden', position: 'relative' }}>
    <main style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflowY: 'auto', flexGrow: 1, alignSelf: 'stretch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style dangerouslySetInnerHTML={{ __html: 'main::-webkit-scrollbar { display: none; }' }} />

      {/* Header */}
      <header style={{ height: 'auto', display: 'flex', flexDirection: 'column', padding: '80px 16px 0', gap: '8px', boxSizing: 'border-box', flexShrink: 0, alignSelf: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', alignSelf: 'stretch' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(180deg, rgba(0, 31, 23, 1.00) 0%, rgba(0, 122, 75, 1.00) 100%)', boxShadow: '1px 2px 20px rgba(0, 0, 0, 0.05)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/61ec86f0-1be4-46d2-8f00-c468c8b1a3a7.svg" alt="Robot Icon" style={{ width: '32px', height: '32px', position: 'absolute', left: '12px', top: '12px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px', alignSelf: 'stretch' }}>
            <h1 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '35.2px', letterSpacing: '-0.64px', textAlign: 'center' }}>Recetario RK10</h1>
            <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', opacity: 0.5, fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '17.6px', letterSpacing: '-0.076px', textAlign: 'center', alignSelf: 'stretch' }}>Nuestras recetas de siempre</p>
          </div>
        </div>
      </header>

      {/* Categorías */}
      <section style={{ padding: '32px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => onNavigate('categories')}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/f6896c9a-8121-4383-aabc-ccda9bcfae83.svg" alt="Icon" style={{ width: '24px', height: '24px' }} />
          <h2 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '18px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '30px', letterSpacing: '0px' }}>Categorías</h2>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/1d027bce-cfa5-4e3d-9394-e560963ef153.svg" alt="Arrow" style={{ width: '24px', height: '24px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {categories.map(cat => <CategoryCard key={cat.id} emoji={cat.emoji} title={cat.title} recipeCount={cat.recipeCount} onClick={() => onNavigate('categories')} />)}
        </div>
      </section>

      {/* Recientes */}
      <section style={{ padding: '32px 16px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => onNavigate('recent')}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/18244c77-e559-4fb7-91f6-60b30b10ccfb.svg" alt="Clock" style={{ width: '24px', height: '24px' }} />
          <h2 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '18px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, lineHeight: '30px', letterSpacing: '0px' }}>Recientes</h2>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/560514bf-652c-4451-8bf8-3bc0dcf61301.svg" alt="Arrow" style={{ width: '24px', height: '24px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {recentRecipes.map(recipe => <RecipeCard key={recipe.id} image={fotoUrl(recipe.foto)} title={recipe.nombre} time={`${recipe.tiempo_preparacion + recipe.tiempo_coccion} min`} servings={recipe.porciones} isFavorited={isFavorite(recipe.id)} onToggleFavorite={() => toggleFavorite(recipe.id)} onClick={() => onNavigate('recipe-detail', { recipeId: recipe.id })} />)}
        </div>
      </section>
    </main>

    {/* Navigation */}
    <nav style={{ width: '100%', height: '83px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '12px 27px 24px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', boxSizing: 'border-box', zIndex: 10 }}>
      <button style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s ease' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ca5e5f96-078f-4d9e-b2a6-fbf2f89aa0bb.svg" alt="Recetario" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 122, 75, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px', letterSpacing: '0.117px' }}>Recetario</span>
      </button>
      <button onClick={() => onNavigate('search')} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s ease' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/4c65dcba-4c6a-4f4d-98dd-76a281b26c6e.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px', letterSpacing: '0.117px' }}>Buscar</span>
      </button>
      <button onClick={() => onNavigate('favorites')} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.5, transition: 'opacity 0.2s ease' }}>
        <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/cc8e7be0-8a94-4c3e-a3cd-6b967636b40b.svg" alt="Favoritas" style={{ width: '24px', height: '24px' }} />
        <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, lineHeight: '12.5px', letterSpacing: '0.117px' }}>Favoritas</span>
      </button>
    </nav>
  </div>;
};
