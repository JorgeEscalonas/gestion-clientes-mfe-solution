# Gestión de Clientes - Microfrontend

Este es un microfrontend desarrollado con Angular 17+ que forma parte de una plataforma de gestión de negocios. Este módulo se encarga específicamente de la gestión de clientes, permitiendo listar, crear, editar y eliminar información de clientes.

## Características

- Listado de clientes
- Creación de nuevos clientes
- Edición de clientes existentes
- Validación de formularios
- Interfaz responsiva con Angular Material
- Pruebas unitarias y de integración

## Requisitos Previos

- Node.js 18+
- npm 9+ o yarn 1.22+
- Angular CLI 17+

## Instalación

### Requisitos previos
- Node.js 18 o superior
- npm 9+ o yarn 1.22+
- Angular CLI 17+
- Git

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd apex-workspace
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```
   O si prefieres usar Yarn:
   ```bash
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   ng serve customers-mfe
   ```
   O para un puerto específico:
   ```bash
   ng serve customers-mfe --port 4200
   ```

4. **Iniciar el servidor JSON para la API simulada** (en otra terminal):
   ```bash
   json-server --watch db.json --port 3000
   ```
   Esto iniciará un servidor JSON en `http://localhost:3000`

5. **Acceder a la aplicación**
   Abre tu navegador en [http://localhost:4200](http://localhost:4200)

### Configuración de entorno

El proyecto incluye los siguientes entornos:
- `development`: Configuración para desarrollo local
- `production`: Configuración optimizada para producción

Para construir para producción:
```bash
ng build customers-mfe --configuration=production
```

## Estructura del Proyecto

```
projects/
  customers-mfe/         # Microfrontend de gestión de clientes
    src/
      app/
        customers/       # Módulo de clientes
          components/    # Componentes de la aplicación
          models/        # Interfaces y modelos de datos
          services/      # Servicios para la gestión de clientes
        shared/          # Componentes y servicios compartidos
```

## Ejecución de Pruebas

### Pruebas Unitarias
```bash
ng test customers-mfe
```

### Pruebas de Integración
```bash
ng test customers-mfe --include=**/*.integration.spec.ts
```

## Decisiones Técnicas

### Arquitectura
- **Arquitectura de Microfrontends**: 
  - Implementado con Module Federation de Webpack para permitir el despliegue independiente de módulos.
  - Cada funcionalidad principal está aislada en su propio módulo para mejor mantenibilidad.
  - Comunicación entre microfrontends a través de un bus de eventos personalizado.

- **Componentes Autónomos (Standalone)**:
  - Uso de componentes independientes para reducir la complejidad y mejorar el rendimiento.
  - Mejor aislamiento y reutilización de código.
  - Carga perezosa (lazy loading) de módulos para optimizar el tiempo de carga inicial.

- **Programación Reactiva con RxJS**:
  - Uso intensivo de Observables para manejo de flujos de datos asíncronos.
  - Operadores RxJS para transformar y combinar flujos de datos.
  - Manejo automático de la limpieza de suscripciones.

### Gestión de Estado
- **Señales Reactivas de Angular**:
  - Para el manejo de estado local en componentes.
  - Actualizaciones eficientes de la UI con detección de cambios optimizada.

- **Servicios Reactivos**:
  - Patrón de servicios con BehaviorSubject para el manejo de estado compartido.
  - Inyección de dependencias jerárquica para compartir estado entre componentes.

### Interfaz de Usuario
- **Angular Material**:
  - Componentes UI consistentes siguiendo las Material Design Guidelines.
  - Diseño responsivo que funciona en dispositivos móviles y de escritorio.

- **Formularios Reactivos**:
  - Validación síncrona y asíncrona.
  - Controles personalizados y validadores reutilizables.
  - Manejo de formularios dinámicos.

### Rendimiento
- **Estrategia de Cambio de Detección OnPush** para optimizar el rendimiento.
- **Precarga de módulos** para mejorar la experiencia del usuario.
- **Lazy Loading** de rutas para reducir el bundle inicial.

### Pruebas
- **Pruebas unitarias** con Jasmine y Karma.
- **Pruebas de integración** para componentes clave.
- **Mocks** para servicios externos y dependencias.

### Estructura del Código
- **Estructura modular** siguiendo el patrón de carpetas por funcionalidad.
- **Interfaces fuertemente tipadas** para mejor mantenibilidad.
- **Documentación en línea** con comentarios JSDoc.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
