import assert from 'node:assert';
import { describe, it } from 'node:test';
import { fetchCodeChefRate } from '../src/services/codechef';
import { getColor } from '../src/utils/colors';

describe('CodeChef Badges', () => {
    describe('getColor', () => {
        it('should return black for unrated (null)', () => {
            assert.strictEqual(getColor(null), '#000000');
        });

        it('should return green for 1500', () => {
            assert.strictEqual(getColor(1500), '#1E7D22');
        });

        it('should return red for 2600', () => {
            assert.strictEqual(getColor(2600), '#D0011B');
        });
    });

    describe('fetchCodeChefRate', () => {
        it('should fetch rating for known user "tourist"', async () => {
            const rate = await fetchCodeChefRate('tourist');
            assert.ok(rate !== null, 'Rating should not be null for tourist');
            assert.strictEqual(typeof rate, 'number', 'Rating should be a number');
        });

        it('should return null for invalid user', async () => {
            const rate = await fetchCodeChefRate('invalid_user_12345');
            assert.strictEqual(rate, null);
        });

        it('should fetch rating for user "kuhqku"', async () => {
            const rate = await fetchCodeChefRate('kuhqku');
            assert.ok(rate !== null, 'Rating should not be null for kuhqku');
            assert.strictEqual(typeof rate, 'number', 'Rating should be a number');
        });
    });
});
