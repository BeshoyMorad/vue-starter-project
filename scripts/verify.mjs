import { execSync } from 'node:child_process';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

const runCommand = (name, command) => {
  console.log(`${colors.blue}▶ Running ${name}...${colors.reset}`);
  const start = performance.now();
  try {
    execSync(command, { stdio: 'inherit' });
    const end = performance.now();
    const time = ((end - start) / 1000).toFixed(2);
    console.log(`${colors.green}✔ ${name} passed (${time}s)${colors.reset}\n`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✖ ${name} failed!${colors.reset}\n`);
    return false;
  }
};

console.log(`\n${colors.bold}${colors.yellow}🚀 Starting Project Verification...${colors.reset}\n`);

const steps = [
  { name: 'Prettier Formatting', cmd: 'npm run format' },
  { name: 'ESLint Code Linting', cmd: 'npm run lint:fix' },
  { name: 'TypeScript Type Checking', cmd: 'npm run type-check' },
];

let allPassed = true;

for (const step of steps) {
  if (!runCommand(step.name, step.cmd)) {
    allPassed = false;
    break;
  }
}

console.log('----------------------------------------');
if (allPassed) {
  console.log(
    `${colors.bold}${colors.green}✨ SUCCESS: Codebase is clean and typed.${colors.reset}\n`
  );
} else {
  console.log(
    `${colors.bold}${colors.red}🚨 FAILURE: Please fix the errors above.${colors.reset}\n`
  );
  process.exit(1);
}
