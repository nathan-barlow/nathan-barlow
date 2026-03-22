const all = () => {
    const projects = import.meta.glob("../pages/projects/*.astro", {
        eager: true,
    });

    return Object.values(projects)
        .map((module) => ({
            ...module.metadata,
            url: module.url,
        }))
        .sort((a, b) => (a.order || 999) - (b.order || 999));
};

const types = () => {
    const projects = all();
    const types = projects.map((p) => p.type);
    return [...new Set(types)];
};

const toSlug = (title) => {
    return title.replaceAll(" ", "-").toLowerCase();
};

const trimText = (text, chars) => {
    if (text.length > chars) {
        text = text.slice(0, chars) + "...";
    }

    return text;
};

export const projects = {
    all,
    types,
    get: (filters) => {
        const { offset = 0, limit = -1, type } = filters;
        let projects = all();

        if (limit > 0 || offset) projects = projects.slice(offset, limit);
        if (type) projects = projects.filter((p) => p.type === type);

        return projects;
    },
    count: () => all().length,
    toSlug,
    trimText,
};
