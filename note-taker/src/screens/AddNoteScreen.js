import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNoteScreen({ navigation, route }) {
    const [noteText, setNoteText] = useState('');
    const { setNotes } = route.params;

    const saveNote = async () => {
        if (!noteText.trim()) return;

        try {
            const storedNotes = await AsyncStorage.getItem('notes');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            const newNote = { id: Date.now().toString(), text: noteText };
            const updatedNotes = [...notes, newNote];
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
            navigation.goBack();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Write your note..."
                value={noteText}
                onChangeText={setNoteText}
                multiline
            />
            <Button title="Save Note" onPress={saveNote} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, minHeight: 100 },
});