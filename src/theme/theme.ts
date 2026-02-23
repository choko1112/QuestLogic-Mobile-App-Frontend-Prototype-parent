import { Colors } from './colors';

/** 画面全体に適用するテーマカラーセット */
export interface AppTheme {
  background: string;
  surface: string;    // カード・モーダル背景
  border: string;
  text: string;
  textSecondary: string;
  separator: string;
  accent: string;     // 強調色（ボタン枠、トグル ON 色など）
}

export const lightTheme: AppTheme = {
  background: Colors.background,
  surface: Colors.white,
  border: Colors.blackberry,
  text: Colors.blackberry,
  textSecondary: '#555577',
  separator: Colors.blackberry,
  accent: Colors.gojiBerry,
};

export const darkTheme: AppTheme = {
  background: '#000022',
  surface: '#0d0d33',
  border: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#AAAACC',
  separator: '#3333AA',
  accent: Colors.gojiBerry,
};
