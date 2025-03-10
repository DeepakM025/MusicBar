import React, { useState } from "react";
import styles from "./AddSong.module.css";

interface AddSongProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSong: (song: { title: string; artist: string; album: string }) => void;
    onDeleteSong: (title: string) => void;
    songs: { title: string; artist: string; album: string }[];
}

const AddSong = ({ isOpen, onClose, onAddSong, onDeleteSong, songs } : AddSongProps) => {

  const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });

  const handleAdd = () => {
    if (newSong.title && newSong.artist && newSong.album) {
      onAddSong(newSong);
      setNewSong({ title: "", artist: "", album: "" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Add Song</h2>
        <input
          type="text"
          placeholder="Title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Album"
          value={newSong.album}
          onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
        />
        <button onClick={handleAdd} className={styles.addButton}>Add</button>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

export default AddSong;
