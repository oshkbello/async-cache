const supertest = require("supertest")
const app = require('../../app')

describe("Testing the Ping Endpoint", () => {
    it("tests for Successesful ping", async () => {
        const response = await supertest(app).get('/api/ping')

        expect(response.statusCode).toBe(200)
    });
});

describe("Testing the Posts endpoint", () => {
    it("Tests for missing tag parameters", async () => {
        const response = await supertest(app).get('/api/posts')

        expect(response.statusCode).toBe(400)
    })

    it("Test for single tag", async () => {
        const response = await supertest(app).get('/api/posts?tags=tech')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(['value'])).toBe(true)
    })

    it("Test for Multiple tags", async () => {
        const response = await supertest(app).get('/api/posts?tags=tech,history,health')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(['value'])).toBe(true)
    })

    it("tests for invalid sortBy value", async () => {
        const response = await supertest(app).get('/api/posts?tags=tech&sortBy=read')

        expect(response.statusCode).toBe(400)
    })

    it("tests for valid sortBy value", async () => {
        const response = await supertest(app).get('/api/posts?tags=tech&sortBy=reads')

        expect(response.statusCode).toBe(200)
    })

    it("tests for invalid direction value", async () => {
        const response = await supertest(app).get('/api/posts?tags=tech&direction=ad')

        expect(response.statusCode).toBe(400)
    })
})
