#!/usr/bin/env node

/**
 * Automated Music Theory Testing Script
 * Runs comprehensive tests using Puppeteer (headless browser)
 * 
 * Usage: node run-tests.js [options]
 * Options:
 *   --url <url>     Test URL (default: http://localhost:3000/scale-explorer/test-runner.html)
 *   --output <file> Output results to JSON file
 *   --verbose       Show detailed output
 *   --headless      Run in headless mode (default: true)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
    url: 'http://localhost:3000/scale-explorer/test-runner.html',
    output: null,
    verbose: false,
    headless: true
};

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '--url':
            options.url = args[++i];
            break;
        case '--output':
            options.output = args[++i];
            break;
        case '--verbose':
            options.verbose = true;
            break;
        case '--headless':
            options.headless = args[++i] !== 'false';
            break;
        case '--help':
            console.log(`
Usage: node run-tests.js [options]

Options:
  --url <url>     Test URL (default: http://localhost:3000/scale-explorer/test-runner.html)
  --output <file> Output results to JSON file
  --verbose       Show detailed output
  --headless      Run in headless mode (default: true)
  --help          Show this help message
            `);
            process.exit(0);
    }
}

async function runMusicTheoryTests() {
    let browser;
    
    try {
        console.log('🎵 Starting Music Theory Automated Tests...\n');
        console.log(`URL: ${options.url}`);
        console.log(`Headless: ${options.headless}`);
        console.log(`Verbose: ${options.verbose}\n`);
        
        // Launch browser
        browser = await puppeteer.launch({ 
            headless: options.headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set up console capture if verbose
        if (options.verbose) {
            page.on('console', msg => {
                const type = msg.type();
                if (type === 'log' || type === 'error' || type === 'warn') {
                    console.log(`[${type.toUpperCase()}] ${msg.text()}`);
                }
            });
        }
        
        // Navigate to test runner
        console.log('📄 Loading test runner page...');
        await page.goto(options.url, { waitUntil: 'networkidle0' });
        
        // Wait for page to be ready
        await page.waitForSelector('#runTests');
        
        console.log('🔄 Running tests...');
        
        // Click run tests button
        await page.click('#runTests');
        
        // Wait for tests to complete (watch for status change)
        await page.waitForFunction(
            () => {
                const status = document.getElementById('testStatus');
                return status && (
                    status.textContent.includes('All tests passed') ||
                    status.textContent.includes('test(s) failed') ||
                    status.textContent.includes('Error running tests')
                );
            },
            { timeout: 60000 } // 60 second timeout
        );
        
        // Get test results
        const results = await page.evaluate(() => {
            const statusEl = document.getElementById('testStatus');
            const summaryEl = document.getElementById('summaryContent');
            const outputEl = document.getElementById('testOutput');
            
            // Try to get exported results if available
            if (window.tester) {
                return {
                    status: statusEl ? statusEl.textContent : 'Unknown',
                    summary: window.tester.exportResults(),
                    output: outputEl ? outputEl.textContent : ''
                };
            }
            
            return {
                status: statusEl ? statusEl.textContent : 'Unknown',
                summary: null,
                output: outputEl ? outputEl.textContent : ''
            };
        });
        
        // Display results
        console.log('\n' + '='.repeat(60));
        console.log('🎵 MUSIC THEORY TEST RESULTS');
        console.log('='.repeat(60));
        console.log(`Status: ${results.status}`);
        
        if (results.summary) {
            const summary = results.summary.summary;
            console.log(`Total Tests: ${summary.total}`);
            console.log(`✅ Passed: ${summary.passed}`);
            console.log(`❌ Failed: ${summary.failed}`);
            console.log(`Success Rate: ${summary.successRate.toFixed(1)}%`);
            
            if (summary.failed > 0) {
                console.log('\n❌ FAILED TESTS:');
                results.summary.results
                    .filter(r => r.status === 'FAIL')
                    .forEach(failure => {
                        console.log(`   - ${failure.test}`);
                        if (options.verbose) {
                            console.log(`     Expected: ${JSON.stringify(failure.expected)}`);
                            console.log(`     Actual: ${JSON.stringify(failure.actual)}`);
                        }
                    });
            }
        }
        
        if (options.verbose && results.output) {
            console.log('\n📝 DETAILED OUTPUT:');
            console.log(results.output);
        }
        
        // Save results to file if requested
        if (options.output && results.summary) {
            const outputPath = path.resolve(options.output);
            fs.writeFileSync(outputPath, JSON.stringify(results.summary, null, 2));
            console.log(`\n💾 Results saved to: ${outputPath}`);
        }
        
        console.log('='.repeat(60));
        
        // Exit with appropriate code
        const success = results.summary && results.summary.summary.failed === 0;
        process.exit(success ? 0 : 1);
        
    } catch (error) {
        console.error('❌ Error running tests:', error.message);
        if (options.verbose) {
            console.error(error.stack);
        }
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Check if Puppeteer is installed
try {
    require.resolve('puppeteer');
} catch (e) {
    console.error('❌ Puppeteer not found. Install it with:');
    console.error('   npm install puppeteer');
    console.error('   or');
    console.error('   yarn add puppeteer');
    process.exit(1);
}

// Run the tests
runMusicTheoryTests(); 