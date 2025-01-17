/* eslint-disable no-console */
const { execSync } = require('child_process');
const { join } = require('path');
const { writeFileSync } = require('fs');

const cwd = join(__dirname, '../../..');

const tsVersion = '3.8';

console.log(`Installing typescript@${tsVersion}, and @types/node@14...`);

execSync(`yarn add --dev --ignore-workspace-root-check typescript@${tsVersion} @types/node@^14`, {
  stdio: 'inherit',
  cwd,
});

console.log('Removing unsupported tsconfig options...');

const baseTscConfigPath = join(cwd, 'packages/typescript/tsconfig.json');

const tsConfig = require(baseTscConfigPath);

// TS 3.8 fails build when it encounteres a config option it does not understand, so we remove it :(
delete tsConfig.compilerOptions.noUncheckedIndexedAccess;

writeFileSync(baseTscConfigPath, JSON.stringify(tsConfig, null, 2));
