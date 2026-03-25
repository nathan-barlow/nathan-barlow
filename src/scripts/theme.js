const STORAGE_KEY = "natebarlow_theme";

const get = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let colorScheme = null;
    let hue = 150;

    try {
        const parsed = JSON.parse(saved);
        colorScheme = parsed?.colorScheme;
        hue = parseInt(parsed?.hue);
    } catch (e) {} // do nothing

    return { colorScheme, hue };
};

const load = ({ colorScheme = null, hue = null }) => {
    document.body.classList.remove("theme-light");
    document.body.classList.remove("theme-dark");

    if (colorScheme) {
        document.documentElement.style.colorScheme = colorScheme;
        document.body.classList.add("theme-" + colorScheme);
    } else {
        document.documentElement.style.removeProperty("color-scheme");
    }

    hue
        ? document.documentElement.style.setProperty("--primary-hue", hue)
        : document.documentElement.style.removeProperty("--primary-hue");
};

const set = (newSettings) => {
    const current = get();
    const value = { ...current, ...newSettings };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    load(value);
};

export const theme = { get, set, load };
