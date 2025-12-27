import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Check localStorage for saved theme, default to 'cyber'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('gazisiber-theme') || 'cyber';
        }
        return 'cyber';
    });

    // Toggle between themes
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'cyber' ? 'midnight' : 'cyber'));
    };

    // Save theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('gazisiber-theme', theme);
        // Apply theme class to body for global CSS if needed
        document.body.className = `theme-${theme}`;
    }, [theme]);

    const value = {
        theme,
        setTheme,
        toggleTheme,
        isCyber: theme === 'cyber',
        isMidnight: theme === 'midnight'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
