import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Header Component', () => {
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            logout: mockLogout,
            isLoggedIn: false,
        });
        (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the header with title', () => {
        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        expect(screen.getByText('🎵 Music Bar')).toBeInTheDocument();
    });

    test('renders Signup button when not logged in and not on signup page', () => {
        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        expect(screen.getByText('Signup')).toBeInTheDocument();
    });

    test('renders Login button when not logged in and on signup page', () => {
        delete window?.location;
        window.location = { pathname: '/signup' } as Location;
        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders Logout button when logged in', () => {
        (useAuth as jest.Mock).mockReturnValue({
            logout: mockLogout,
            isLoggedIn: true,
        });

        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    test('calls logout function when Logout button is clicked', () => {
        (useAuth as jest.Mock).mockReturnValue({
            logout: mockLogout,
            isLoggedIn: true,
        });

        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText('Logout'));
        expect(mockLogout).toHaveBeenCalled();
    });

    test('navigates to signup page when Signup button is clicked from /login', () => {
        window.location = { pathname: '/login' } as Location;

        (useAuth as jest.Mock).mockReturnValue({
            logout: mockLogout,
            isLoggedIn: false,
        });

        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText('Signup'));
        expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });

    test('navigates to login page when Login button is clicked', () => {
        window.location = { pathname: '/signup' } as Location;

        render(
            <BrowserRouter>
                <Header username="testuser" />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText('Login'));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
