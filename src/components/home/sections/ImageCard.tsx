import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import type { HomeworkImage } from '../../../types/home';
import { Colors } from '../../../theme/colors';

interface ImageCardProps {
  item: HomeworkImage;
}

/** 宿題確認セクションのビフォー/アフター画像カード */
const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* 画像エリア */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={`${item.caption} - ${item.subject}`}
        />
      </View>

      {/* テキストエリア */}
      <View style={styles.textArea}>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.blackberry,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    // 小さめのシャドウ (2px, 2px)
    shadowColor: Colors.blackberry,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    backgroundColor: Colors.blackberry,
    borderBottomWidth: 4,
    borderBottomColor: Colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textArea: {
    padding: 12,
    gap: 4,
  },
  caption: {
    fontSize: 20,
    color: Colors.blackberry,
    letterSpacing: 0.4,
    fontWeight: '700',
    lineHeight: 24,
  },
  subject: {
    fontSize: 16,
    color: Colors.blackberry,
    letterSpacing: 0.32,
    lineHeight: 20,
  },
});

export default ImageCard;
