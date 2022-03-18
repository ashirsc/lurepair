const fs = require("fs");

const pkgPath = "./node_modules/foo/";

if (!fs.existsSync(pkgPath)) {
  fs.mkdirSync(pkgPath);
}

fs.writeFile(pkgPath + "package.json", `{
  "name": "foo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC"
}`, () => "")

fs.writeFile(pkgPath + "index.js", `import content from "./foo-content"
export default content`, () => "")

fs.writeFile(pkgPath + "foo-content.js", `export default "normal-content"`, () => "")

fs.writeFile(pkgPath + "foo-content.web.js", `export default "web-only-content"`, () => "")