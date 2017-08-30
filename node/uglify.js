new function(PROJECT_PATH){

this.Uglify = function(SOURCE_PATH, childProcess){
	return class Uglify {
		constructor(){
			new Promise(function(res, req){
				console.log("node index.js");

				childProcess.execFile(
					"node",
					[ "index.js" ],
					(err) => {
						if(err){
							req(err);
							return;
						}

						console.log("webpack ../source/rex-*.js ../rex.min.js -p");

						childProcess.exec(
							[
								"webpack",
								`${SOURCE_PATH}/rex-core.js`,
								`${SOURCE_PATH}/rex-syntax.js`,
								`${SOURCE_PATH}/rex-es.js`,
								`${SOURCE_PATH}/rex-helper.js`,
								`${PROJECT_PATH}/rex.min.js`,
								"-p"
							].join(" "),
							(err) => {
								if(err){
									req(err);
									return;
								}

								res();
							}
						);
					}
				);
			})
			.catch((e) => {
				throw `压缩、合并文件失败：${e}...`;
			});
		};
	};
}(
	// SOURCE_PATH
	`${PROJECT_PATH}/source`,
	// childProcess
	require("child_process")
);

new this.Uglify();

}(
	// PROJECT_PATH
	require("path").resolve(__dirname, "../")
);