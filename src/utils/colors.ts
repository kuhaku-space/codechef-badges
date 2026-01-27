const colors = {
    unrated: '#000000',
    gray: '#666666',
    green: '#1E7D22',
    blue: '#3366CC',
    purple: '#684273',
    yellow: '#FFBF00',
    orange: '#FF7F00',
    red: '#D0011B',
};

export function getColor(rate: number | null): string {
    if (rate === null) return colors.unrated;
    else if (rate < 1400) return colors.gray;
    else if (rate < 1600) return colors.green;
    else if (rate < 1800) return colors.blue;
    else if (rate < 2000) return colors.purple;
    else if (rate < 2200) return colors.yellow;
    else if (rate < 2500) return colors.orange;
    else return colors.red;
}
