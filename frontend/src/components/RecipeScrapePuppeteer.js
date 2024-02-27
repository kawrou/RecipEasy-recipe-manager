import puppeteer from 'puppeteer';

const url = "https://www.receitasnestle.com.br/receitas/brigadeiro";

const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const jsonLdData = await page.$$eval('script[type="application/ld+json"]', scripts => {
        const jsonData = [];

        scripts.forEach(script => {
            try {
                const parsedData = JSON.parse(script.textContent);
                jsonData.push(parsedData);
            } catch (error) {
                console.error('Error parsing JSON-LD data:', error);
            }
        });

        return jsonData;
    });

    console.log(jsonLdData);

    await browser.close();
};

main();
