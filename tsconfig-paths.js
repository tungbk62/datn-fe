const tsConfig = require("./tsconfig.server.json");
const tsConfigPaths = require("tsconfig-paths");

let { baseUrl, paths } = tsConfig.compilerOptions;
for (path in paths) {
  paths[path][0] = paths[path][0]
    .replace("src/server", "dist")
    .replace(".ts", ".js");
}
tsConfigPaths.register({ baseUrl, paths });
