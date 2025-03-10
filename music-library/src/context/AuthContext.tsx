import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (userName: string, password: string) => void;
    logout: () => void;
    username: string | null;
    role: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();
    const successNotify = (msg: string) => toast.success(msg);
    const alertNotify = (msg: string) => toast.error(msg);

    const login = (username: string, password: string) => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const storedRole = storedUser?.role;
        if (!storedUser || !storedRole) {
            alertNotify("User not found! Please sign up first.");
            return;
        }
        const generateToken = (username: string) => {
            return btoa(JSON.stringify({ username, createdAt: Date.now() })); // Base64 encoding
        };
        // Validate username and password
        if (storedUser.username === username && storedUser.password === password) {
            // alert(`Login successful! Role: ${storedRole}. Redirecting to music...`);
            const token = generateToken(username);
            localStorage.setItem("authToken", token);
            setIsLoggedIn(true);
            navigate("/music");
            successNotify('Login successful!');
            setUsername(storedUser?.username);
            setRole(storedUser?.role);
        } else {
            alertNotify(`Invalid credentials!`);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        navigate('/login');
        successNotify('Logout successful!');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
