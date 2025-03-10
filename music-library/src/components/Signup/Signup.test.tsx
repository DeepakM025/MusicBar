import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";
import '@testing-library/jest-dom/extend-expect';
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

describe("Signup Component", () => {
    beforeEach(() => {
        window.alert = jest.fn();
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
    });

    test("renders Signup form", () => {
        expect(screen.getByText("Signup Page")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    });

    test("shows error when passwords do not match", () => {
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "password321" } });
        fireEvent.click(screen.getByRole("button", { name: /signup/i }));
        expect(toast.error).toHaveBeenCalledWith("Passwords do not match!");
    });

    test("successful signup and redirect", () => {
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "password123" } });
        fireEvent.click(screen.getByRole("button", { name: /signup/i }));

        expect(toast.success).toHaveBeenCalledWith("Signup successful! Redirecting to login...");
        expect(localStorage.getItem("user")).toEqual(JSON.stringify({ username: "testuser", password: "password123", role: "user" }));
    });

    test("role selection works correctly", () => {
        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "password123" } });
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "admin" } });
        fireEvent.click(screen.getByRole("button", { name: /signup/i }));

        expect(localStorage.getItem("user")).toEqual(JSON.stringify({ username: "testuser", password: "password123", role: "admin" }));
    });
});
