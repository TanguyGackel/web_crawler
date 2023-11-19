const crawl = require('../crawl');
const { test, expect } = require('@jest/globals')
const fs = require("fs");

test('normalize URLs', () => {
    expect(crawl.normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(crawl.normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(crawl.normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(crawl.normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
})

test('get new Urls', () => {
    const data = fs.readFileSync('./test.txt', 'utf8');

    let received = crawl.getUrlsFromHTML(data, 'https://www.youtube.com');

    let expected = ["https://www.youtube.com/",
                    "https://www.youtube.com/about/",
                    "https://www.youtube.com/about/press/",
                    "https://www.youtube.com/about/copyright/",
                    "https://www.youtube.com/t/contact_us/",
                    "https://www.youtube.com/creators/",
                    "https://www.youtube.com/ads/",
                    "https://developers.google.com/youtube",
                    "https://www.youtube.com/t/terms",
                    "https://www.youtube.com/t/privacy",
                    "https://www.youtube.com/about/policies/",
                    "https://www.youtube.com/howyoutubeworks?utm_campaign=ytgen&utm_source=ythp&utm_medium=LeftNav&utm_content=txt&u=https%3A%2F%2Fwww.youtube.com%2Fhowyoutubeworks%3Futm_source%3Dythp%26utm_medium%3DLeftNav%26utm_campaign%3Dytgen",
                    "https://www.youtube.com/new"]


    expect(received).toEqual(expected)
})

test('extract domain name', () =>{
    expect(crawl.extractDomain('https://www.wagslane.dev/')).toBe("wagslane.dev");
})