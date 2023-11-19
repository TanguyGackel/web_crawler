const { argv } = require('process');
const { crawlPage, normalizeURL} = require('./crawl')

async function main(){
    if(argv.length < 3 || argv.length > 3){
        console.log("ERROR : not the right amount of arguments")
        return;
    }
    const root = normalizeURL(argv[2]);

    console.log("Crawler starting at : " + root);
    const pages = await crawlPage(root, root, [])

    for (const url in pages) {
        console.log(pages[url].key + " : " + pages[url].value)
    }
}

main()