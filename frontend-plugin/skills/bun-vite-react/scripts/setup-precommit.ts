#!/usr/bin/env bun
/**
 * Set up pre-commit hooks for Bun + Vite + React + TypeScript projects.
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[91m',
  green: '\x1b[92m',
  yellow: '\x1b[93m',
};

async function runCommand(cmd: string[]): Promise<{ success: boolean; output: string }> {
  try {
    const proc = Bun.spawn(cmd, {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    return {
      success: exitCode === 0,
      output: output + error,
    };
  } catch (error) {
    return { success: false, output: String(error) };
  }
}

async function checkPrecommitConfigExists(): Promise<boolean> {
  const file = Bun.file('.husky/pre-commit');
  return await file.exists();
}

async function installHusky(): Promise<boolean> {
  console.log('Installing husky...');
  const { success, output } = await runCommand(['bun', 'add', '-d', 'husky']);

  if (!success) {
    console.log(`${colors.red}Failed to install husky:${colors.reset}\n${output}`);
    return false;
  }

  console.log(`${colors.green}✓ husky installed${colors.reset}`);
  return true;
}

async function initHusky(): Promise<boolean> {
  console.log('Initializing husky...');
  const { success, output } = await runCommand(['bun', 'run', 'husky', 'init']);

  if (!success) {
    console.log(`${colors.red}Failed to initialize husky:${colors.reset}\n${output}`);
    return false;
  }

  console.log(`${colors.green}✓ husky initialized${colors.reset}`);
  return true;
}

async function setupPreCommitHook(): Promise<boolean> {
  console.log('Setting up pre-commit hook...');
  
  const hookContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run verification before commit
bun run verify
`;

  try {
    await Bun.write('.husky/pre-commit', hookContent);
    await runCommand(['chmod', '+x', '.husky/pre-commit']);
    console.log(`${colors.green}✓ pre-commit hook configured${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}Failed to create pre-commit hook:${colors.reset}\n${error}`);
    return false;
  }
}

async function addVerifyScript(): Promise<boolean> {
  console.log('Checking package.json for verify script...');
  
  try {
    const packageJson = await Bun.file('package.json').json();
    
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (!packageJson.scripts.verify) {
      packageJson.scripts.verify = 'bun run scripts/verify.ts';
      await Bun.write('package.json', JSON.stringify(packageJson, null, 2) + '\n');
      console.log(`${colors.green}✓ Added verify script to package.json${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠ verify script already exists in package.json${colors.reset}`);
    }
    
    return true;
  } catch (error) {
    console.log(`${colors.yellow}⚠ Could not update package.json:${colors.reset} ${error}`);
    return true; // Non-fatal
  }
}

function parseArgs(): { skipRun: boolean } {
  const args = process.argv.slice(2);
  return {
    skipRun: args.includes('--skip-run'),
  };
}

async function main() {
  const args = parseArgs();

  console.log(`${colors.bright}🔧 Setting up pre-commit hooks${colors.reset}\n`);

  // Install husky
  if (!await installHusky()) {
    process.exit(1);
  }

  // Initialize husky
  if (!await initHusky()) {
    process.exit(1);
  }

  // Set up pre-commit hook
  if (!await setupPreCommitHook()) {
    process.exit(1);
  }

  // Add verify script to package.json
  await addVerifyScript();

  console.log(`\n${colors.green}✅ Pre-commit setup complete!${colors.reset}`);
  console.log('\nPre-commit hooks will now run automatically on git commit.');
  console.log('To run manually: bun run verify');
}

main();
