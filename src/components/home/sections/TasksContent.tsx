import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { CompletedTask } from '../../../types/home';
import { Colors } from '../../../theme/colors';

interface TasksContentProps {
  tasks: CompletedTask[];
  childName: string;
}

/** アコーディオン「今日の△△の終了タスク」の展開コンテンツ */
const TasksContent: React.FC<TasksContentProps> = ({ tasks, childName }) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyRow}>
        <Text style={styles.emptyText}>今日の終了タスクはまだありません</Text>
      </View>
    );
  }

  return (
    <>
      {tasks.map((task, index) => (
        <View
          key={task.id}
          style={[
            styles.row,
            index < tasks.length - 1 && styles.rowBorder,
          ]}
        >
          <Text style={styles.taskText}>
            {task.subject}：{task.description}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    minHeight: 48,
    justifyContent: 'center',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.blackberry,
  },
  taskText: {
    fontSize: 16,
    color: Colors.blackberry,
    lineHeight: 24,
  },
  emptyRow: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.blackberry,
    opacity: 0.6,
  },
});

export default TasksContent;
