const puppeteer = require('puppeteer');

it('should display the title', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(TodoMVC,{});
    const title = await page.title();
    expect(title).toBe("React • TodoMVC");
  
    await browser.close();
})