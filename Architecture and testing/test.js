const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser, page; // Declare reusable variables


describe('E2E tests', async function() {
    this.timeout(10000); // we make it so it open new browser and new page and then close it after each test to avoid leeches
  before(async () => { browser = await chromium.launch(); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); }); 

// we gotta run some tests to see if worksi
it('works', async () => {
    await page.goto('http://softuni.bg');
    await page.screenshot({path: 'test.png'});
    expect(1).to.equal(1);
});




});



