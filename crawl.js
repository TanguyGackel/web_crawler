function normalizeURL(url){
    const Url = new URL(url);
    let path = Url.host + Url.pathname;

    if (path.length > 0 && path.slice(-1) === '/'){
        path = path.slice(0, -1);
    }
    return path;
}

function getUrlsFromHTML(string){

}

module.exports = {normalizeURL};