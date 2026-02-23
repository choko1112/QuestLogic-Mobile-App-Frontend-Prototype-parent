import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, AppTheme } from '../theme/theme';

// ─── グローバル状態の型定義 ──────────────────────────────────────────────────

interface AppContextValue {
  /** 親の名前。Setting 画面で変更 → Home 画面「ようこそ、{userName}さん」に反映 */
  userName: string;
  setUserName: (name: string) => void;
  /** 子供の名前。タスク・ゲーム管理・宿題などの子供関連ラベルに使用 */
  childName: string;
  setChildName: (name: string) => void;
  /** ダークモードフラグ。ONで背景・文字色を反転 */
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
}

// ─── Context 作成 ─────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue>({
  userName: '○○',
  setUserName: () => {},
  childName: '○○',
  setChildName: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * アプリ全体のグローバル状態を提供するプロバイダー。
 * App.tsx のルートに配置する。
 *
 * → バックエンド認証導入後は userName / childName を API レスポンスで初期化すること。
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>('○○');
  const [childName, setChildName] = useState<string>('○○');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{ userName, setUserName, childName, setChildName, isDarkMode, setIsDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ─── カスタムフック ──────────────────────────────────────────────────────────

/** グローバルステートにアクセスするためのカスタムフック */
export const useAppContext = () => useContext(AppContext);

/**
 * isDarkMode の値に応じたテーマカラーセットを返すヘルパーフック。
 * ダークモード対応コンポーネントでは `useTheme()` でテーマを取得し、
 * 色指定に `theme.text / theme.background / theme.border` などを使用する。
 */
export const useTheme = (): AppTheme => {
  const { isDarkMode } = useContext(AppContext);
  return isDarkMode ? darkTheme : lightTheme;
};
