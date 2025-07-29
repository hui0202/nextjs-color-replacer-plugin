#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Automated NPM package publishing script
 */
class Publisher {
  constructor() {
    this.packagePath = path.join(__dirname, '..', 'package.json');
    this.package = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
  }

  /**
   * Execute command and print output
   */
  exec(command, description) {
    console.log(`\n📦 ${description}`);
    console.log(`Running: ${command}\n`);
    
    try {
      const output = execSync(command, { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      return output;
    } catch (error) {
      console.error(`❌ Failed: ${description}`);
      process.exit(1);
    }
  }

  /**
   * Check pre-publish conditions
   */
  prePublishChecks() {
    console.log('🔍 Running pre-publish checks...');

    // Check if on main branch
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      if (branch !== 'main' && branch !== 'master') {
        console.warn(`⚠️  Warning: You're on branch '${branch}', not main/master`);
      }
    } catch (error) {
      console.warn('⚠️  Could not determine current git branch');
    }

    // Check if working directory is clean
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        console.error('❌ Working directory is not clean. Please commit your changes first.');
        process.exit(1);
      }
    } catch (error) {
      console.warn('⚠️  Could not check git status');
    }

    // Check NPM login status
    try {
      const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
      console.log(`✅ Logged in to NPM as: ${whoami}`);
    } catch (error) {
      console.error('❌ Not logged in to NPM. Please run "npm login" first.');
      process.exit(1);
    }
  }

  /**
   * Run tests
   */
  runTests() {
    this.exec('npm test', 'Running basic tests');
    this.exec('npm run test:extended', 'Running extended tests');
    console.log('✅ All tests passed!');
  }

  /**
   * Build package
   */
  buildPackage() {
    console.log('\n🏗️  Building package...');
    
    // Check if required files exist
    const requiredFiles = ['index.js', 'index.d.ts', 'README.md', 'lib/'];
    const missingFiles = requiredFiles.filter(file => {
      const filePath = path.join(__dirname, '..', file);
      return !fs.existsSync(filePath);
    });

    if (missingFiles.length > 0) {
      console.error(`❌ Missing required files: ${missingFiles.join(', ')}`);
      process.exit(1);
    }

    console.log('✅ All required files are present');
  }

  /**
   * Publish to NPM
   */
  publishToNPM() {
    const version = this.package.version;
    console.log(`\n🚀 Publishing version ${version} to NPM...`);
    
    // Ask for confirmation
    console.log('\n📋 Package info:');
    console.log(`  Name: ${this.package.name}`);
    console.log(`  Version: ${version}`);
    console.log(`  Description: ${this.package.description}`);
    
    // Check if version already exists
    try {
      const npmInfo = execSync(`npm info ${this.package.name}@${version}`, { 
        encoding: 'utf8',
        stdio: 'pipe' 
      });
      if (npmInfo) {
        console.error(`❌ Version ${version} already exists on NPM!`);
        process.exit(1);
      }
    } catch (error) {
      // Version doesn't exist, which is what we want
      console.log('✅ Version is new, proceeding with publish');
    }

    // Execute publish
    this.exec('npm publish', `Publishing ${this.package.name}@${version}`);
    
    console.log(`\n🎉 Successfully published ${this.package.name}@${version}!`);
    console.log(`📦 NPM: https://www.npmjs.com/package/${this.package.name}`);
  }

  /**
   * Create Git tag
   */
  createGitTag() {
    const version = this.package.version;
    const tagName = `v${version}`;
    
    console.log(`\n🏷️  Creating git tag: ${tagName}`);
    
    try {
      this.exec(`git tag ${tagName}`, `Creating tag ${tagName}`);
      this.exec(`git push origin ${tagName}`, `Pushing tag ${tagName}`);
      console.log(`✅ Tag ${tagName} created and pushed`);
    } catch (error) {
      console.warn('⚠️  Could not create git tag');
    }
  }

  /**
   * Main publish process
   */
  publish() {
    console.log('🚀 Starting NPM package publish process...\n');
    console.log(`Package: ${this.package.name}@${this.package.version}`);
    
    try {
      this.prePublishChecks();
      this.runTests();
      this.buildPackage();
      this.publishToNPM();
      this.createGitTag();
      
      console.log('\n🎉 Publication completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('  1. Check the package on NPM');
      console.log('  2. Update CHANGELOG.md if needed');
      console.log('  3. Announce the release');
      
    } catch (error) {
      console.error('\n❌ Publication failed:', error.message);
      process.exit(1);
    }
  }
}

// Run publish script
if (require.main === module) {
  const publisher = new Publisher();
  publisher.publish();
}

module.exports = Publisher; 