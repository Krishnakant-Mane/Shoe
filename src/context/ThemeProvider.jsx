import { useEffect, useState } from 'react'
import ThemeContext from './ThemeContext'
const ThemeProvider = ({children}) => {

    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    const [theme, setTheme] = useState(getInitialTheme());
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    const value = {
        theme,
        toggleTheme,
    };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider;