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

import { getTheme } from '../theme/palette';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
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
    const colors = getTheme(isDarkMode);

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
          style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
            <Text style={[styles.title, { color: colors.text }]}>
              {task ? 'Edit Task' : 'Add Task'}
            </Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Task title"
              placeholderTextColor={colors.placeholder}
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              maxLength={80}
            />

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description (optional)"
              placeholderTextColor={colors.placeholder}
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
                    style={({ pressed }) => [
                      styles.priorityButton,
                      {
                        backgroundColor: isActive ? colors.primary : colors.background,
                        borderColor: colors.border,
                        opacity: pressed ? 0.84 : 1,
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
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.footerButton, pressed && styles.pressedButton]}>
                <Text style={[styles.footerButtonText, { color: colors.secondaryText }]}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={onConfirm}
                disabled={!canSave}
                style={({ pressed }) => [
                  styles.footerButton,
                  styles.primaryButton,
                  {
                    backgroundColor: canSave ? colors.primary : colors.borderStrong,
                    opacity: pressed ? 0.82 : 1,
                  },
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
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: {
    ...typography.title,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.body,
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
    ...typography.label,
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
    ...typography.label,
  },
  primaryButton: {
    minWidth: 90,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  pressedButton: {
    opacity: 0.72,
  },
});
