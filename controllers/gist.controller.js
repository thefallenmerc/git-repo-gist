const { Remarkable } = require('remarkable');
const md = new Remarkable();
const Prism = require('prismjs');
const axios = require('axios');
const loadLanguages = require('prismjs/components/');

const base = "https://raw.githubusercontent.com";
const serverBase = "http://localhost:3000/";
const css = serverBase + "stylesheets/style.css";

// list of janguages
const extList = {
    css: 'css',
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
}

// create gist template
function getTemplate(highlight, gist) {
    return `
    <div class="gist">
        <div class="gist-content">
            <pre class="line-numbers"><code>${highlight}</code></pre>
        </div>
        <div class="gist-meta">
            <a href="http://github.com${gist.replace('/master/', '/blob/master/')}">${gist}</a>
             provided with with &#10084; by <a href="${serverBase}">Github Repo Gist</a>
             <a href="${base + gist}" style="float: right;">raw</a>
        </div>
    </div>
`;
}

// make gist
function makeGistScript(gist) {
    return `
    document.write('<link rel="stylesheet" href="${css}">')
    document.write(${JSON.stringify(gist)})
    `;
}

module.exports = function (req, res) {
    // gist url without github.com
    const gist = req.params[0];
    // raw github url
    const remoteUrl = base + gist;
    // extension
    const ext = gist.substr(gist.lastIndexOf('.') + 1);
    // get language or set extension
    const lang = extList[ext] || ext;
    loadLanguages([lang]);
    // get the raw content
    axios.get(remoteUrl)
        .then(response => {
            try {

                code = lang.toLowerCase() === 'json' ? JSON.stringify(response.data, null, 2) : response.data;
                // highlight content
                const highlight = Prism.highlight(code, Prism.languages[lang], lang);
                // create gist template
                const render = getTemplate(highlight, gist);
                // send rendered
                res.end(makeGistScript(render));
            } catch (e) {

                code = 'Something went wrong!';
                // highlight content
                const highlight = Prism.highlight(JSON.stringify(code, null, 2), Prism.languages.javascript, 'javascript');
                // create gist template
                const render = getTemplate(highlight, gist);
                // send rendered
                res.end(makeGistScript(render));
            }
        })
        .catch(error => {
            console.log(error);
            code = `
    // Github Repository To Gist Converter
    
    // this utility can be used to create github like gists using source files from any github repo;

    // head on to github and select any source file from any repository and click on the raw view

    // for eg https://raw.githubusercontent.com/thefallenmerc/notebook/master/package.json
    
    // remove the https://raw.githubusercontent.com/ and append it to https://gitrepogist.web.app/ which forms the
    
    // repo gist url - https://gitrepogist.web.app/thefallenmerc/notebook/master/package.json
    
    `;
            // highlight content
            const highlight = Prism.highlight(JSON.stringify(code, null, 2), Prism.languages[lang], lang);
            // create gist template
            const render = getTemplate(highlight, gist);
            // send rendered
            res.set('Content-Type', 'application/javascript');
            res.end(makeGistScript(render));
        })
}