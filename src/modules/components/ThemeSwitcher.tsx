import { useTheme } from '../theme.ts';

export default function ThemeSwitcher() {
    const { theme, cycleTheme } = useTheme();

    const themeTextMap = {
        auto: 'Системная',
        light: 'Светлая',
        dark: 'Темная',
    };

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        cycleTheme();
    };

    return (
        <a href="#" onClick={handleClick}>
            <span className="material-icons">brightness_6</span>
            Тема: {themeTextMap[theme]}
        </a>
    );
}
