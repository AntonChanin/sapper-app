const createClass = (classes: string[], classList: Record<string, string> = {}) => {
    let className = '';
    classes.forEach((item) => className = `${className} ${classList[item] ?? item}`);
    return className.replace('undefined', '').trimStart().trimEnd();
};

export default createClass

