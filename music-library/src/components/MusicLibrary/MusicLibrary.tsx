import React, { useState, useRef, useEffect, useCallback } from "react";
import songs from "../../utils/songs.json";
import Song from "../Song/Song";
import styles from "./MusicLibrary.module.css";

interface SongData {
  title: string;
  artist: string;
  album: string;
}

const BATCH_SIZE = 10; // Load 10 songs at a time
const MAX_SONGS = 60; // Set max limit to 60

const MusicLibrary: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [sortKey, setSortKey] = useState<"title" | "artist" | "album" | "">("");
  const [groupKey, setGroupKey] = useState<"artist" | "">("");
  const [visibleSongs, setVisibleSongs] = useState<SongData[]>([]);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastSongRef = useRef<HTMLDivElement | null>(null);

  // Filtering
  const filteredSongs = songs.musics?.filter((song: SongData) =>
    [song.title, song.artist, song.album].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Sorting
  const sortedSongs = [...filteredSongs].sort((a: SongData, b: SongData) => {
    if (sortKey) return a[sortKey].localeCompare(b[sortKey]);
    return 0;
  });

  // Grouping
  const groupedSongs = groupKey
    ? sortedSongs.reduce((acc, song) => {
        const key = song[groupKey];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {} as Record<string, SongData[]>)
    : { "All Songs": sortedSongs };

  // Load more songs when scrolling (Limit to MAX_SONGS)
  const loadMoreSongs = () => {
    if (loadedCount >= MAX_SONGS) return; // Stop loading if max limit is reached

    setIsLoading(true);
    setTimeout(() => {
      const newLoadedCount = Math.min(loadedCount + BATCH_SIZE, MAX_SONGS); // Ensure we don’t exceed the limit
      setVisibleSongs(sortedSongs.slice(0, newLoadedCount));
      setLoadedCount(newLoadedCount);
      setIsLoading(false);
    }, 1000);
  };

  // Infinite scroll observer
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && loadedCount < MAX_SONGS) {
        loadMoreSongs();
      }
    },
    [loadedCount, isLoading]
  );

  useEffect(() => {
    if (lastSongRef.current) {
      observerRef.current = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 1.0,
      });
      observerRef.current.observe(lastSongRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [visibleSongs, observerCallback]);

  // Reset filters
  const resetFilters = () => {
    setFilter("");
    setSortKey("");
    setGroupKey("");
    setVisibleSongs(sortedSongs.slice(0, BATCH_SIZE));
    setLoadedCount(BATCH_SIZE);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎵 Welcome to the Music Library!</h2>

      {/* Filters */}
      <input
        type="text"
        placeholder="Search by title, artist, or album"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.input}
      />
      <div className='flex'>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as "title" | "artist" | "album" | "")}
          className={styles.select}
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>

        <select
          value={groupKey}
          onChange={(e) => setGroupKey(e.target.value as "artist" | "")}
          className={styles.select}
        >
          <option value="">Group by</option>
          <option value="artist">Artist</option>
        </select>

        <button onClick={resetFilters} className={styles.resetButton}>
          Reset
        </button>
      </div>

      {/* Songs List (Scrollable) */}
      <div className={styles.songList}>
        {Object.entries(groupedSongs).map(([group, songs]) => (
          <div key={group} className={styles.group}>
            <h2 className={styles.groupTitle}>{group}</h2>
            <ul className={styles.list}>
              {songs.slice(0, loadedCount).map((song, index) => (
                <Song key={index} title={song.title} artist={song.artist} album={song.album} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Loader (Visible while loading) */}
      {isLoading && <div className={styles.loader}>Loading more songs...</div>}

      {/* End of list message */}
      {loadedCount >= MAX_SONGS && <div className={styles.endMessage}>🎶 You have reached the end of the list!</div>}

      {/* Invisible div to track when user reaches the bottom */}
      <div ref={lastSongRef} className={styles.loader}></div>
    </div>
  );
};

export default MusicLibrary;
