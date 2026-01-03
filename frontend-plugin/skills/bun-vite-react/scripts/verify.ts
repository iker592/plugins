#!/usr/bin/env bun
/**
 * Comprehensive verification script for Bun + Vite + React + TypeScript projects.
 * Runs linting, formatting, type checking, and tests with coverage.
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[91m',
  green: '\x1b[92m',
  yellow: '\x1b[93m',
  blue: '\x1b[94m',
  cyan: '\x1b[96m',
  magenta: '\x1b[95m',
};

interface CheckResult {
  name: string;
  passed: boolean;
  output?: string;
}

function printStep(message: string): void {
  console.log(`\n${colors.magenta}${colors.bright}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}${message}${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}${'='.repeat(60)}${colors.reset}\n`);
}

async function runCommand(
  cmd: string[],
  stepName: string
): Promise<{ success: boolean; output: string }> {
  try {
    const proc = Bun.spawn(cmd, {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    const error = await new Response(proc.stderr).text();
    const exitCode = await proc.exited;

    const combinedOutput = output + error;
    const success = exitCode === 0;

    if (success) {
      console.log(`${colors.green}✓ ${stepName} passed${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ ${stepName} failed${colors.reset}`);
      if (combinedOutput.trim()) {
        console.log(`${colors.yellow}Output:${colors.reset}`);
        console.log(combinedOutput);
      }
    }

    return { success, output: combinedOutput };
  } catch (error) {
    console.log(`${colors.red}✗ ${stepName} failed: ${error}${colors.reset}`);
    return { success: false, output: String(error) };
  }
}

async function checkBunInstalled(): Promise<boolean> {
  const { success } = await runCommand(['bun', '--version'], 'Bun installation check');
  return success;
}

async function runESLint(fix: boolean = false): Promise<boolean> {
  printStep('Running ESLint');
  const cmd = ['bun', 'run', 'eslint', '.'];
  if (fix) {
    cmd.push('--fix');
  }
  const { success } = await runCommand(cmd, 'eslint');
  return success;
}

async function runPrettier(checkOnly: boolean = true): Promise<boolean> {
  printStep('Running Prettier');
  const cmd = ['bun', 'run', 'prettier'];
  if (checkOnly) {
    cmd.push('--check', '.');
  } else {
    cmd.push('--write', '.');
  }
  const { success } = await runCommand(cmd, 'prettier');
  return success;
}

async function runTypeCheck(): Promise<boolean> {
  printStep('Running TypeScript Type Checking');
  const { success } = await runCommand(['bun', 'run', 'tsc', '--noEmit'], 'tsc');
  return success;
}

async function runTests(coverage: boolean = true, minCoverage: number = 80): Promise<boolean> {
  printStep('Running Tests with Vitest');
  const cmd = ['bun', 'run', 'vitest', 'run'];

  if (coverage) {
    cmd.push('--coverage');
    // Note: Coverage threshold configured in vitest.config.ts
  }

  const { success } = await runCommand(cmd, 'vitest');
  return success;
}

interface CliArgs {
  fix: boolean;
  format: boolean;
  noCoverage: boolean;
  minCoverage: number;
  skipLint: boolean;
  skipFormat: boolean;
  skipTypeCheck: boolean;
  skipTests: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  return {
    fix: args.includes('--fix'),
    format: args.includes('--format'),
    noCoverage: args.includes('--no-coverage'),
    minCoverage: parseInt(args.find(a => a.startsWith('--min-coverage='))?.split('=')[1] || '80'),
    skipLint: args.includes('--skip-lint'),
    skipFormat: args.includes('--skip-format'),
    skipTypeCheck: args.includes('--skip-type-check'),
    skipTests: args.includes('--skip-tests'),
  };
}

async function main() {
  const args = parseArgs();
  const results: Record<string, boolean> = {};
  let allPassed = true;

  console.log(`${colors.cyan}${colors.bright}Bun + Vite + React + TypeScript Project Verification${colors.reset}\n`);

  // Check Bun is installed
  if (!await checkBunInstalled()) {
    console.log(`\n${colors.red}ERROR: Bun is not installed. Install it first:${colors.reset}`);
    console.log('  curl -fsSL https://bun.sh/install | bash');
    process.exit(1);
  }

  // Run checks
  if (!args.skipLint) {
    results.lint = await runESLint(args.fix);
    allPassed = allPassed && results.lint;
  }

  if (!args.skipFormat) {
    results.format = await runPrettier(!args.format);
    allPassed = allPassed && results.format;
  }

  if (!args.skipTypeCheck) {
    results.typeCheck = await runTypeCheck();
    allPassed = allPassed && results.typeCheck;
  }

  if (!args.skipTests) {
    results.tests = await runTests(!args.noCoverage, args.minCoverage);
    allPassed = allPassed && results.tests;
  }

  // Print summary
  printStep('Verification Summary');

  for (const [check, passed] of Object.entries(results)) {
    const status = passed
      ? `${colors.green}✓ PASSED${colors.reset}`
      : `${colors.red}✗ FAILED${colors.reset}`;
    console.log(`${check.padEnd(15)}: ${status}`);
  }

  console.log();

  if (allPassed) {
    console.log(`${colors.green}${colors.bright}🎉 All checks passed!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bright}❌ Some checks failed${colors.reset}\n`);
    process.exit(1);
  }
}

main();
