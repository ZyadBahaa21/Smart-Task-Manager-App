import { memo, useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { palette } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { Task, TaskDraft, TaskPriority } from '../types/task';

interface TaskEditorModalProps {
  visible: boolean;
  isDarkMode: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (draft: TaskDraft, taskId?: string) => void;
}

const priorities: TaskPriority[] = ['low', 'medium', 'high'];

export const TaskEditorModal = memo(
  ({ visible, isDarkMode, task, onClose, onSave }: TaskEditorModalProps) => {
    const colors = isDarkMode ? palette.dark : palette.light;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');

    useEffect(() => {
      if (!visible) {
        return;
      }

      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
      } else {
        setTitle('');
        setDescription('');
        setPriority('medium');
      }
    }, [task, visible]);

    const canSave = useMemo(() => title.trim().length > 0, [title]);

    const onConfirm = () => {
      if (!canSave) {
        return;
      }

      onSave(
        {
          title,
          description,
          priority,
        },
        task?.id,
      );
      onClose();
    };

    return (
      <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.overlay}>
          <View style={[styles.card, { backgroundColor: colors.card }]}> 
            <Text style={[styles.title, { color: colors.text }]}>
              {task ? 'Edit Task' : 'Add Task'}
            </Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Task title"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              maxLength={80}
            />

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description (optional)"
              placeholderTextColor={colors.secondaryText}
              style={[
                styles.input,
                styles.multilineInput,
                { color: colors.text, borderColor: colors.border },
              ]}
              multiline
              textAlignVertical="top"
              maxLength={240}
            />

            <View style={styles.priorityRow}>
              {priorities.map(item => {
                const isActive = priority === item;
                const textColorStyle = { color: isActive ? '#ffffff' : colors.text };

                return (
                  <Pressable
                    key={item}
                    onPress={() => setPriority(item)}
                    style={[
                      styles.priorityButton,
                      {
                        backgroundColor: isActive ? colors.accent : colors.background,
                        borderColor: colors.border,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.priorityText,
                        textColorStyle,
                      ]}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.footer}>
              <Pressable onPress={onClose} style={styles.footerButton}>
                <Text style={[styles.footerButtonText, { color: colors.secondaryText }]}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={onConfirm}
                disabled={!canSave}
                style={[
                  styles.footerButton,
                  styles.primaryButton,
                  { backgroundColor: canSave ? colors.accent : colors.border },
                ]}>
                <Text style={[styles.footerButtonText, styles.primaryButtonText]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  priorityText: {
    fontWeight: '700',
  },
  footer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  footerButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  footerButtonText: {
    fontWeight: '700',
  },
  primaryButton: {
    minWidth: 90,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
});
