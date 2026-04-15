# Recetario RK10 — Documento de Planificación

> Proyecto personal de Fabian y Gaby  
> Objetivo: crear un recetario digital propio con recetas latinoamericanas, adaptadas al robot Total Chef RK10, alojado en GitHub y accesible como app web.

---

## 1. Contexto del proyecto

- **Robot:** Total Chef RK10 (Ufesa), con recetas incluidas orientadas al mercado español
- **Necesidad:** recetas latinoamericanas adaptadas al RK10, con posibilidad de agregar recetas propias
- **Solución planificada:** app web estática alojada en GitHub Pages, con recetas en formato JSON/Markdown, sin costo de hosting
- **Usuarios:** Fabian y Gaby
- **Organización de recetas:** por tipo de comida (entrada, principal, postre)

---

## 2. Arquitectura técnica (planificada)

```
Receta (texto, foto, idea)
    → Claude la formatea al esquema definido
    → se agrega al repositorio en GitHub
    → la app web la muestra automáticamente
```

- **Repositorio:** GitHub (control de versiones, gratuito)
- **Hosting:** GitHub Pages (gratuito)
- **Base de datos:** archivos JSON o Markdown en el repo
- **Costo total:** $0

---

## 3. Tabla de equivalencias: Thermomix TM6 → RK10

### 3.1 Especificaciones comparadas

| Parámetro | Thermomix TM6 | RK10 |
|---|---|---|
| Velocidades | Continuo 40–10.700 RPM | 0–12 + Turbo |
| Temperatura | 37°C – 120°C (alta temp. disponible en modo guiado) | 37°C – 130°C |
| Tiempo máximo | 12 horas (cocción lenta/sous vide) | 90 minutos (cocción manual) |
| Capacidad del vaso | 2,2 L | No especificada en manual |
| Báscula integrada | Sí (hasta 6 kg) | No (tiene vaso medidor de 30ml) |
| Pantalla | Táctil 6,8" con WiFi | Táctil 10" con WiFi |
| Giro inverso | Sí | Sí |

### 3.2 Equivalencia de velocidades

| Thermomix TM6 | Descripción | RK10 equivalente | Notas |
|---|---|---|---|
| Vel. 1–2 | Remover suave, calentar | Vel. 1–2 + Giro inverso | El inverso del RK10 es clave acá |
| Vel. 3–4 | Picar grueso, mezclar suave | Vel. 3–4 | Equivalente directo |
| Vel. 5–6 | Picar fino, mezclar | Vel. 5–6 | Equivalente directo |
| Vel. 7–8 | Triturar, moler | Vel. 8–10 | El TM6 tiene más RPM; compensar con +20–30% de tiempo |
| Vel. 9–10 | Triturar fino, pulverizar | Vel. 10–11 | Resultados similares |
| Turbo | Pulverizar instantáneo | Turbo | Equivalente directo |
| Espiga (amasar) | Modo especial para masas | Vel. 1–2 cíclico / Función Amasar | El RK10 tiene programa automático |

### 3.3 Equivalencia de temperaturas

| Thermomix TM6 | Uso típico | RK10 equivalente | Diferencia |
|---|---|---|---|
| 37°C | Fermentar, yogur, biberón | 37°C | ✅ Igual |
| 50–60°C | Derretir chocolate, manteca | 50–60°C | ✅ Igual |
| 80–90°C | Cremas, salsas delicadas | 80–90°C | ✅ Igual |
| 100°C | Hervir, cocción base | 100°C | ✅ Igual |
| 120°C | Sofreír, dorar | 120–130°C | El RK10 llega a 130°C — ventaja |
| Varoma (~115°C vapor) | Cocción al vapor | Función Vapor del RK10 | El RK10 tiene cesta vaporera de 2 niveles |

### 3.4 Equivalencia de funciones especiales

| Función Thermomix TM6 | ¿Existe en RK10? | Alternativa en RK10 |
|---|---|---|
| Varoma (vapor con temperatura precisa) | ✅ Sí — cesta de 2 niveles | Función vapor con agua en el vaso |
| Sous vide (vacío, 40–85°C hasta 12h) | ❌ No tiene | Sin equivalente directo — limitación real |
| Cocción lenta (hasta 12h) | ✅ Sí | Función Cocción lenta — equivalente directo |
| Fermentar (37–70°C) | ✅ Sí — temp. mínima 37°C | Equivalente funcional |
| Alta temperatura (caramelo, dorar) | ✅ Sí — llega a 130°C | Equivalente, incluso supera al TM6 |
| Espiga (masa) | ✅ Sí — función Amasar | Equivalente funcional |
| Picar/laminar con accesorio | ✅ Sí — procesador incluido | Equivalente con accesorio incluido |

### 3.5 Reglas de traducción al adaptar recetas

1. **Velocidades altas** — el TM6 llega a 10.700 RPM, el RK10 a vel. 12. Para triturados finos, usar velocidad máxima del RK10 y agregar 20–30% más de tiempo.
2. **Varoma** — se reemplaza con la cesta vaporera del RK10 con agua en el vaso a 100°C.
3. **Sous vide** — es la única función sin equivalente real. Adaptar a cocción lenta a temperatura baja, asumiendo resultados diferentes en textura.

---

## 4. Esquema de receta

### 4.1 Campos

**Cabecera**
- `nombre` — nombre de la receta
- `categoria` — entrada / principal / postre
- `dificultad` — fácil / media / difícil
- `tiempo_preparacion` — en minutos
- `tiempo_coccion` — en minutos
- `porciones` — número
- `foto` — URL o nombre de archivo de imagen

**Ingredientes**
- Lista de items con: `cantidad`, `unidad`, `nombre`
- Soporte para agrupar por sección (ej: "Masa", "Relleno")

**Accesorios**
- Lista simple de accesorios y utensilios necesarios (ej: cuchilla, espátula, budinera)

**Pasos**
- Cada paso tiene:
  - `instruccion` — texto libre para el cocinero
  - `robot` *(opcional)* — bloque estructurado con:
    - `funcion` — nombre de la función del RK10 (ej: Cocción manual, Amasar, Vapor)
    - `velocidad` — número del 1 al 12, Turbo, o Giro inverso
    - `temperatura` — en °C (o null si no aplica)
    - `tiempo` — en minutos y segundos

**Notas** *(opcional)*
- Texto libre con sugerencias o consejos del cocinero

### 4.2 Ejemplo de receta en JSON

```json
{
  "nombre": "Crema de zapallo",
  "categoria": "entrada",
  "dificultad": "fácil",
  "tiempo_preparacion": 10,
  "tiempo_coccion": 25,
  "porciones": 4,
  "foto": "crema-zapallo.jpg",
  "ingredientes": [
    {
      "seccion": "Principal",
      "items": [
        { "cantidad": 500, "unidad": "g", "nombre": "zapallo" },
        { "cantidad": 1, "unidad": "unidad", "nombre": "cebolla" },
        { "cantidad": 2, "unidad": "dientes", "nombre": "ajo" },
        { "cantidad": 500, "unidad": "ml", "nombre": "caldo de verduras" },
        { "cantidad": 2, "unidad": "cucharadas", "nombre": "aceite de oliva" },
        { "cantidad": null, "unidad": null, "nombre": "sal y pimienta a gusto" }
      ]
    }
  ],
  "accesorios": ["cuchilla", "espátula"],
  "pasos": [
    {
      "instruccion": "Pelar y cortar el zapallo en cubos. Pelar la cebolla y el ajo.",
      "robot": null
    },
    {
      "instruccion": "Sofreír la cebolla y el ajo con el aceite.",
      "robot": {
        "funcion": "Cocción manual",
        "velocidad": "1 (giro inverso)",
        "temperatura": 120,
        "tiempo": "5 min"
      }
    },
    {
      "instruccion": "Agregar el zapallo y el caldo. Cocinar hasta que el zapallo esté tierno.",
      "robot": {
        "funcion": "Cocción manual",
        "velocidad": "1 (giro inverso)",
        "temperatura": 100,
        "tiempo": "20 min"
      }
    },
    {
      "instruccion": "Triturar hasta obtener una crema suave.",
      "robot": {
        "funcion": "Cocción manual",
        "velocidad": "10",
        "temperatura": null,
        "tiempo": "1 min"
      }
    }
  ],
  "notas": "Se puede agregar crema de leche al final para una textura más rica."
}
```

---

## 5. Decisiones pendientes

- [x] Definir el esquema de campos de cada receta
- [x] Decidir formato de archivo: JSON
- [x] Definir flujo para agregar recetas nuevas
- [x] Crear repositorio en GitHub — https://github.com/craftbybogliacino/recetario-rk10
- [ ] Diseñar la app web

---

## 6. Fuentes de recetas

### 6.1 Flujo principal (v1)

**Roles**
- **Fabian** — agrega y gestiona recetas
- **Gaby** — usa la app web como consumidora

**Paso 1 — de la receta al JSON**
1. Fabian encuentra una receta (Cookidoo, iChef, libro, foto, memoria)
2. La pega o describe en el chat con Claude
3. Claude la devuelve en JSON, ya adaptada al RK10

**Paso 2 — del JSON al repo (desde el navegador)**
1. Entrar a github.com y navegar al repositorio
2. Ir a la carpeta de recetas
3. Crear archivo nuevo, pegar el JSON, nombrar el archivo (ej: `crema-zapallo.json`)
4. Click en "Commit changes" — la receta queda guardada y versionada

**Paso 3 — publicación automática**
1. GitHub Pages detecta el cambio automáticamente
2. La app web lee los archivos JSON del repo
3. La receta aparece en la app sin ningún paso adicional

**Ventajas:** sin dependencias externas, sin costo, sin mantenimiento, funciona con cualquier fuente.

### 6.2 Ideas para versiones futuras
- **mcp-cookidoo** — servidor MCP no oficial que permite conectar Cookidoo con una IA. Posibilita bajar recetas de Cookidoo por ID y procesarlas automáticamente. Requiere Python, servidor local, y suscripción activa de Cookidoo. Repo: https://github.com/alexandrepa/mcp-cookidoo
- **cookidoo-api** — librería Python base usada por mcp-cookidoo. Repo: https://github.com/miaucl/cookidoo-api
- **cookidoo-scraper** — REST API via scraping del sitio de Cookidoo. Repo: https://github.com/tobim-dev/cookidoo-scraper

---

## 7. Repositorio

- **URL:** https://github.com/craftbybogliacino/recetario-rk10
- **Hosting:** GitHub Pages (gratuito)

### Estructura de carpetas

```
recetario-rk10/
├── recetas/
│   ├── entradas/       ← archivos JSON de entradas
│   ├── principales/    ← archivos JSON de platos principales
│   └── postres/        ← archivos JSON de postres
├── fotos/              ← imágenes de las recetas
└── app/                ← código de la app web (pendiente)
```

---

## 8. App web

### 8.1 Características
- Mobile-first (uso principal desde celular en la cocina)
- Servida desde GitHub Pages
- Lee los archivos JSON del repositorio directamente
- Favoritos guardados en LocalStorage del celular

### 8.2 Pantallas
1. **Inicio / explorar** — lista de recetas por categoría + búsqueda por nombre
2. **Detalle de receta** — foto, tiempos, porciones, dificultad, ingredientes, pasos con bloques del robot, notas
3. **Favoritos** — recetas guardadas, acceso rápido desde la navegación

### 8.3 Categorías del recetario
```
recetas/entradas/
recetas/sopas-y-caldos/
recetas/principales/
recetas/pastas-y-arroces/
recetas/vegetarianos/
recetas/panes-y-masas/
recetas/salsas-y-aderezos/
recetas/postres/
recetas/dulces-y-conservas/
recetas/bebidas/
recetas/desayunos/
recetas/guisos-y-estofados/
recetas/al-vapor/
recetas/fermentados/
recetas/snacks/
```

### 8.4 Recetas cargadas (v1)
- `guiso-tipico-uruguayo.json` → principales
- `calzone-jamon-queso.json` → principales
- `pan-de-agua.json` → panes-y-masas
- `salchichon-de-chocolate.json` → postres

---

*Última actualización: abril 2026*