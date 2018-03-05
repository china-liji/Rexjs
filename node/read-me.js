import template from "../doc/read-me/template.md";
import { Lang, Config } from "../doc/read-me/config.js";
import path from "path";
import fs from "fs";

[
	{
		filename: path.resolve(__dirname, "../doc/read-me/chinese.md"),
		property: "cn"
	}, {
		filename: path.resolve(__dirname, "../doc/read-me/english.md"),
		property: "en"
	}, {
		filename: path.resolve(__dirname, "../ReadMe.md"),
		property: "en",
	}
]
.forEach((info) => {
	var result, { filename, property } = info, p = path.parse(filename);

	result = template.replace(
		/\{\{\s*(\S+?)\s*\}\}/g,
		(str, key) => {
			var value = Config[key];

			if(value instanceof Lang){
				return value[property];
			}

			if(typeof value === "string"){
				return value;
			}

			throw `不支持该模板：key - ${key}，value - ${value}`;
		}
	);

	console.log(`正在写入文件：${filename}`);

	// 写入文件
	fs.writeFileSync(filename, result, "utf8");
});