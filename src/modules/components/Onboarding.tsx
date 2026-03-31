import { useState, useEffect } from 'preact/hooks';
import { CLASSES } from '../constants';

export default function Onboarding() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasShown = localStorage.getItem('etis3_onboarding_offline');
        if (!hasShown) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('etis3_onboarding_offline', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-card">
                <div className="onboarding-icon">
                    <span className={CLASSES.common.materialIcons}>cloud_off</span>
                </div>
                <div className="onboarding-content">
                    <h3>Офлайн-расписание</h3>
                    <p>Теперь расширение автоматически сохраняет ваше расписание.</p>
                    <p>
                        Чтобы посмотреть расписание, нажмите на иконку расширения в меню браузера и
                        выберите &rdquo;Просмотр офлайн расписания&rdquo;.
                    </p>
                    <p>Все ваши данные хранятся только на вашем компьютере.</p>
                    <button className="onboarding-btn" onClick={handleClose}>
                        Понятно!
                    </button>
                </div>
            </div>
        </div>
    );
}
