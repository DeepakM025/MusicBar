import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css"; // Import CSS file
import userAvatar from '../../assets/user-avatar.png';

const Header = ({ username }: { username: string }) => {
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const inSignup = window.location.pathname === '/signup';

    const HeaderButton = () => {
        return isLoggedIn ? (
            <>
                <span className={styles.username}><img src={userAvatar} alt={userAvatar} className={styles.useravatar} /> {username}</span>
                <button
                    onClick={logout}
                    className={styles.logoutButton}
                >
                    Logout
                </button>
            </> ) : (
                inSignup ?  <button
                onClick={() => navigate('/login')}
                className={styles.logoutButton}
            >
                Login
            </button>: 
                <button
                    onClick={() => navigate('/signup')}
                    className={styles.logoutButton}
                >
                    Signup
                </button>
        )
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>🎵 Music Bar</h1>
            <div className={styles.userContainer}>
                <HeaderButton />
            </div>
        </header>
    );
};

export default Header;
