# 📑 Guía de Instalación y Estructura del frontend - Proyecto OmniHub

#### Estructura Raíz del Proyecto
Creamos la carpeta principal que contendrá tanto el Frontend como el Backend:

**Esta carpeta es la que va contener la carpeta  `server` y `client`**
```bash
mkdir omniHub
cd omniHub
```

#### 1. Preparación del Entorno
Primero, instalamos el CLI de Ionic de forma global para poder usar sus comandos en cualquier carpeta:

```bash
npm i -g @ionic/cli
```

#### 2. Creación del Cliente (App Web Híbrida)
Una vez ya estando dentro `omniHub` Ejecutamos el generador de Ionic para crear la interfaz:
```bash
ionic start client
```
- `ionic start`: Es para crear y inicializar un proyecto de ionic
- `client`: Es el nombre de la carpeta en donde se va crear el proyecto

**Configuración durante la instalación:**
1. Framework: Seleccionar `React`.

2. Plantilla (Template): Seleccionar `Tabs`.

3. Proceso: El CLI descargará las dependencias (el tiempo depende de la velocidad de internet y de la laptop).

4. Cuenta Ionic: Cuando pregunte "Create free account?", presionar `N` (No).

**💡 Nota:**
Si ya habías creado la carpeta `client` manualmente y estás dentro de ella, puedes saltarte las preguntas con:
```bash
ionic start . tabs --type=react
```

#### 3. Despues de que termine la instalción:
Instalamos la sig. dependencias que se van a usar 
```bash
cd client
npm install axios
npm install @capacitor/geolocation
npm install leaflet @react-leaflet
npm install @paypal/react-paypal-js
```
- `axios`: Comunicación con el servidor Node.js y Express.
- `@capacitor/geolocation`: Acceso al GPS del dispositivo.
- `leaflet @react-leaflet`: Renderizado de mapas interactivos.
- `@paypal/react-paypal-js`: Integración nativa de botones de pago.


**Para iniciar el frontend:**
```bash
ionic serve
```