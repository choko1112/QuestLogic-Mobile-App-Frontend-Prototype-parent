/**
 * テキスト表示ユーティリティ。
 * バックエンドから届く長文 AI レポートを読みやすく整形するための関数群。
 */

/**
 * 句点（。）の直後に改行（\n）を挿入し、文章を読みやすくする。
 *
 * - 既に改行が続いている場合は二重挿入を避ける。
 * - バックエンドから受け取ったプレーンテキストに適用して表示する。
 *
 * 例:
 *   入力: "文章A。文章B。文章C。"
 *   出力: "文章A。\n文章B。\n文章C。"
 */
export function insertNewlinesAfterPunctuation(text: string): string {
  return text.replace(/。(?!\n)/g, '。\n').trim();
}
