import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from 'axios';

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

function getColor(rate: number | null): string {
    if (rate === null) return colors.unrated;
    else if (rate < 1400) return colors.gray;
    else if (rate < 1600) return colors.green;
    else if (rate < 1800) return colors.blue;
    else if (rate < 2000) return colors.purple;
    else if (rate < 2200) return colors.yellow;
    else if (rate < 2500) return colors.orange;
    else return colors.red;
}

const userRatingURL = (name: string) => `https://codechef-api.vercel.app/handle/${name}`;

async function fetchCodeChefRate(name: string | string[] | null): Promise<number | null> {
    if (name == null) return null;
    if (Array.isArray(name)) return null;
    console.log(`Fetching '${name}'...`);
    try {
        const results = await axios.get(userRatingURL(name));
        if (!results.data.success) return null;
        return results.data.currentRating;
    } catch (error) {
        return null;
    }
}

export default function (req: VercelRequest, res: VercelResponse) {
    const { name = null } = req.query;
    fetchCodeChefRate(name).then((rate: number | null) => {
        let color = getColor(rate);
        return res.json({ schemaVersion: 1, label: "CodeChef", message: rate, color: color, cacheSeconds: 3600 })
    });
}
