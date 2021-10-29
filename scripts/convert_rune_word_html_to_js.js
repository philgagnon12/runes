const fs = require("fs");
const process = require("process");
const {NodeType, parse} = require("node-html-parser");
const sanitizeHtml = require("sanitize-html");

const argv = process.argv.slice(2)

const runeword_html_path = argv[0];
const runeword_categories = argv.slice(1);

const html_dirty = fs.readFileSync(runeword_html_path, {encoding:"ascii"});

const html = sanitizeHtml(html_dirty);


const root = parse(html);

const els = root.getElementsByTagName("*");


const regex = /Rune Words$/;

let rune_words = [];

els.forEach( function(el){

	const match = el.text.match(regex);

	if( match !== null && el.tagName === "SPAN" )
	{
		let rune_word_tr = el.parentNode.parentNode.nextSibling.nextSibling;


		while( rune_word_tr !== null )
		{


			const rune_word_tds = rune_word_tr.getElementsByTagName("td");

			const rune_word =
			{
				name: rune_word_tds[0].text,
				allowed_items: rune_word_tds[1].text,
				rune_order: rune_word_tds[2].text.split(" + "),
				completed_stats: rune_word_tds[3].text.trim().split('\r\n'),
				categories: [...runeword_categories, match.input] // TODO a parameter to this script coud give the categories ./runeworsd.js filename categories=1.10 .. and also keep match.input
			};

			rune_words.push(rune_word);

			rune_word_tr = rune_word_tr.nextElementSibling;
		}
	}

});

console.log(JSON.stringify(rune_words,null, " "));




