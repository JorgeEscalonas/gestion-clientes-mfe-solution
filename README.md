# Gestión de Clientes - Microfrontend

Este es un microfrontend desarrollado con Angular 17+ que forma parte de una plataforma de gestión de negocios. Este módulo se encarga específicamente de la gestión de clientes, permitiendo listar, crear y editar información de clientes.

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

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd apex-workspace
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Inicia el servidor JSON para la API simulada (en otra terminal):
   ```bash
   npm run server
   ```

5. Abre tu navegador en `http://localhost:4200`

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
- **Microfrontends**: Implementado con Module Federation para permitir el despliegue independiente.
- **Componentes Autónomos**: Uso de componentes independientes (standalone) para mejor encapsulamiento.
- **Programación Reactiva**: Uso de RxJS para manejo de flujos de datos asíncronos.

### Estado
- **Señales de Angular**: Uso de señales reactivas para el manejo de estado local en componentes.
- **Servicios Reactivos**: Patrón de servicios con Observables para el manejo de estado compartido.

### UI/UX
- **Angular Material**: Para componentes de interfaz de usuario consistentes y responsivos.
- **Formularios Reactivos**: Para validación y manejo de formularios.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
