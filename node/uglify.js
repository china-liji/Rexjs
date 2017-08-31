new function(PROJECT_PATH){

this.Uglify = function(SOURCE_PATH, childProcess, fs, console){
	return class Uglify {
		constructor(){
			var apiFiles, cmds, execCmd;

			apiFiles = [
				`${SOURCE_PATH}/rex-core.js`,
				`${SOURCE_PATH}/rex-syntax.js`,
				`${SOURCE_PATH}/rex-es.js`
			]
			.join(" ");

			cmds = [
				"node index.js",
				`webpack ${apiFiles} ${PROJECT_PATH}/rex-api.min.js -p`,
				`webpack ${apiFiles} ${SOURCE_PATH}/rex-helper.js ${PROJECT_PATH}/rex.min.js -p`,
			];
			
			execCmd = (cmd) => {
				console.log(
					cmd.split(PROJECT_PATH).join("")
				);

				childProcess.exec(
					cmd,
					(err) => {
						if(err){
							throw `压缩、合并文件失败：${err}...`;
							return;
						}

						cmds.shift();
						
						if(cmds.length > 0){
							execCmd(cmds[0]);
							return;
						}

						console.log("rex-api.min.js: module.exports = Rexjs");

						fs.appendFile(
							`${PROJECT_PATH}/rex-api.min.js`,
							`\n(typeof exports==="object"&&typeof module==="object"?module:{}).exports=Rexjs;`,
							"utf8",
							(err) => {
								if(err){
									throw "api 文件追加 node 模块输出失败...";
								}
							}
						);
					}
				);
			};

			execCmd(cmds[0]);
		};
	};
}(
	// SOURCE_PATH
	`${PROJECT_PATH}/source`,
	// childProcess
	require("child_process"),
	// fs
	require("fs"),
	console
);

new this.Uglify();

}(
	// PROJECT_PATH
	require("path").resolve(__dirname, "../")
);