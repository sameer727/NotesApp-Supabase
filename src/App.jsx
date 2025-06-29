import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error('Error fetching notes:', error)
      alert('Error fetching notes!')
    } finally {
      setLoading(false)
    }
  }

  async function addNote() {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert('Please fill in both title and content!')
      return
    }

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            title: newNote.title,
            content: newNote.content
          }
        ])
        .select()

      if (error) throw error

      setNotes([data[0], ...notes])
      setNewNote({ title: '', content: '' })
    } catch (error) {
      console.error('Error adding note:', error)
      alert('Error adding note!')
    }
  }

  async function updateNote(id, updatedNote) {
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title: updatedNote.title,
          content: updatedNote.content,
          updated_at: new Date()
        })
        .eq('id', id)

      if (error) throw error

      setNotes(notes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      ))
      setEditingNote(null)
    } catch (error) {
      console.error('Error updating note:', error)
      alert('Error updating note!')
    }
  }

  async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) return

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) throw error

      setNotes(notes.filter(note => note.id !== id))
    } catch (error) {
      console.error('Error deleting note:', error)
      alert('Error deleting note!')
    }
  }

  function startEditing(note) {
    setEditingNote({ ...note })
  }

  function cancelEditing() {
    setEditingNote(null)
  }

  function saveEdit() {
    if (!editingNote.title.trim() || !editingNote.content.trim()) {
      alert('Please fill in both title and content!')
      return
    }
    updateNote(editingNote.id, editingNote)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📝 NotesApp</h1>
        <p>React + Supabase</p>
      </header>

      <main className="main">
        <div className="add-note-section">
          <h2>Add New Note</h2>
          <div className="note-form">
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="note-input"
            />
            <textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="note-textarea"
              rows="4"
            />
            <button onClick={addNote} className="add-btn">
              Add Note
            </button>
          </div>
        </div>

        <div className="notes-section">
          <h2>Your Notes</h2>
          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="empty-state">No notes yet. Create your first note above!</div>
          ) : (
            <div className="notes-grid">
              {notes.map(note => (
                <div key={note.id} className="note-card">
                  {editingNote?.id === note.id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        value={editingNote.title}
                        onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                        className="note-input"
                      />
                      <textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                        className="note-textarea"
                        rows="4"
                      />
                      <div className="edit-buttons">
                        <button onClick={saveEdit} className="save-btn">Save</button>
                        <button onClick={cancelEditing} className="cancel-btn">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{note.title}</h3>
                      <p>{note.content}</p>
                      <div className="note-meta">
                        <small>
                          {new Date(note.created_at).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="note-actions">
                        <button 
                          onClick={() => startEditing(note)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteNote(note.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App 