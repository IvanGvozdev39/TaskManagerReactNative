import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/Colors';
import strings from '../constants/Strings';

const statuses = [
  { label: strings.statusCompleted, color: colors.green },
  { label: strings.statusOngoing, color: colors.yellow },
  { label: strings.statusCancelled, color: colors.red },
];

interface TaskDialogProps {
  visible: boolean;
  onClose: () => void;
  onChangeStatus: (status: string) => void;
  onDelete: () => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  visible,
  onClose,
  onChangeStatus,
  onDelete,
}) => {
  return (
    <Modal transparent visible={visible} animationType='none'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{strings.changeTaskStatus}</Text>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status.label}
              style={styles.statusOption}
              onPress={() => {
                onChangeStatus(status.label);
                onClose();
              }}
            >
              <View style={[styles.circle, { backgroundColor: status.color }]} />
              <Text style={styles.statusText}>{status.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.deleteButton} onPress={() => { onDelete(); onClose(); }}>
            <Text style={styles.deleteText}>{strings.deleteTask}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>{strings.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack
  },
  container: {
    backgroundColor: colors.grey,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    color: colors.whiteText,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    marginRight: 10,
  },
  statusText: {
    color: colors.whiteText,
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.buttonRed,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: colors.whiteText,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  closeText: {
    color: colors.whiteText,
    fontWeight: 'bold',
  },
});

export default TaskDialog;
