import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddSong from './AddSong';

describe('AddSong Component', () => {
    const mockOnClose = jest.fn();
    const mockOnAddSong = jest.fn();
    const mockOnDeleteSong = jest.fn();
    const mockSongs = [
        { title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
        { title: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    ];

    it('renders without crashing when isOpen is true', () => {
        const { getByText } = render(
            <AddSong
                isOpen={true}
                onClose={mockOnClose}
                onAddSong={mockOnAddSong}
                onDeleteSong={mockOnDeleteSong}
                songs={mockSongs}
            />
        );
        expect(getByText('Add Song')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        const { queryByText } = render(
            <AddSong
                isOpen={false}
                onClose={mockOnClose}
                onAddSong={mockOnAddSong}
                onDeleteSong={mockOnDeleteSong}
                songs={mockSongs}
            />
        );
        expect(queryByText('Add Song')).not.toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        const { getByText } = render(
            <AddSong
                isOpen={true}
                onClose={mockOnClose}
                onAddSong={mockOnAddSong}
                onDeleteSong={mockOnDeleteSong}
                songs={mockSongs}
            />
        );
        fireEvent.click(getByText('Close'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onAddSong with correct data when add button is clicked', () => {
        const { getByPlaceholderText, getByText } = render(
            <AddSong
                isOpen={true}
                onClose={mockOnClose}
                onAddSong={mockOnAddSong}
                onDeleteSong={mockOnDeleteSong}
                songs={mockSongs}
            />
        );

        fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'New Song' } });
        fireEvent.change(getByPlaceholderText('Artist'), { target: { value: 'New Artist' } });
        fireEvent.change(getByPlaceholderText('Album'), { target: { value: 'New Album' } });

        fireEvent.click(getByText('Add'));

        expect(mockOnAddSong).toHaveBeenCalledWith({
            title: 'New Song',
            artist: 'New Artist',
            album: 'New Album',
        });
    });
});
