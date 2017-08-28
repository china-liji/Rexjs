new function(PROJECT_PATH){

this.Uglify = function(SOURCE_PATH, childProcess, webpack){
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

						webpack(
							{
								entry: [
									`${SOURCE_PATH}/rex-core.js`,
									`${SOURCE_PATH}/rex-syntax.js`,
									`${SOURCE_PATH}/rex-es.js`,
									`${SOURCE_PATH}/rex-helper.js`
								],
								output: {
									path: PROJECT_PATH,
									filename: "rex.min.js"
								},
								plugins: [
									new webpack.optimize.UglifyJsPlugin()
								]
							},
							function(err, stats){
								if(err || stats.hasErrors()){
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
	require("child_process"),
	// webpack
	require("webpack")
);

new this.Uglify();

}(
	// PROJECT_PATH
	require("path").resolve(__dirname, "../")
);