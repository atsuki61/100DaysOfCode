export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QRCodeOptions = {
  text: string;
  size: number; // px
  margin: number; // modules
  level: ErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
};


