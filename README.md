# Reason
Eu queria usar a game engine [Unity](https://unity3d.com/) e escrever os scripts no editor de texto [Atom](https://atom.io/)  
Senti falta de um [autocompelte](https://en.wikipedia.org/wiki/Autocomplete) para me ajudar a escrever os scripts  
Para criar um autocomplete no Atom, eu precisaria saber os nomes das classes na API da Unity  
Por isso escrevi esse web scraper que caminha pela pela [documentação da Unity](https://docs.unity3d.com/ScriptReference/index.html) recolhendo informações para eu criar o autocomplete.  

**TL;DR**: Basicamente eu recolho o nome das classes na documentação da Unity e salvo em um JSON que eu usarei para o autocomplete.  

# How to use
Tenha **node.js** instalado (https://nodejs.org/en/)  
E deve vir com **npm** (Node.js Package Manager)  

Você primeiro precisa da library **puppeteer**, que por ser grande eu não consegui adicionar ao github.  
Vá na pasta Unity_Syntax_API pelo prompt e escreva  
`npm install puppeteer`  

Após isso basta rodar a main.js  
`node main.js`  
Deve levar horas para finalizar e qualquer problema na internet ou do site da unity pode causar a finalização do programa  

Agora você deve ter 4 arquivos na sua pasta:  
unity_objects, unity_requires, unity_properties, unity_signatures     
Foi separado em 4 pois node estava tendo problema de memória  
Rode concat_api para unir esses 4 arquivos  
`node concat_api.js`  
Isso deve ser instantâneo  

Quando finalizar o arquivo `unity_api.json` deve conter boa parte da API da Unity.  
