# carlosmansillaweb

Sitio personal profesional de **Carlos Mansilla · Growth Performance**.
HTML + CSS + JS puro, sin dependencias ni build. Se publica directo con GitHub Pages.

## Estructura

```
index.html            Página completa
assets/css/styles.css Estilos
assets/js/main.js     Menú mobile, animaciones, formulario → WhatsApp y eventos de tracking
assets/img/           carlos.jpg (foto de perfil) y og.jpg (imagen al compartir el link)
```

## Pendientes antes de publicar

1. **Resultados en los casos**: en `index.html`, sección `#casos`, hay un comentario con el formato para agregar una métrica por caso.
2. **Tracking**: pegá el Meta Pixel y GA4 en el `<head>`. Los eventos `Contact`, `Lead` y `Schedule` ya están cableados en `main.js`.
3. **Email**: si tenés casilla con dominio propio, reemplazá `carlos.m.mansi@gmail.com` (aparece en el HTML y en el JSON-LD).

## Publicar con GitHub Pages

Settings → Pages → Source: `Deploy from a branch` → Branch `main` / `root` → Save.

Para usar `carlosmansilla.com.ar`: en la misma pantalla cargá el dominio en *Custom domain* (eso crea el archivo `CNAME`) y en tu proveedor de DNS apuntá:

- `A` @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `CNAME` www → cmmansigrowth.github.io
