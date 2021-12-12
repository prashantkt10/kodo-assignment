// @ts-nocheck
const request = require("supertest");

const baseUrl = 'http://localhost:8989/';

describe('API backend server', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .get('health/check');

        expect(response.statusCode).toBe(200);
    });

    it('should have the correct response headers', async () => {
        const response = await request(baseUrl)
            .get('feed/search?sortBy=name&order=desc&keyword=prashant&page=1&limit=1');

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(200);
        expect(response.body.feed.length).toBe(response.body.currentFeedCount);
    });
});