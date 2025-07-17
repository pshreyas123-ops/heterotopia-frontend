export const locales = ['en', 'de', 'fr'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch', 
  fr: 'Français'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  de: '🇩🇪',
  fr: '🇫🇷'
};

// Basic translations for the MVP
export const translations = {
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort by',
      contact: 'Contact',
      viewProfile: 'View Profile',
      signIn: 'Sign in',
      signUp: 'Sign up',
      signOut: 'Sign out',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      backToHome: 'Back to Home',
      language: 'Language'
    },
    navigation: {
      dashboard: 'Dashboard',
      profile: 'Profile', 
      search: 'Search',
      matches: 'Matches',
      messages: 'Messages',
      settings: 'Settings'
    },
    auth: {
      welcomeBack: 'Welcome back',
      signInToAccount: 'Sign in to your account to continue',
      createAccount: 'Create your account',
      joinHeterotopia: 'Join Heterotopia to connect with the right partners',
      forgotPassword: 'Forgot password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      organizationName: 'Organization Name',
      userType: 'I am a',
      ngo: 'NGO / Non-Profit Organization',
      funder: 'Funder / Foundation / Donor',
      consultant: 'Consultant / Service Provider'
    },
    home: {
      title: 'Connect NGOs with Funders for Greater Impact',
      subtitle: 'Streamline partnerships between organizations and funders through intelligent matching and discovery',
      ngoCard: {
        title: "I'm an NGO",
        benefits: [
          'Get discovered by funders',
          'Showcase your impact', 
          'Connect with aligned funders'
        ]
      },
      funderCard: {
        title: "I'm a Funder", 
        benefits: [
          'Find aligned NGOs quickly',
          'Streamlined matching',
          'Easy contact and evaluation'
        ]
      },
      consultantCard: {
        title: "I'm a Consultant",
        benefits: [
          'Manage multiple NGO profiles',
          'Bulk operations',
          'Streamlined workflows'
        ]
      }
    }
  },
  de: {
    common: {
      loading: 'Laden...',
      save: 'Speichern',
      cancel: 'Abbrechen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      search: 'Suchen',
      filter: 'Filter',
      sort: 'Sortieren nach',
      contact: 'Kontakt',
      viewProfile: 'Profil anzeigen',
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      signOut: 'Abmelden',
      getStarted: 'Loslegen',
      learnMore: 'Mehr erfahren',
      backToHome: 'Zurück zur Startseite',
      language: 'Sprache'
    },
    navigation: {
      dashboard: 'Dashboard',
      profile: 'Profil',
      search: 'Suchen',
      matches: 'Übereinstimmungen',
      messages: 'Nachrichten',
      settings: 'Einstellungen'
    },
    auth: {
      welcomeBack: 'Willkommen zurück',
      signInToAccount: 'Melden Sie sich in Ihrem Konto an, um fortzufahren',
      createAccount: 'Erstellen Sie Ihr Konto',
      joinHeterotopia: 'Treten Sie Heterotopia bei, um sich mit den richtigen Partnern zu verbinden',
      forgotPassword: 'Passwort vergessen?',
      dontHaveAccount: 'Haben Sie noch kein Konto?',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      organizationName: 'Organisationsname',
      userType: 'Ich bin ein',
      ngo: 'NGO / Gemeinnützige Organisation',
      funder: 'Geldgeber / Stiftung / Spender',
      consultant: 'Berater / Dienstleister'
    },
    home: {
      title: 'NGOs mit Geldgebern für größere Wirkung verbinden',
      subtitle: 'Optimieren Sie Partnerschaften zwischen Organisationen und Geldgebern durch intelligente Zuordnung und Entdeckung',
      ngoCard: {
        title: 'Ich bin eine NGO',
        benefits: [
          'Von Geldgebern entdeckt werden',
          'Ihre Wirkung präsentieren',
          'Mit passenden Geldgebern verbinden'
        ]
      },
      funderCard: {
        title: 'Ich bin ein Geldgeber',
        benefits: [
          'Passende NGOs schnell finden',
          'Optimierte Zuordnung',
          'Einfache Kontaktaufnahme und Bewertung'
        ]
      },
      consultantCard: {
        title: 'Ich bin ein Berater',
        benefits: [
          'Mehrere NGO-Profile verwalten',
          'Massenoperationen',
          'Optimierte Arbeitsabläufe'
        ]
      }
    }
  },
  fr: {
    common: {
      loading: 'Chargement...',
      save: 'Enregistrer',
      cancel: 'Annuler',
      edit: 'Modifier',
      delete: 'Supprimer',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier par',
      contact: 'Contact',
      viewProfile: 'Voir le profil',
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      signOut: 'Se déconnecter',
      getStarted: 'Commencer',
      learnMore: 'En savoir plus',
      backToHome: "Retour à l'accueil",
      language: 'Langue'
    },
    navigation: {
      dashboard: 'Tableau de bord',
      profile: 'Profil',
      search: 'Recherche',
      matches: 'Correspondances',
      messages: 'Messages',
      settings: 'Paramètres'
    },
    auth: {
      welcomeBack: 'Bon retour',
      signInToAccount: 'Connectez-vous à votre compte pour continuer',
      createAccount: 'Créez votre compte',
      joinHeterotopia: 'Rejoignez Heterotopia pour vous connecter avec les bons partenaires',
      forgotPassword: 'Mot de passe oublié ?',
      dontHaveAccount: "Vous n'avez pas de compte ?",
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      email: 'E-mail',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      organizationName: 'Nom de l\'organisation',
      userType: 'Je suis un',
      ngo: 'ONG / Organisation à but non lucratif',
      funder: 'Bailleur de fonds / Fondation / Donateur',
      consultant: 'Consultant / Prestataire de services'
    },
    home: {
      title: 'Connecter les ONG avec les bailleurs de fonds pour un impact plus grand',
      subtitle: 'Rationalisez les partenariats entre organisations et bailleurs de fonds grâce à la correspondance et découverte intelligentes',
      ngoCard: {
        title: 'Je suis une ONG',
        benefits: [
          'Être découvert par les bailleurs de fonds',
          'Présenter votre impact',
          'Se connecter avec des bailleurs alignés'
        ]
      },
      funderCard: {
        title: 'Je suis un bailleur de fonds',
        benefits: [
          'Trouver rapidement des ONG alignées',
          'Correspondance rationalisée',
          'Contact et évaluation faciles'
        ]
      },
      consultantCard: {
        title: 'Je suis un consultant',
        benefits: [
          'Gérer plusieurs profils d\'ONG',
          'Opérations en masse',
          'Flux de travail rationalisés'
        ]
      }
    }
  }
} as const;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function t(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}