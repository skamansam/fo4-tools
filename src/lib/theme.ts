export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  border: string;
  text: string;
}

export const colorThemes: ColorTheme[] = [
  {
    name: 'Vault-Tec Yellow',
    primary: '#fbbf24',
    secondary: '#b45309',
    accent: '#fcd34d',
    bg: '#78350f',
    border: '#d97706',
    text: '#fef3c7'
  },
  {
    name: 'Brotherhood Steel',
    primary: '#60a5fa',
    secondary: '#1e3a8a',
    accent: '#93c5fd',
    bg: '#0f172a',
    border: '#3b82f6',
    text: '#dbeafe'
  },
  {
    name: 'Enclave Green',
    primary: '#4ade80',
    secondary: '#15803d',
    accent: '#86efac',
    bg: '#0f2818',
    border: '#22c55e',
    text: '#dcfce7'
  },
  {
    name: 'Nuka-Cola Red',
    primary: '#f87171',
    secondary: '#7f1d1d',
    accent: '#fca5a5',
    bg: '#450a0a',
    border: '#ef4444',
    text: '#fee2e2'
  },
  {
    name: 'Institute Purple',
    primary: '#d8b4fe',
    secondary: '#581c87',
    accent: '#e9d5ff',
    bg: '#2d1b4e',
    border: '#c084fc',
    text: '#f3e8ff'
  }
];

export const defaultTheme = colorThemes[2]; // Enclave Green

export function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent * 100);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

export function getThemeFromCustomColor(customColor: string): ColorTheme {
  return {
    name: 'Custom',
    primary: customColor,
    secondary: adjustBrightness(customColor, -0.4),
    accent: adjustBrightness(customColor, 0.2),
    bg: adjustBrightness(customColor, -0.7),
    border: adjustBrightness(customColor, -0.2),
    text: adjustBrightness(customColor, 0.8)
  };
}
