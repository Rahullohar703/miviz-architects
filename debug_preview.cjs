const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText)
  );

  console.log('Navigating to preview server page...');
  try {
    await page.goto('http://localhost:4173/architects-in-pune', { waitUntil: 'networkidle0', timeout: 10000 });
    const content = await page.content();
    console.log('HTML Length:', content.length);
  } catch (err) {
    console.log('Goto failed:', err.message);
  }

  await browser.close();
})();
