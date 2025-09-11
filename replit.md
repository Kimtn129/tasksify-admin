# Taskify - Vue.js Admin Panel

## Project Overview
This is a Vue.js 3 admin panel application imported from GitHub and configured for the Replit environment. The project uses modern web technologies including Vue 3 Composition API, Vite as the build tool, and a comprehensive shadcn/ui-inspired component library.

## Current Status
- **Environment**: Successfully configured for Replit
- **Server**: Running on port 5000 with proper host configuration (0.0.0.0)
- **Build System**: Vite configured and working
- **Dependencies**: All installed and functional
- **Deployment**: Configured for autoscale deployment

## Tech Stack
- **Frontend Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite (configured for Replit environment)
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Custom shadcn/ui-inspired component library
- **State Management**: Pinia
- **Data Fetching**: Vue Query (TanStack Query)
- **Form Validation**: VeeValidate with Yup schemas
- **Routing**: Vue Router
- **Authentication**: Firebase Auth
- **Internationalization**: Vue i18n
- **Icons**: Lucide Vue

## Replit Configuration

### Development Server
- **Port**: 5000 (required for Replit)
- **Host**: 0.0.0.0 (allows external access)
- **HMR**: Configured on port 5000
- **Command**: `npm run dev`

### Production Deployment
- **Type**: Autoscale (stateless web application)
- **Build Command**: `npm run build`
- **Run Command**: `npm run preview`

### Project Structure
```
src/
├── components/          # Reusable Vue components
├── common/ui/          # UI component library (shadcn/ui style)
├── views/              # Page components
├── layouts/            # Layout components (admin-layout, auth-layout)
├── router/             # Vue Router configuration
├── store/              # Pinia stores
├── service/            # API service layer
├── helpers/            # Utility helper functions
├── utils/              # General utility functions
├── composables/        # Vue composables
├── constants/          # Application constants
├── config/             # Configuration files (Firebase, nav items, theme)
├── directives/         # Custom Vue directives
└── plugins/            # Vue plugins
```

## Setup Notes
- ESLint plugin temporarily disabled in vite.config.js during initial setup (can be re-enabled with proper configuration)
- Vite server configured with strictPort: true to ensure port 5000 usage
- All path aliases from configs/paths.config.js are properly configured
- Firebase configuration available in src/config/firebase.config.js

## Development Workflow
1. **Development**: `npm run dev` - starts Vite dev server on port 5000
2. **Build**: `npm run build` - builds for production
3. **Preview**: `npm run preview` - preview production build
4. **Lint**: `npm run lint` - run ESLint
5. **Format**: `npm run format` - run Prettier

## Known Issues
- Some deprecation warnings for legacy Sass API (non-blocking)
- Browserslist data is 7 months old (can be updated with `npx update-browserslist-db@latest`)

## User Preferences
- Project follows Vue.js 3 Composition API standards
- Uses Tailwind CSS for styling
- Implements shadcn/ui component patterns
- Follows the coding standards outlined in project_instruction.md

## Recent Changes (September 11, 2025)
- Configured Vite for Replit environment (port 5000, host 0.0.0.0)
- Updated package.json dev script
- Installed all dependencies
- Set up Frontend workflow
- Configured deployment for autoscale
- Verified application builds and runs successfully