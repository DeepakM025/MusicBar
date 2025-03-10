import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MusicLibrary from "./MusicLibrary";
import songs from "../../utils/songs.json";
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from "../../context/AuthContext";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    callback: any;
    root: Element | null = null;
    rootMargin: string = "0px";
    thresholds: ReadonlyArray<number> = [];
    constructor(callback: any) {
        this.callback = callback;
    }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() {
        return [];
    }
};

describe("MusicLibrary Component", () => {
        render(
            <AuthProvider>
                <MusicLibrary />
            </AuthProvider>
        );
        render(<MusicLibrary />);

    test("renders MusicLibrary with title", () => {
        expect(screen.getByText("🎵 Welcome to the Music Library!")).toBeInTheDocument();
    });


    test("filters songs based on user input", () => {
        const input = screen.getByPlaceholderText("Search by title, artist, or album");
        fireEvent.change(input, { target: { value: songs.musics[0].title } });
        expect(screen.getByText(songs.musics[0].title)).toBeInTheDocument();
    });

    test("groups songs by artist", async () => {
        const select = screen.getByText("Group by");
        fireEvent.change(select, { target: { value: "artist" } });
        await waitFor(() => {
            expect(screen.getByText(songs.musics[0].artist)).toBeInTheDocument();
        });
    });

    test("loads more songs on scroll", async () => {
        expect(screen.getAllByRole("listitem").length).toBeLessThanOrEqual(10); // Initial batch size
        fireEvent.scroll(window, { target: { scrollY: 1000 } });
        await waitFor(() => {
            expect(screen.getAllByRole("listitem").length).toBeGreaterThan(9);
        });
    });

    test("resets filters when reset button is clicked", () => {
        const resetButton = screen.getByText("Reset");
        fireEvent.click(resetButton);
        const input = screen.getByPlaceholderText("Search by title, artist, or album") as HTMLInputElement;
        expect(input.value).toBe("");
    });
});