import json from "./json/test.json";
import path from "path";

export default function*(){
	yield json.hello;
	yield path.parse(__filename).ext;
	yield path;
};