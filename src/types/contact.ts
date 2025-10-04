import { ServiceType } from './service';

export interface ContactFormData {
  navn: string;
  epost: string;
  telefon?: string;
  tjenesteType: ServiceType | '';
  melding: string;
  personvernAccept: boolean;
  honeypot?: string; // Hidden field for spam protection
}

export interface ContactFormErrors {
  navn?: string;
  epost?: string;
  telefon?: string;
  tjenesteType?: string;
  melding?: string;
  personvernAccept?: string;
  general?: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError?: string;
}

export type ContactFormAction =
  | { type: 'SET_FIELD'; field: keyof ContactFormData; value: string | boolean }
  | { type: 'SET_ERRORS'; errors: ContactFormErrors }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'SET_SUBMITTED'; isSubmitted: boolean }
  | { type: 'SET_SUBMIT_ERROR'; error?: string }
  | { type: 'RESET_FORM' };
