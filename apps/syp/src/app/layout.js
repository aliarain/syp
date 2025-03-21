import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'ShipYourApp - Cursor Rules Directory',
    description: 'Browse, search, and copy rules to enhance your Cursor AI experience',
};

export default function RootLayout({ children }) {
    return ( <
        html lang = "en"
        suppressHydrationWarning >
        <
        body className = { inter.className } >
        <
        ThemeProvider attribute = "class"
        defaultTheme = "system"
        enableSystem disableTransitionOnChange >
        { ' ' } { children } < Toaster / >
        <
        /ThemeProvider>{' '} <
        /body>{' '} <
        /html>
    );
}