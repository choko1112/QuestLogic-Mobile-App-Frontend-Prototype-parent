import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { HomeworkImage } from '../../../types/home';
import ImageCard from './ImageCard';
import { Colors } from '../../../theme/colors';

interface HomeworkContentProps {
  images: HomeworkImage[];
}

/** アコーディオン「宿題の確認」の展開コンテンツ */
const HomeworkContent: React.FC<HomeworkContentProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>提出された宿題はまだありません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {images.map((item) => (
          <ImageCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.blackberry,
    opacity: 0.6,
  },
});

export default HomeworkContent;
