import { useState } from 'react';
import { FontSansSerifIcon, FontSerifIcon, FontMonoSpaceIcon } from '../../../../icons';
import RadioOption from '../../../../RadioOption/RadioOption';
import { useSettings } from '../../../../../context/SettingsContext';
import { useToast } from '../../../../../context/ToastContext';
import { updateFontAPI } from '../../../../../api/settings.api';
import styles from './FontSettings.module.css';

export default function FontSettings() {
    const { font, setFont } = useSettings(); 
    const [selectedFont, setSelectedFont] = useState(font); 
    const token = localStorage.getItem('authToken');
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFontAPI(token, selectedFont);
            setFont(selectedFont);
            showToast({ type: 'success', message: 'Font updated successfully!' });
        } catch (err) {
            if (err.message.includes('Too many')) {showToast({ type: 'error', message: err.message })};
            showToast({ type: 'error', message: 'Failed to update font.' });
        }
    };

    return (
        <form className={styles.themeForm} onSubmit={handleSubmit}>
            <div className="titleWrapper">
                <h2 className="text-preset-1">Font Theme</h2>
                <p>Choose your font theme:</p>
            </div>

            <div className={styles.optionWrapper}>
                <RadioOption
                    Icon={FontSansSerifIcon} id="sansSerif" name="theme" value="sans-serif"
                    title="Sans-Serif" 
                    description="Clean and modern, easy to read."
                    isChecked={selectedFont === "sans-serif"}
                    onChange={() => setSelectedFont("sans-serif")}
                />
                <RadioOption
                    Icon={FontSerifIcon} id="serif" name="theme" value="serif"
                    title="Serif" 
                    description="Classic and elegant for a timeless feel."
                    isChecked={selectedFont === "serif"}
                    onChange={() => setSelectedFont("serif")}
                />
                <RadioOption
                    Icon={FontMonoSpaceIcon} id="monospace" name="theme" value="monospace"
                    title="Monospace" 
                    description="Code-like, great for a technical vibe."
                    isChecked={selectedFont === "monospace"}
                    onChange={() => setSelectedFont("monospace")}
                />
            </div>

            <div className={styles.buttonWrapper}>
                <button type="submit" className={`blueButton ${styles.submitButton}`} id="applyButton">Apply Changes</button>
            </div>
        </form>
    );
}
