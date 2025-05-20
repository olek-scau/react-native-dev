import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
    const [notes, setNotes] = useState([]);

    // Load notes from AsyncStorage when the component mounts
    useEffect(() => {
        const loadNotes = async () => {
            try {
                const storedNotes = await AsyncStorage.getItem('notes');
                if (storedNotes) {
                    setNotes(JSON.parse(storedNotes));
                }
            } catch (error) {
                console.error('Error loading notes:', error);
            }
        };
        loadNotes();
    }, []);

    // Render each note with a delete button
    const deleteNote = async (id) => {
        try {
            const updatedNotes = notes.filter(note => note.id !== id);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    };

    // Render each note with a delete button
    const renderNote = ({ item }) => (
        <View style={styles.note}>
            <Text>{item.text}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteNote(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

return (
    <View style={styles.container}>
       <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>No notes yet!</Text>}
        />
        <Button
            title="Add Note"
            onPress={() => navigation.navigate('AddNote', { setNotes })}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});