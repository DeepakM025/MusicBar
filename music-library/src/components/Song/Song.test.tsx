import React from "react";
import { render } from "@testing-library/react";
import Song from "./Song";
import styles from "./Song.module.css"; // Adjust the path as necessary
import '@testing-library/jest-dom/extend-expect';

describe("Song Component", () => {
    it("renders the song title, artist, and album", () => {
        const { getByText } = render(<Song title="Song Title" artist="Artist Name" album="Album Name" />);
        
        expect(getByText("Song Title")).toBeInTheDocument();
        expect(getByText("Artist Name")).toBeInTheDocument();
        expect(getByText("Album Name")).toBeInTheDocument();
    });

    it("applies the correct CSS classes", () => {
        const { container } = render(<Song title="Song Title" artist="Artist Name" album="Album Name" />);
        
        const songItem = container.querySelector("li");
        const title = container.querySelector(`.${styles.title}`);
        const artist = container.querySelector(`.${styles.artist}`);
        const album = container.querySelector(`.${styles.album}`);
        
        expect(songItem).toHaveClass(styles.songItem);
        expect(title).toHaveClass(styles.title);
        expect(artist).toHaveClass(styles.artist);
        expect(album).toHaveClass(styles.album);
    });
});
