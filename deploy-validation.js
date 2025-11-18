#!/usr/bin/env node

/**
 * Vercel Deployment Validation Script for Ghost Gallery
 * Tests all critical components before deployment
 */

import { readdirSync, existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeploymentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    
    console.log(`[${timestamp}] ${prefix} ${message}`);
    
    if (type === 'error') this.errors.push(message);
    if (type === 'warning') this.warnings.push(message);
    if (type === 'success') this.successes.push(message);
  }

  async validate() {
    console.log('🚀 Starting Ghost Gallery Vercel Deployment Validation...\n');

    // 1. Check required files exist
    this.validateRequiredFiles();
    
    // 2. Validate Vercel configuration
    this.validateVercelConfig();
    
    // 3. Check package.json configuration
    this.validatePackageJson();
    
    // 4. Validate image files
    this.validateImageFiles();
    
    // 5. Check build output
    this.validateBuildOutput();
    
    // 6. Generate summary
    this.generateSummary();
  }

  validateRequiredFiles() {
    this.log('success', 'Checking required files...');
    
    const requiredFiles = [
      'index.html',
      'package.json',
      'vite.config.js',
      'vercel.json',
      'src/main.js',
      'src/data.js',
      'src/style.css',
      'src/shaders.js'
    ];

    requiredFiles.forEach(file => {
      if (existsSync(file)) {
        this.log('success', `Found: ${file}`);
      } else {
        this.log('error', `Missing: ${file}`);
      }
    });
  }

  validateVercelConfig() {
    this.log('success', 'Validating Vercel configuration...');
    
    // Check vercel.json
    if (existsSync('vercel.json')) {
      const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
      if (vercelConfig.rewrites) {
        this.log('success', 'vercel.json: SPA routing configured');
      } else {
        this.log('warning', 'vercel.json: No rewrites configured');
      }
    }

    // Check .vercelignore
    if (existsSync('.vercelignore')) {
      this.log('success', '.vercelignore: Vercel exclusions configured');
    }
  }

  validatePackageJson() {
    this.log('success', 'Validating package.json...');
    
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    
    if (pkg.scripts?.build) {
      this.log('success', 'package.json: Build script configured');
    } else {
      this.log('error', 'package.json: Missing build script');
    }
    
    if (pkg.vercel) {
      this.log('success', 'package.json: Vercel configuration included');
    } else {
      this.log('warning', 'package.json: No Vercel configuration');
    }
  }

  validateImageFiles() {
    this.log('success', 'Validating image files...');
    
    const publicDir = 'public';
    if (!existsSync(publicDir)) {
      this.log('error', 'Missing public directory');
      return;
    }

    const imageFiles = readdirSync(publicDir).filter(file => 
      /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file)
    );

    this.log('success', `Found ${imageFiles.length} image files in public/`);
    
    // Check for problematic filenames (spaces)
    const filesWithSpaces = imageFiles.filter(file => file.includes(' '));
    if (filesWithSpaces.length > 0) {
      this.log('error', `Found ${filesWithSpaces.length} files with spaces in names`);
      filesWithSpaces.forEach(file => this.log('error', `  - ${file}`));
    } else {
      this.log('success', 'No spaces in image filenames ✅');
    }

    // Validate data.js paths match actual files
    const dataPath = 'src/data.js';
    if (existsSync(dataPath)) {
      const dataContent = readFileSync(dataPath, 'utf8');
      const imageMatches = dataContent.match(/image:\s*["']([^"']+)["']/g);
      
      if (imageMatches) {
        imageMatches.forEach(match => {
          const imagePath = match.match(/["']([^"']+)["']/)[1];
          const actualFile = path.basename(imagePath);
          
          if (!imageFiles.includes(actualFile)) {
            this.log('error', `Image path in data.js doesn't exist: ${imagePath}`);
          }
        });
      }
    }
  }

  validateBuildOutput() {
    this.log('success', 'Validating build output...');
    
    const distDir = 'dist';
    if (!existsSync(distDir)) {
      this.log('error', 'dist/ directory not found - run "npm run build" first');
      return;
    }

    const distFiles = readdirSync(distDir);
    const distImages = distFiles.filter(file => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file));
    
    this.log('success', `Found ${distImages.length} images in dist/ after build`);
    
    if (distImages.length === 0) {
      this.log('warning', 'No images found in dist/ directory');
    }

    // Check for index.html
    if (distFiles.includes('index.html')) {
      this.log('success', 'index.html found in dist/');
    } else {
      this.log('error', 'index.html missing from dist/');
    }
  }

  generateSummary() {
    console.log('\n📊 Deployment Validation Summary');
    console.log('=====================================');
    
    console.log(`✅ Successes: ${this.successes.length}`);
    console.log(`⚠️ Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.errors.length}`);
    
    if (this.errors.length === 0) {
      console.log('\n🎉 DEPLOYMENT READY! Your Ghost Gallery is ready for Vercel deployment.');
      console.log('\nNext steps:');
      console.log('1. Run "npm run build" if not already done');
      console.log('2. Deploy with: vercel');
      console.log('3. Or connect your GitHub repository to Vercel');
    } else {
      console.log('\n🚨 DEPLOYMENT BLOCKED! Fix the errors above before deploying.');
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️ Warnings to consider:');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
  }
}

// Run validation
const validator = new DeploymentValidator();
validator.validate().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});