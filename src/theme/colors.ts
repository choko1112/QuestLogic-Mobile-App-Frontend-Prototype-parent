export const Colors = {
  blackberry: '#000022',
  white: '#FDFDFD',
  gojiBerry: '#FC2865',
  textDark: '#1E1D1F',
  background: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof Colors;
