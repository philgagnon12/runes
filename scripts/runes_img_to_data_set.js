
const fs = require("fs");

const rune_gifs = fs.readdirSync( __dirname + "/../public/runes");

let runes = [];

const rune_names = rune_gifs.map(function(filename){

	const rune_index = filename.substring(0,2);

	const rune_name = filename.substring("00rune".length, filename.indexOf(".gif"));

	runes.push({ index: parseInt(rune_index),
				 name : rune_name });
});

fs.writeFileSync( __dirname + "/../src/RunesDataSet.js", `const RunesDataSet = ` + JSON.stringify(runes, null, " ") + `
export default RunesDataSet;`);

