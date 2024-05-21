import { createContext } from 'react';
import { theme } from '../theme';

export const ThemeContext = createContext(theme);

export const ThemeProvider = ThemeContext.Provider;
