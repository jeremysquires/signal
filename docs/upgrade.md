npx npm-check-updates -u
Need to install the following packages:
npm-check-updates@23.1.0
Ok to proceed? (y) y
Upgrading src\api\package.json
[====================] 17/17 100%

Patch   Backwards-compatible bug fixes
 csvtojson      ^2.0.8  ?  ^2.0.14
 json-function  ^1.8.1  ?  ^1.8.39

Minor   Backwards-compatible features
 koa-bodyparser    ^4.2.1  ?   ^4.4.1
 lodash          ^4.17.21  ?  ^4.18.1

Major   Potentially breaking API changes
 @koa/cors            ^3.0.0  ?    ^5.0.0
 axios               ^0.21.2  ?   ^1.20.0
 eslint              ^5.15.3  ?  ^10.10.0
 eslint-plugin-node   ^8.0.1  ?   ^11.1.0
 fs-extra             ^7.0.1  ?   ^11.4.0
 jest                ^29.3.1  ?   ^30.5.1
 koa                 ^2.15.4  ?    ^3.2.1
 koa-router           ^7.4.0  ?   ^14.0.0
 supertest            ^4.0.2  ?    ^7.2.2

Major version zero   Anything may change
 jmespath  ^0.15.0  ?  ^0.16.0

Run npm install to install new versions.
npm notice
npm notice New major version of npm available! 11.19.0 -> 12.0.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
npm notice To update run: npm install -g npm@12.0.2
npm notice

src\api>npm install

npm warn deprecated koa-router@14.0.0: Please use @koa/router instead, starting from v9!
npm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me

added 116 packages, removed 250 packages, changed 168 packages, and audited 504 packages in 23s

91 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:
npm warn install-scripts   @parcel/watcher@2.6.0 (install: node scripts/build-from-source.js)
npm warn install-scripts   unrs-resolver@1.12.2 (postinstall: node postinstall.js)
npm warn install-scripts
npm warn install-scripts Run `npm install-scripts ls` to review, or `npm install-scripts approve <pkg>` to allow.


