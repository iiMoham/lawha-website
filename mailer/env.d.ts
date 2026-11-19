// src/i18n.ts (shared with the site) reads import.meta.env inside a helper the mailer never calls.
interface ImportMetaEnv { readonly BASE_URL: string }
interface ImportMeta { readonly env: ImportMetaEnv }
