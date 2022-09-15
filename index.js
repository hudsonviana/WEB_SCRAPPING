const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.goto('https://instagram.com/rocketseat_oficial');
  await page.goto('https://www.instagram.com/anitta');

  const imgList = await page.evaluate(() => {
    // toda essa função será executada no browser

    // pegar todas as imagens que estão na parte de posts
    // const nodeList = document.querySelectorAll('article img');
    const nodeList = document.querySelectorAll('article img');

    // transformar o NodeList em array
    const imgArray = [...nodeList];

    // transformar os nodes (elementos html) em objeto javascript
    const imgList = imgArray.map( ({src}) => ({
      src
    }));
        
    // colocar para fora da função
    return imgList;
  });

  // Escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('something went wrong!');
    console.log('well done!');
  });

  await browser.close();
})();

// https://www.youtube.com/watch?v=K5yYBJhix5A
// https://www.npmjs.com/package/puppeteer
