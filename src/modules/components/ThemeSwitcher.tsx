import { useTheme } from '../theme.ts';
import { CLASSES } from '../constants';

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
            <span className={CLASSES.common.materialIcons}>brightness_6</span>
            Тема: {themeTextMap[theme]}
        </a>
    );
}
