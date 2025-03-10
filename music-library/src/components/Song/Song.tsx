import React from "react";
import styles from "./Song.module.css"; // Import CSS file

interface SongProps {
  title: string;
  artist: string;
  album: string;
}

const Song: React.FC<SongProps> = ({ title, artist, album }) => {
  return (
    <li className={styles.songItem}>
      <span className={styles.title}>{title}</span> - 
      <span className={styles.artist}>{artist}</span> 
      (<span className={styles.album}>{album}</span>)
    </li>
  );
};

export default Song;
