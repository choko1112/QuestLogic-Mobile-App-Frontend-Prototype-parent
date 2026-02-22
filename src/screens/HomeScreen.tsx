import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import { Colors } from '../theme/colors';
import type { CompletedTask, HomeworkImage } from '../types/home';

import AccordionSection from '../components/home/AccordionSection';
import TasksContent from '../components/home/sections/TasksContent';
import GameManagementContent from '../components/home/sections/GameManagementContent';
import HomeworkContent from '../components/home/sections/HomeworkContent';
import ConfirmModal from '../components/home/modals/ConfirmModal';
import ExtendTimeModal from '../components/home/modals/ExtendTimeModal';

// ─── アイコン画像 ──────────────────────────────────────────────────────────────
// Figma からエクスポートされた PNG（asset/home/images/ に配置済み）
// ファイル名の大文字小文字は実際のファイル名に合わせること（case-sensitive 環境対応）
const ICON_LOCK   = require('../../asset/home/images/SmileyXEyes.png');
const ICON_UNLOCK = require('../../asset/home/images/Smiley.png');

// ─── 静的データ（バックエンド API で差し替え予定） ───────────────────────────────
/**
 * 子供の名前。
 * 「ようこそ、{childName}さん」「今日の{childName}の終了タスク」
 * 「{childName}のゲーム制限時間」の全ラベルで共通利用。
 * → APIから取得する場合は useState / useEffect に変更する。
 */
const CHILD_NAME = '田中';

/**
 * 今日の終了タスク一覧。
 * subject と description を持つオブジェクトの配列。
 * → API レスポンスで置き換えられるよう CompletedTask[] 型に統一。
 */
const INITIAL_COMPLETED_TASKS: CompletedTask[] = [
  { id: '1', subject: '国語', description: '夏目漱石「こころ」読解問題' },
  { id: '2', subject: '公民', description: '国会・内閣・裁判所の仕組み問題' },
  { id: '3', subject: '数学一', description: '因数分解の基礎5-2' },
];

/**
 * 宿題確認画像一覧。
 * imageUrl は { uri: string } 形式で Image コンポーネントが受け取る。
 * → API レスポンス（S3 URL など）に差し替え可能。
 */
const INITIAL_HOMEWORK_IMAGES: HomeworkImage[] = [
  {
    id: '1',
    caption: 'ビフォー',
    subject: '6年：文字と式',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    caption: 'アフター',
    subject: '6年：文字と式',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

// ─── モーダル種別 ──────────────────────────────────────────────────────────────
type ModalType = 'none' | 'forceLock' | 'unlock' | 'extendTime';

// ─── コンポーネント ────────────────────────────────────────────────────────────
const HomeScreen: React.FC = () => {
  // ── 静的データ (API 取得後に setState で更新) ──
  const [completedTasks] = useState<CompletedTask[]>(INITIAL_COMPLETED_TASKS);
  const [homeworkImages] = useState<HomeworkImage[]>(INITIAL_HOMEWORK_IMAGES);

  // ── ゲーム管理：子供が使うたびに減算できるよう State に分離 ──
  /**
   * ゲーム残り時間 (分)。
   * 子供側アプリからの WebSocket / Polling で setGameRemainingMinutes を呼ぶ想定。
   */
  const [gameRemainingMinutes, setGameRemainingMinutes] = useState<number>(45);

  /**
   * スマホ残り時間 (分)。
   * gameRemainingMinutes と独立して管理することで個別の減算が可能。
   */
  const [smartphoneRemainingMinutes, setSmartphoneRemainingMinutes] =
    useState<number>(30);

  /** 強制ロック中かどうか。trueのとき「強制ロック」ボタンが無効化される。 */
  const [isForceLocked, setIsForceLocked] = useState<boolean>(false);

  // ── モーダル制御 ──
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const closeModal = () => setActiveModal('none');

  // ── ハンドラ ──
  const handleForceLockConfirm = () => {
    setIsForceLocked(true);
    closeModal();
  };

  const handleUnlockConfirm = () => {
    setIsForceLocked(false);
    closeModal();
  };

  const handleExtendTimeConfirm = (minutes: number) => {
    setGameRemainingMinutes((prev) => prev + minutes);
    setSmartphoneRemainingMinutes((prev) => prev + minutes);
    closeModal();
  };

  // ── レンダリング ──
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 挨拶テキスト: childName 変数を動的に展開 */}
        <Text style={styles.welcomeText}>ようこそ、{CHILD_NAME}さん</Text>

        {/* ① 今日の{childName}の終了タスク */}
        <AccordionSection title={`今日の${CHILD_NAME}の終了タスク`}>
          {/*
           * completedTasks 配列を map() で展開。
           * バックエンドから受け取った配列をそのまま渡せる構造。
           */}
          <TasksContent tasks={completedTasks} childName={CHILD_NAME} />
        </AccordionSection>

        {/* ② スマホ・ゲーム管理 */}
        <AccordionSection title="スマホ・ゲーム管理">
          <GameManagementContent
            childName={CHILD_NAME}
            gameRemainingMinutes={gameRemainingMinutes}
            smartphoneRemainingMinutes={smartphoneRemainingMinutes}
            isForceLocked={isForceLocked}
            onForceLockPress={() => setActiveModal('forceLock')}
            onUnlockPress={() => setActiveModal('unlock')}
            onExtendTimePress={() => setActiveModal('extendTime')}
          />
        </AccordionSection>

        {/* ③ 宿題の確認 */}
        <AccordionSection title="宿題の確認">
          {/*
           * homeworkImages 配列を渡す。
           * 各要素の imageUrl が { uri: string } として Image に渡される。
           */}
          <HomeworkContent images={homeworkImages} />
        </AccordionSection>
      </ScrollView>

      {/* ── モーダル群 ───────────────────────────────── */}

      {/* 強制ロック確認 */}
      <ConfirmModal
        visible={activeModal === 'forceLock'}
        title="強制ロックしますか？"
        message={`${CHILD_NAME}のスマホ・ゲームを\n今すぐロックします。`}
        iconSource={ICON_LOCK}
        confirmLabel="ロックする"
        onConfirm={handleForceLockConfirm}
        onCancel={closeModal}
      />

      {/* 強制ロック解除確認 */}
      <ConfirmModal
        visible={activeModal === 'unlock'}
        title="ロックを解除しますか？"
        message={`${CHILD_NAME}のスマホ・ゲームの\nロックを解除します。`}
        iconSource={ICON_UNLOCK}
        confirmLabel="解除する"
        onConfirm={handleUnlockConfirm}
        onCancel={closeModal}
      />

      {/* 時間延長 */}
      <ExtendTimeModal
        visible={activeModal === 'extendTime'}
        childName={CHILD_NAME}
        onConfirm={handleExtendTimeConfirm}
        onCancel={closeModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 20,
    color: Colors.blackberry,
    letterSpacing: 0.4,
    fontWeight: '400',
    marginBottom: 16,
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});

export default HomeScreen;
