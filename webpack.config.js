module.exports = new function(DIR_NAME, path){

this.entry = {
	"dev": path.resolve(DIR_NAME, "./dev/index.ts"),
	"test": path.resolve(DIR_NAME, "./dev/index.ts")
};

this.output = {
	filename: "[name]/dist.js",
	path: DIR_NAME
};

this.module = {
	rules: [{
		test: /\.ts$/,
		use: "ts-loader"
	}]
};

this. resolve = {
	extensions: ['.ts', '.js']
}

this.devServer = {
	contentBase: DIR_NAME,
	port: 9090,
	before: (app, server) => {
		app.all(
			/^\/(?!dev|source|test).*/,
			(req, res, next) => {
				next();
			}
		);
	}
};

this.devtool = "source-map";

}(
	__dirname,
	// path
	require("path")
);