const puppeteer = require('puppeteer');
const fileSystem = require('fs');

const linkAPI = 'https://docs.unity3d.com/ScriptReference/'

let objects = [];
let requires = [];

function getRequires(contentAPI) {
  const regexRequire = /<span>([a-zA-Z\.]*)<\/span>/g;
  let contentRequire = regexRequire.exec(contentAPI);

  while(contentRequire != null) {
    const requireName = contentRequire[1];

    contentRequire = regexRequire.exec(contentAPI);

    if(requireName === 'Classes' || requireName === 'Interfaces' || requireName === 'Enumerations' || requireName === 'Attributes' || requireName === 'Assemblies')
    continue;

    requires.push({
      text: requireName,
      type: 'require'
    });
  }
}

function getPages(contentAPI) {
  const regexPage = /<a href="([a-zA-Z\.]*)" id="" class="">([a-zA-Z]*)<\/a>/g;
  let contentPage = regexPage.exec(contentAPI);

  while(contentPage != null) {
    const pageLink = contentPage[1];
    const pageName = contentPage[2];

    contentPage = regexPage.exec(contentAPI);

    objects.push({
      text: pageName,
      descriptionMoreURL: linkAPI + pageLink
    });
  }
}

function getDescription(content) {
  const regex = /<h2>Description<\/h2><p>([",\.\w <>=\-/:\)\(\n\r\[\];]*?)<\/p>/g;
  const description = regex.exec(content);

  if(description == null)
    return null

  return description[1];
}

function getType(content) {
  const regex = /<p class="cl mb0 left mr10">([\w]*?)(?: |<\/p>)/g;
  const type = regex.exec(content);

  if(type == null)
    return null

  return type[1];
}

async function getObjects(browser) {

  for(const object of objects) {
    const page = await browser.newPage();
    await page.goto(object.descriptionMoreURL);

    const content = await page.content();
    await page.close()

    object.description = getDescription(content);
    object.type = getType(content);
  }
}

puppeteer.launch()
  .then(async browser => {
    const page = (await browser.pages())[0];

    await page.goto(linkAPI + 'index.html');

    const content =  await page.content();
    const regexAPI = /<h2>Scripting API<\/h2>(.*)<div class="mCSB_scrollTools" style="position: absolute; display: none;">/g;
    const contentAPI = regexAPI.exec(content)[1];

    await getRequires(contentAPI);
    await getPages(contentAPI);
    await getObjects(browser);
    await browser.close();

    const api = requires.concat(objects);
    const json = JSON.stringify(api);
    console.log(json);

    fileSystem.writeFile('unity_api.json', json);

  });
