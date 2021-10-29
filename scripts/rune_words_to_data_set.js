const spawn = require("child_process");
const fs = require("fs");


function convertRunewordHtmlToJs(filename, categories)
{

    const args = ["convert_rune_word_html_to_js.js",
                 __dirname + "/../resources/" + filename,
                 ...categories ];

    return spawn.execFileSync("node",args,{ cwd: __dirname, encoding : "ascii"});
}

const original = convertRunewordHtmlToJs("runewords-original.shtml.html", ["original"] );
const one_one_ten = convertRunewordHtmlToJs("runewords-110.shtml.html", ["110", "1.10"] );
const one_one_eleven = convertRunewordHtmlToJs("runewords-111.shtml.html", ["111", "1.11"] );

let runewords = JSON.parse(original);

runewords = runewords.concat(JSON.parse(one_one_ten));
runewords = runewords.concat(JSON.parse(one_one_eleven));


fs.writeFileSync( __dirname + "/../src/RuneWordsDataSet.js", `const RuneWordsDataSet = ` + JSON.stringify(runewords, null, " ") + `
export default RuneWordsDataSet;`);




