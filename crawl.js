const {JSDOM} = require('jsdom')

function normalizeURL(url){
    const Url = new URL(url);
    let path = Url.host + Url.pathname;

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

    try {
        const response = await fetch(root);
        if (!response.ok)
            throw new Error("Network error : " + response.status + " on " + response.url);

        if (!(response.headers["Content-Type"] !== "text/html"))
            throw new Error("Content not of type text/html : " + response.status + " on " + response.url);

        console.log(await response.text());

    } catch (e) {
        console.error("There was a problem with a fetch operation : " + e);
    }

}

module.exports = {normalizeURL, getUrlsFromHTML, crawlPage};