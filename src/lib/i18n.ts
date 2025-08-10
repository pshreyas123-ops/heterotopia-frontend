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
      language: 'Language',
      trySemanticSearch: 'Try Semantic Search',
      seeHowItWorks: 'See How It Works'
    },
    search: {
      noMatches: 'No matches found',
      tryDifferentSearch: 'Try Different Search',
      searchWithAI: 'Search with AI',
      aiAnalyzing: 'AI is analyzing...',
      loadingSearch: 'Loading search...',
      focusArea: 'Focus Area (Optional)',
      location: 'Location (Optional)',
      anyFocusArea: 'Any focus area',
      anyLocation: 'Any location',
      foundMatches: 'matching funders found',
      clearSearch: 'Clear Search',
      whyGoodMatch: 'Why this is a great match:',
      wasGoodMatch: 'Was this a good match?'
    },
    profile: {
      ngoProfile: 'NGO Profile',
      completeProfile: 'Complete your profile to improve search recommendations',
      profileCompleteness: 'Profile Completeness',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      basicInformation: 'Basic Information',
      essentialDetails: 'Essential details about your organization',
      organizationName: 'Organization Name',
      contactEmail: 'Contact Email',
      missionFocus: 'Mission & Focus Areas',
      helpAI: 'Help our AI understand what you do and who you serve',
      missionStatement: 'Mission Statement',
      missionPlaceholder: 'Describe your organization\'s mission and primary activities...',
      sectors: 'Sectors',
      geographicFocus: 'Geographic Focus',
      fundingNeeds: 'Funding Needs',
      describeFunding: 'Describe what kind of funding you\'re looking for',
      currentFundingNeeds: 'Current Funding Needs',
      fundingPlaceholder: 'Describe your current funding needs, project types, and funding amounts you\'re seeking...',
      howImproves: 'How This Improves Your Search',
      missionHelps: 'Mission statement helps AI understand your work context',
      sectorsFilter: 'Sectors & geography filter relevant funders',
      fundingMatches: 'Funding needs match you with appropriate grant sizes',
      completeProfiles: 'Complete profiles get better semantic search results'
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
      language: 'Sprache',
      trySemanticSearch: 'Semantische Suche ausprobieren',
      seeHowItWorks: 'Sehen Sie, wie es funktioniert'
    },
    search: {
      noMatches: 'Keine Übereinstimmungen gefunden',
      tryDifferentSearch: 'Andere Suche versuchen',
      searchWithAI: 'Mit KI suchen',
      aiAnalyzing: 'KI analysiert...',
      loadingSearch: 'Suche wird geladen...',
      focusArea: 'Fokusbereich (Optional)',
      location: 'Standort (Optional)',
      anyFocusArea: 'Jeder Fokusbereich',
      anyLocation: 'Jeder Standort',
      foundMatches: 'passende Geldgeber gefunden',
      clearSearch: 'Suche löschen',
      whyGoodMatch: 'Warum das eine großartige Übereinstimmung ist:',
      wasGoodMatch: 'War das eine gute Übereinstimmung?'
    },
    profile: {
      ngoProfile: 'NGO-Profil',
      completeProfile: 'Vervollständigen Sie Ihr Profil, um Suchempfehlungen zu verbessern',
      profileCompleteness: 'Profilvollständigkeit',
      editProfile: 'Profil bearbeiten',
      saveChanges: 'Änderungen speichern',
      saving: 'Speichern...',
      basicInformation: 'Grundinformationen',
      essentialDetails: 'Wesentliche Details über Ihre Organisation',
      organizationName: 'Organisationsname',
      contactEmail: 'Kontakt-E-Mail',
      missionFocus: 'Mission & Schwerpunktbereiche',
      helpAI: 'Helfen Sie unserer KI zu verstehen, was Sie tun und wen Sie bedienen',
      missionStatement: 'Missionserklärung',
      missionPlaceholder: 'Beschreiben Sie die Mission Ihrer Organisation und ihre Hauptaktivitäten...',
      sectors: 'Sektoren',
      geographicFocus: 'Geografischer Fokus',
      fundingNeeds: 'Finanzierungsbedarf',
      describeFunding: 'Beschreiben Sie, welche Art von Finanzierung Sie suchen',
      currentFundingNeeds: 'Aktueller Finanzierungsbedarf',
      fundingPlaceholder: 'Beschreiben Sie Ihren aktuellen Finanzierungsbedarf, Projekttypen und Finanzierungsbeträge, die Sie suchen...',
      howImproves: 'Wie das Ihre Suche verbessert',
      missionHelps: 'Missionserklärung hilft der KI, Ihren Arbeitskontext zu verstehen',
      sectorsFilter: 'Sektoren & Geografie filtern relevante Geldgeber',
      fundingMatches: 'Finanzierungsbedarf passt Sie mit angemessenen Zuschussgrößen zusammen',
      completeProfiles: 'Vollständige Profile erhalten bessere semantische Suchergebnisse'
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
      language: 'Langue',
      trySemanticSearch: 'Essayer la recherche sémantique',
      seeHowItWorks: 'Voir comment ça marche'
    },
    dashboard: {
      welcome: 'Bienvenue sur Heterotopia',
      findFundersDescription: 'Trouvez des bailleurs de fonds qui correspondent à votre mission grâce à la recherche sémantique IA.',
      startSearching: 'Commencer la recherche de bailleurs',
      findPerfectFunders: 'Trouvez vos bailleurs parfaits',
      naturalLanguageDescription: 'Utilisez le langage naturel pour décrire votre projet et obtenez des recommandations IA',
      startSemanticSearch: '🔍 Commencer la recherche sémantique'
    },
    search: {
      semanticFunderSearch: 'Recherche sémantique de bailleurs',
      describeProject: 'Décrivez votre projet en langage naturel et trouvez des bailleurs alignés',
      aiPoweredSearch: 'Recherche alimentée par IA',
      describeProjectPlaceholder: 'Décrivez votre mission, projet ou besoins de financement avec vos propres mots',
      exampleSearch: 'ex: "Nous avons besoin de financement pour des cliniques de santé mobiles au Kenya rural pour fournir des services de santé maternelle"',
      focusArea: 'Domaine d\'intervention (Optionnel)',
      location: 'Localisation (Optionnel)',
      anyFocusArea: 'Tout domaine',
      anyLocation: 'Toute localisation',
      foundMatches: 'bailleurs correspondants trouvés',
      clearSearch: 'Effacer la recherche',
      whyGoodMatch: 'Pourquoi c\'est une bonne correspondance:',
      wasGoodMatch: 'Était-ce une bonne correspondance?',
      searchTips: '💡 Conseils de recherche',
      beSpecific: 'Soyez spécifique:',
      includeContext: 'Incluez le contexte:',
      noMatches: 'Aucune correspondance trouvée',
      tryDifferentSearch: 'Essayer une recherche différente',
      searchWithAI: 'Rechercher avec IA',
      aiAnalyzing: 'L\'IA analyse...',
      loadingSearch: 'Chargement de la recherche...'
    },
    profile: {
      ngoProfile: 'Profil ONG',
      completeProfile: 'Complétez votre profil pour améliorer les recommandations de recherche',
      profileCompleteness: 'Complétude du profil',
      editProfile: 'Modifier le profil',
      saveChanges: 'Enregistrer les modifications',
      saving: 'Enregistrement...',
      basicInformation: 'Informations de base',
      essentialDetails: 'Détails essentiels sur votre organisation',
      organizationName: 'Nom de l\'organisation',
      contactEmail: 'E-mail de contact',
      missionFocus: 'Mission et domaines d\'intervention',
      helpAI: 'Aidez notre IA à comprendre ce que vous faites et qui vous servez',
      missionStatement: 'Déclaration de mission',
      missionPlaceholder: 'Décrivez la mission de votre organisation et ses activités principales...',
      sectors: 'Secteurs',
      geographicFocus: 'Focus géographique',
      fundingNeeds: 'Besoins de financement',
      describeFunding: 'Décrivez le type de financement que vous recherchez',
      currentFundingNeeds: 'Besoins de financement actuels',
      fundingPlaceholder: 'Décrivez vos besoins de financement actuels, types de projets et montants de financement que vous recherchez...',
      howImproves: 'Comment cela améliore votre recherche',
      missionHelps: 'La déclaration de mission aide l\'IA à comprendre le contexte de votre travail',
      sectorsFilter: 'Les secteurs et la géographie filtrent les bailleurs pertinents',
      fundingMatches: 'Les besoins de financement vous correspondent avec des tailles de subventions appropriées',
      completeProfiles: 'Les profils complets obtiennent de meilleurs résultats de recherche sémantique'
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
      title: 'Trouvez des bailleurs de fonds avec la recherche sémantique IA',
      subtitle: 'Décrivez votre projet en langage naturel et découvrez instantanément des bailleurs alignés',
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