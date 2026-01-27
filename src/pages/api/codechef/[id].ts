import { fetchCodeChefRate } from '@/services/codechef';
import { getColor } from '@/utils/colors';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
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
    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}
