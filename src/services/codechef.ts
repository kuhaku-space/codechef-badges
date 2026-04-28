import axios from 'axios';

const userRatingURL = (name: string) => `https://www.codechef.com/users/${name}`;

export async function fetchCodeChefRate(name: string): Promise<number | null> {
    console.log(`Fetching '${name}'...`);
    try {
        const results = await axios.get(userRatingURL(name), {
            headers: {
                // Set a browser-like User-Agent to avoid being blocked by some sites
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = results.data;

        // Rating history is embedded as JSON in Drupal.settings under date_versus_rating.all.
        // The last entry in the array is the most recent contest rating.
        const allBlockMatch = html.match(/"date_versus_rating":\{"all":\[([\s\S]*?)\]\}/);
        if (allBlockMatch) {
            const ratingMatches = allBlockMatch[0].match(/"rating":"(\d+)"/g);
            if (ratingMatches && ratingMatches.length > 0) {
                const lastMatch = ratingMatches[ratingMatches.length - 1].match(/"rating":"(\d+)"/);
                if (lastMatch) return parseInt(lastMatch[1], 10);
            }
        }

        console.error(`Could not find rating in HTML for ${name}`);
        return null;
    } catch (error: any) {
        console.error(`Error fetching ${name}:`, error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
        }
        return null;
    }
}
