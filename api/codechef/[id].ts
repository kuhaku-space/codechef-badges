import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCodeChefRate } from '../../src/services/codechef';
import { getColor } from '../../src/utils/colors';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const name = req.query.id as string;

    if (!name) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    const rate = await fetchCodeChefRate(name);
    const color = getColor(rate);

    return res.json({
        schemaVersion: 1,
        label: "CodeChef",
        message: `${rate ?? 'Unrated'}`,
        color: color,
        cacheSeconds: 3600
    });
}
