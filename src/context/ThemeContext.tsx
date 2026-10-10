import { FluentProvider, type Theme, webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { createContext, useContext, useState } from "react";

export interface IThemeContextProps {
    theme: Theme;
    isDarkTheme: boolean;
    setTheme: (theme: Theme, isDarkTheme: boolean) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({
    theme: {} as Theme,
    isDarkTheme: false,
    setTheme: () => { }
});

export const useTheme = () => useContext<IThemeContextProps>(ThemeContext);

const isPreferredThemeDark = () => {
    if (localStorage.getItem("preferredTheme")) {
        return localStorage.getItem("preferredTheme") === "dark";
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider(props: React.PropsWithChildren<{ theme?: Theme, isDarkTheme?: boolean }>) {
    const [theme, setTheme] = useState<Theme>(props.theme || (isPreferredThemeDark() ? webDarkTheme as Theme : webLightTheme as Theme));
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(props.isDarkTheme || isPreferredThemeDark());


    return <ThemeContext.Provider value={{
        theme,
        isDarkTheme,
        setTheme: (theme: Theme, isDark: boolean) => { setTheme(theme); setIsDarkTheme(isDark); }
    }}>
        <FluentProvider theme={theme} targetDocument={document} applyStylesToPortals>
            {props.children}
        </FluentProvider>
    </ThemeContext.Provider>
}