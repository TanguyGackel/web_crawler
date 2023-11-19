const {JSDOM} = require('jsdom')

function normalizeURL(url){
    const Url = new URL(url);
    let path = Url.protocol + "//" + Url.host + Url.pathname;

    if (path.length > 0 && path.slice(-1) === '/')
        path = path.slice(0, -1);
    return path;
}

function getUrlsFromHTML(string, url){
    const dom = new JSDOM(string);

    let aTag = dom.window.document.querySelectorAll('a');
    let newUrls = [];
    for(let i = 0; i < aTag.length; i++){
        let temp = '';
        if(aTag[i].href.length > 0 && aTag[i].href.slice(0, 1) === '/')
            temp = url;

        newUrls.push(temp + aTag[i].href);
    }

    return Array.from(new Set(newUrls));
}

async function crawlPage(root, current, pages){
    if(extractDomain(root) !== extractDomain(current))
        return pages;

    let normalized = normalizeURL(current);

    let existing = pages.find(page => page.key === normalized);
    if(existing) {
        ++existing.value;
        return pages;
    }
    pages.push({
        key: normalized,
        value : root !== normalized ? 1 : 0
    })

    try {
        console.log("try fetching " + normalized)
        const response = await fetch(normalized);
        if (!response.ok)
            throw new Error("Network error : " + response.status + " on " + response.url);

        if (!(response.headers.get("Content-Type").includes("text/html")))
            throw new Error("Content not of type text/html : " + response.status + " on " + response.url);

        let newUrls = getUrlsFromHTML(await response.text(), root);

        for (const url of newUrls) {
            pages = await crawlPage(root, url, pages);
        }

        return pages;
    } catch (e) {
        console.error("There was a problem with a fetch operation : " + e);
        return pages;
    }
}

function extractDomain(url) {
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/i, '');
    return domain.split('/')[0];
}

module.exports = {normalizeURL, getUrlsFromHTML, crawlPage, extractDomain};