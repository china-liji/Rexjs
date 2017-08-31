### 整项目开发时的 node 文件

- dev.js 用于 rex.js 开发及测试环境的 node 文件，占用端口：729，开启两个主要地址：
	1. [http://localhost:729/dev/index.html](http://localhost:729/dev/index.html)，这是开发环境；
	2. [http://localhost:729/test/index.html](http://localhost:729/test/index.html)，这是测试环境。

- index.js 是本文件夹里最主要的文件，其他 node 文件均要引用本脚本。目的用于合并 rex-es.js 的分解文件。

- unglify.js 主要是用于压缩、合并 rex.js 的各个组成文件，需全局安装 webpack。