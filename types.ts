
export type ToneType = 'formal' | 'polite' | 'direct' | 'apologetic' | 'appreciative';

export interface EmailResult {
  subject: string;
  body: string;
  alternatives?: string[];
  tips: string[];
}

export interface ToneOption {
  id: ToneType;
  label: string;
  icon: string;
  description: string;
}
