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

        // Use regex to find the rating.
        // Logic: Look for the specific rating class structure often found in CodeChef profiles.
        // Usually: <div class="rating-number">2600</div> or matching JSON data if embedded.
        // A simple regex to find the number within the rating-number div.
        const ratingMatch = html.match(/<div class="rating-number">(\d+)<\/div>/);

        if (ratingMatch && ratingMatch[1]) {
            return parseInt(ratingMatch[1], 10);
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
