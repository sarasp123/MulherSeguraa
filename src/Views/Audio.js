import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordingInstance, setRecordingInstance] = useState(null);

  useEffect(() => {
    return () => {
      if (recordingInstance) {
        stopRecording();
      }
    };
  }, [recordingInstance]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão para gravação de áudio não concedida');
        return;
      }

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecordingInstance(recordingInstance);

      // Defina um temporizador para parar a gravação após 5 minutos
      setTimeout(() => {
        stopRecording();
      }, 5 * 60 * 1000); // 5 minutos em milissegundos
    } catch (error) {
      console.error('Erro ao iniciar a gravação:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingInstance) {
        await recordingInstance.stopAndUnloadAsync();
        setRecording(false);
      }
    } catch (error) {
      console.error('Erro ao encerrar a gravação:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
        <Text>{recording ? 'Parar Gravação' : 'Iniciar Gravação'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioRecorder;