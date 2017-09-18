new function(PROJECT_PATH){

this.Uglify = function(Source, Date, SOURCE_PATH, childProcess, fs, console){
	return class Uglify {
		constructor(){
			var files, cmds, execCmd;

			console.log(
				new Date().toLocaleString()
			);

			files = [
				`${SOURCE_PATH}/rex-core.js`,
				`${SOURCE_PATH}/rex-syntax.js`,
				`${SOURCE_PATH}/rex-es.js`,
				`${SOURCE_PATH}/rex-helper.js`
			];

			cmds = [
				`webpack ${files[0]} ${files[3]} ${PROJECT_PATH}/rex-browser-helper.min.js -p`,
				`webpack ${files.slice(0, -1).join(" ")} ${PROJECT_PATH}/rex-api.min.js -p`,
				`webpack ${files.join(" ")} ${PROJECT_PATH}/rex.min.js -p`,
			];
			
			execCmd = (cmd) => {
				console.log(
					cmd.split(PROJECT_PATH).join("")
				);

				childProcess.exec(
					cmd,
					(err) => {
						// 如果有错
						if(err){
							throw `压缩、合并文件失败：${err}...`;
							return;
						}

						// 去掉已经执行的第一条命令
						cmds.shift();
						
						// 如果还有命令没有执行
						if(cmds.length > 0){
							// 再取第一条执行
							execCmd(cmds[0]);
							return;
						}

						console.log("rex-api.min.js: module.exports = Rexjs");

						// 生成文件
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

			// 先生成 rex-es.js 文件
			new Source().generate();
			// 开始执行命令
			execCmd(cmds[0]);
		};
	};
}(
	require("./index").Source,
	Date,
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