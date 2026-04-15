import React from 'react';
import { getRecipeById, fotoUrl } from '../../data/recipes';
import { useFavorites } from '../../hooks/useFavorites';
import type { RobotStep } from '../../types/recipe';
import type { NavigateFn } from '../../types/navigation';

interface RecipeDetailProps {
  recipeId: string;
  onNavigate: NavigateFn;
  onBack: () => void;
}

const Tag = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: '28px', display: 'flex', alignItems: 'center', padding: '0 12px', backgroundColor: 'rgba(0, 43, 32, 0.08)', borderRadius: '16px', whiteSpace: 'nowrap' }}>
    <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '14px', fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>{children}</span>
  </div>
);

const RobotCard = ({ robot }: { robot: RobotStep }) => (
  <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(0, 43, 32, 0.08)', borderRadius: '12px', overflow: 'hidden', marginTop: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 16px', gap: '8px', borderBottom: '1px solid rgba(0, 43, 32, 0.04)' }}>
      <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/61febf73-41af-4705-86a9-4099947c8582.svg" alt="Bot" style={{ width: '15px', height: '15px' }} />
      <span style={{ color: 'rgba(0, 122, 75, 1)', fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Robot</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {[
        { label: 'Función', value: robot.funcion },
        { label: 'Velocidad', value: robot.velocidad },
        { label: 'Temp.', value: robot.temperatura != null ? `${robot.temperatura}°C` : '—' },
        { label: 'Tiempo', value: robot.tiempo },
      ].map((item, idx) => (
        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 4px', gap: '4px' }}>
          <span style={{ color: 'rgba(0, 43, 32, 0.5)', fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500 }}>{item.label}</span>
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const sectionHeading: React.CSSProperties = {
  margin: 0, paddingBottom: '8px', borderBottom: '1px solid rgba(0, 43, 32, 0.08)',
  color: 'rgba(0, 122, 75, 1)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif',
  fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase',
};

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipeId, onNavigate }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const recipe = getRecipeById(recipeId);

  if (!recipe) return (
    <div style={{ maxWidth: '402px', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <p style={{ color: 'rgba(0, 43, 32, 0.5)', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Receta no encontrada.</p>
    </div>
  );

  const fav = isFavorite(recipe.id);
  const heroUrl = fotoUrl(recipe.foto);
  const totalTime = recipe.tiempo_preparacion + recipe.tiempo_coccion;

  return (
    <div style={{ width: '100%', maxWidth: '402px', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(247, 246, 243, 1) 0%, rgba(255, 255, 255, 1) 100%)', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>

        {/* Hero image */}
        <figure style={{ margin: 0, height: '320px', position: 'relative', backgroundImage: heroUrl ? `url("${heroUrl}")` : undefined, backgroundColor: 'rgba(0, 43, 32, 0.08)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <button onClick={() => toggleFavorite(recipe.id)} aria-label="Añadir a favoritos" style={{ position: 'absolute', right: '16px', top: '16px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: fav ? 'rgba(251, 44, 54, 0.1)' : 'rgba(0, 43, 32, 0.08)', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)', transition: 'all 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <img src={fav ? 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg' : 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg'} alt="Favorito" style={{ width: '20px', height: '20px' }} />
          </button>
        </figure>

        <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Title + metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <h1 style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '32px', fontFamily: '"Source Serif 4", serif', fontWeight: 400, lineHeight: '1.1', letterSpacing: '-0.64px', flex: 1 }}>{recipe.nombre}</h1>
              <button onClick={() => toggleFavorite(recipe.id)} style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: fav ? 'rgba(251, 44, 54, 0.08)' : 'rgba(0, 43, 32, 0.08)', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                <img src={fav ? 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/890158fe-9d68-438c-8989-fb89e5ce901e.svg' : 'https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/e3efc88f-6939-47c7-b386-8c5203c1f81b.svg'} alt="Heart" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/7503dcf6-14a6-41c7-9acc-7e07a2829b79.svg" alt="" style={{ width: '18px', height: '18px' }} />
                <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{recipe.dificultad}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/64092e9b-ff89-4c52-8426-1ae9c2d6325b.svg" alt="" style={{ width: '18px', height: '18px' }} />
                <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{totalTime} min</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}>
                <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/9ba5ac0b-dc5e-4583-893a-ab08ff0f3a6f.svg" alt="" style={{ width: '18px', height: '18px' }} />
                <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '15px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{recipe.porciones}</span>
              </div>
            </div>
          </div>

          {/* Accesorios */}
          {recipe.accesorios.length > 0 && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={sectionHeading}>Accesorios</h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {recipe.accesorios.map((acc, i) => <Tag key={i}>{acc.charAt(0).toUpperCase() + acc.slice(1)}</Tag>)}
              </div>
            </section>
          )}

          {/* Ingredientes */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={sectionHeading}>Ingredientes</h2>
            {recipe.ingredientes.map((section, i) => (
              <div key={i}>
                {recipe.ingredientes.length > 1 && (
                  <p style={{ margin: '0 0 8px', color: 'rgba(0, 43, 32, 0.6)', fontSize: '13px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{section.seccion}</p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {section.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: j < section.items.length - 1 ? '1px solid rgba(0, 43, 32, 0.04)' : 'none' }}>
                      <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{item.nombre}</span>
                      {item.cantidad != null && (
                        <span style={{ color: 'rgba(0, 43, 32, 0.5)', fontSize: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600 }}>{item.cantidad} {item.unidad ?? ''}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Preparación */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={sectionHeading}>Preparación</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {recipe.pasos.map((paso, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(0, 43, 32, 1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '16px', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '1.4' }}>{paso.instruccion}</p>
                  {paso.robot && <RobotCard robot={paso.robot} />}
                </div>
              ))}
            </div>
          </section>

          {/* Notas */}
          {recipe.notas && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={sectionHeading}>Notas</h2>
              <div style={{ padding: '16px', backgroundColor: 'rgba(0, 43, 32, 0.04)', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: 'rgba(0, 43, 32, 1)', fontSize: '16px', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '1.4' }}>💡 {recipe.notas}</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Nav */}
      <nav style={{ height: '83px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 24px 24px', gap: '27px', backgroundColor: 'rgba(255, 255, 255, 1)', borderTop: '1px solid rgba(0, 43, 32, 0.08)', zIndex: 10 }}>
        <button onClick={() => onNavigate('home')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/ca5e5f96-078f-4d9e-b2a6-fbf2f89aa0bb.svg" alt="Recetario" style={{ width: '24px', height: '24px' }} />
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, letterSpacing: '0.12px' }}>Recetario</span>
        </button>
        <button onClick={() => onNavigate('search')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/4c65dcba-4c6a-4f4d-98dd-76a281b26c6e.svg" alt="Buscar" style={{ width: '24px', height: '24px' }} />
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, letterSpacing: '0.12px' }}>Buscar</span>
        </button>
        <button onClick={() => onNavigate('favorites')} style={{ width: '64px', height: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/365500010911109120/figma-assets/cc8e7be0-8a94-4c3e-a3cd-6b967636b40b.svg" alt="Favoritas" style={{ width: '24px', height: '24px' }} />
          <span style={{ color: 'rgba(0, 43, 32, 1)', fontSize: '10px', fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, letterSpacing: '0.12px' }}>Favoritas</span>
        </button>
      </nav>
    </div>
  );
};
