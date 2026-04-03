# 🌌 Proyecto Invitación: La Fiesta Santa

Una aplicación web interactiva, inmersiva y de estilo *cyberpunk* creada para gestionar la invitación, confirmación de asistencia y la revelación condicionada de una locación secreta para un evento exclusivo.

## 🚀 Características Principales

- **Estética Inmersiva**: Cuenta con una interfaz rica con efecto oscuro/neón, banner LED desplazable, y fondos interactivos tridimensionales elaborados con Three.js y React Three Fiber.
- **DJs y Círculo Mágico**: Carrusel de personajes sobre un círculo animado responsivo.
- **Cuenta Regresiva Glitch**: Un contador de tiempo en vivo que cuando queda 1 hora o menos para el evento entra en "modo crítico" (color rojo vibrante, sombras de luz y un efecto glitch animado estilo alerta de sistema).
- **Control de Acceso (Guestlist)**: Los invitados deben registrarse o verificar su correo. El acceso a la locación está bloqueado por una validación estricta conectada a base de datos.
- **Revelación de Locación**: Una vez validado, se revela la dirección del evento apoyado por un mapa interactivo construido bajo la librería Leaflet validando la autenticidad del asistente.

## 💻 Tecnologías Utilizadas (Tech Stack)

El proyecto está construido sobre un stack moderno y enfocado en el alto rendimiento y efectos visuales de primera calidad:

* **Framework Base:** [Next.js 16](https://nextjs.org/) con [React 19](https://react.dev/).
* **Estilos y Animaciones:** [Tailwind CSS v4](https://tailwindcss.com/) (para utilidades y diseño responsivo) acoplado a [Framer Motion](https://www.framer.com/motion/) para transiciones orgánicas.
* **Base de Datos & Backend:** [Supabase](https://supabase.com/) en conjunto con el ORM de [Prisma](https://www.prisma.io/) y adaptador Postgres.
* **Efectos y 3D:** 
  * `three`, `@react-three/fiber`, y `@react-three/drei` (Elementos de entorno y renderizado 3D).
  * `@tsparticles/react` (Efectos de micropartículas).
* **Mapas:** `leaflet` y `react-leaflet` para visualización del punto clave de reunión.

## 📁 Estructura Principal del Proyecto

- `src/app/` - Rutas principales de Next.js (App Router), incluyendo el Landing Page (`page.tsx`), la página de bloqueo y visuales de `locacion`.
- `src/components/` - Componentes React limpios y reusables agrupados por funcionalidad:
  - `Countdown.tsx` (Contador de evento con efecto glitch).
  - `Djcarousel.tsx` (Carrusel y expositor rotativo de artistas/DJs).
  - `RegisterModal.tsx` & `LocationButton.tsx` (Interacción con base de datos y botones de Call to Action principales).
  - `background/` - Componentes decorativos base como humo interactivo y `Circulo.tsx`.

## ⚙️ Requisitos y Ejecución Local

1. Instalar las dependencias instaladas en el repositorio:
   ```bash
   npm install
   ```

2. Configurar variables de entorno(`.env.local` / `.env`):
   Asegúrate de agregar tus credenciales correspondientes a tu clúster de base de datos Postgres (Supabase):
   ```env
   DATABASE_URL="postgres://tu_database_url_aqui"
   NEXT_PUBLIC_SUPABASE_URL="https://tu_supabase_id.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_supabase_key_secreta"
   ```

3. Aplicar esquemas de Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación debería empezar a servir vistas locales a través del puerto configurado por defecto (normalmente `http://localhost:3000`).

## 👨‍💻 Acerca del Desarrollo

El ecosistema actual hace hincapié en el concepto UX priorizando una identidad de "Wow Factor" lograda con superposiciones de capas z-index visuales, mezclas por pantalla (mix-blend-screen) y la evasión completa de frameworks de componentes estáticos aburridos.
