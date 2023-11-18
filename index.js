const { argv } = require('process');
const { crawlPage } = require('./crawl')

function main(){
    if(argv.length < 3 || argv.length > 3){
        console.log("ERROR : not the right amount of arguments")
        return;
    }
    console.log("Crawler starting at : " + argv[2])
    crawlPage(argv[2])
}

main()