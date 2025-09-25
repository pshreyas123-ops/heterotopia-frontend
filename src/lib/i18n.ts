// Internationalization configuration and utilities

export type Locale = 'en' | 'es' | 'fr';

export const locales: Locale[] = ['en', 'es', 'fr'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
};

export const defaultLocale: Locale = 'en';

// Translation keys and values
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.trySemanticSearch': 'Try Semantic Search',
    'common.seeHowItWorks': 'See How It Works',
    
    // Home page
    'home.title': 'Connect NGOs with Perfect Funders',
    'home.subtitle': 'Use AI-powered semantic search to find funding opportunities that truly match your mission and impact goals.',
    
    // Dashboard
    'dashboard.findPerfectFunders': 'Find Your Perfect Funders',
    'dashboard.naturalLanguageDescription': 'Describe your mission in natural language and let our AI find the best matches.',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.search': 'Search',
    'nav.profile': 'Profile',
    'nav.projects': 'Projects',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.organization': 'Organization',
    
    // Profile
    'profile.mission': 'Mission Statement',
    'profile.sectors': 'Focus Sectors',
    'profile.geographicFocus': 'Geographic Focus',
    'profile.fundingNeeds': 'Funding Needs',
    
    // Messages
    'Welcome': 'Welcome',
    'Find Funders Description': 'Discover funding opportunities that align with your mission using our AI-powered search.',
    'Start Searching': 'Start Searching',
  },
  es: {
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.trySemanticSearch': 'Probar Búsqueda Semántica',
    'common.seeHowItWorks': 'Ver Cómo Funciona',
    
    // Home page
    'home.title': 'Conecta ONGs con Financiadores Perfectos',
    'home.subtitle': 'Usa búsqueda semántica impulsada por IA para encontrar oportunidades de financiación que realmente coincidan con tu misión y objetivos de impacto.',
    
    // Dashboard
    'dashboard.findPerfectFunders': 'Encuentra tus Financiadores Perfectos',
    'dashboard.naturalLanguageDescription': 'Describe tu misión en lenguaje natural y deja que nuestra IA encuentre las mejores coincidencias.',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel',
    'nav.search': 'Buscar',
    'nav.profile': 'Perfil',
    'nav.projects': 'Proyectos',
    'nav.logout': 'Cerrar Sesión',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    
    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre',
    'auth.organization': 'Organización',
    
    // Profile
    'profile.mission': 'Declaración de Misión',
    'profile.sectors': 'Sectores de Enfoque',
    'profile.geographicFocus': 'Enfoque Geográfico',
    'profile.fundingNeeds': 'Necesidades de Financiación',
    
    // Messages
    'Welcome': 'Bienvenido',
    'Find Funders Description': 'Descubre oportunidades de financiación que se alineen con tu misión usando nuestra búsqueda impulsada por IA.',
    'Start Searching': 'Comenzar Búsqueda',
  },
  fr: {
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.trySemanticSearch': 'Essayer la Recherche Sémantique',
    'common.seeHowItWorks': 'Voir Comment Ça Marche',
    
    // Home page
    'home.title': 'Connecter les ONG avec des Financeurs Parfaits',
    'home.subtitle': 'Utilisez la recherche sémantique alimentée par IA pour trouver des opportunités de financement qui correspondent vraiment à votre mission et objectifs d\'impact.',
    
    // Dashboard
    'dashboard.findPerfectFunders': 'Trouvez vos Financeurs Parfaits',
    'dashboard.naturalLanguageDescription': 'Décrivez votre mission en langage naturel et laissez notre IA trouver les meilleures correspondances.',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.dashboard': 'Tableau de Bord',
    'nav.search': 'Rechercher',
    'nav.profile': 'Profil',
    'nav.projects': 'Projets',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'S\'inscrire',
    'auth.email': 'Email',
    'auth.password': 'Mot de Passe',
    'auth.name': 'Nom',
    'auth.organization': 'Organisation',
    
    // Profile
    'profile.mission': 'Déclaration de Mission',
    'profile.sectors': 'Secteurs d\'Activité',
    'profile.geographicFocus': 'Focus Géographique',
    'profile.fundingNeeds': 'Besoins de Financement',
    
    // Messages
    'Welcome': 'Bienvenue',
    'Find Funders Description': 'Découvrez des opportunités de financement qui s\'alignent avec votre mission en utilisant notre recherche alimentée par IA.',
    'Start Searching': 'Commencer la Recherche',
  },
};

// Translation function
export const t = (locale: Locale) => (key: string): string => {
  return translations[locale]?.[key] || translations[defaultLocale][key] || key;
};

// Check if locale is valid
export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

// Get browser locale
export const getBrowserLocale = (): Locale => {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.split('-')[0];
  return isValidLocale(browserLang) ? browserLang : defaultLocale;
};