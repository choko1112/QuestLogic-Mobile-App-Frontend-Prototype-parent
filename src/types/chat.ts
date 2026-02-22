/**
 * チャット画面のデータ型定義。
 * バックエンド（AI レポート API）から受け取るデータ構造を想定。
 */

/** 1件のメッセージ */
export interface ChatMessage {
  /** 一意な ID（リストキーに使用） */
  id: string;
  /** メッセージ本文。isTyping: true のときは空文字で可 */
  text: string;
  /**
   * true: AIがタイピング中（「・・・」吹き出しを表示）
   * false: 送信完了（text をそのまま表示）
   */
  isTyping: boolean;
}

/** 1日分のチャット履歴 */
export interface ChatDay {
  /**
   * 日付ラベル。
   * - "今日" | "昨日" → そのまま表示
   * - それ以外 → "YYYY/MM/DD" 形式の文字列
   */
  dateLabel: string;
  /** その日に受信したメッセージの配列 */
  messages: ChatMessage[];
}

/** チャット全履歴（日付順） */
export type ChatHistoryData = ChatDay[];

// ─── FlatList 用のフラットリストアイテム型 ─────────────────────────────────────

export type ChatListItem =
  | { type: 'dateLabel'; id: string; label: string }
  | { type: 'message'; id: string; text: string; isTyping: boolean };
