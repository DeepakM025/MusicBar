import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import '@testing-library/jest-dom/extend-expect';
import Login from "./Login";

// Mock the useAuth hook
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Login Component", () => {
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

    render(<Login />);
  });

  it("renders login form correctly", () => {
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    const usernameInput = screen.getByPlaceholderText("Username") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls login function when form is submitted", () => {
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  it("does not call login when fields are empty", () => {
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.click(submitButton);

    expect(mockLogin).not.toHaveBeenCalled();
  });
});
