const axios = require("axios");
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

const serverBase = process.env.NODE_ENV === 'production' ? "https://git-repo-gist.herokuapp.com/" : "http://localhost:3000/";
const css = serverBase + "stylesheets/style.css";
const base = "https://raw.githubusercontent.com";

// list of janguages
const extList = {
    css: 'css',
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
}


const helper = {
    /**
     * Contraints the number of line of the diplayed code to
     * 
     * @param code: code to be constrained
     * @param start: starting line, nullable 
     * @param end: ending line, nullable 
     */
    getConstrained: (code = "", start, end) => {
        // if start is invalid
        if (isNaN(start) || start < 1) {
            start = 1;
        }
        // if end is invalid or end is smaller than start
        if (isNaN(end) || end < start) {
            end = 10000; // default end to 10000, so that we dont have to worry about it
        }
        end = parseInt(end);
        // slice the code accordingly
        code = code.split("\n").slice(start - 1, end).join("\n");
        return code;
    },
    /**
     * Creates template for the highlighted code
     * @param highlight the highlighted code by prismjs
     * @param gist the url of actualy file on github
     */
    getTemplate: (highlight, gist) => {
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
    },
    /**
     * @param gist template whose gist will be made
     */
    makeGistScript: (gist) => {
        return `
        document.write('<link rel="stylesheet" href="${css}">')
        document.write(${JSON.stringify(gist)})
        `;
    },
    getRawFileContent: (fileUrl) => {
        // raw github url
        const remoteUrl = base + '/' + fileUrl;
        // get the raw content
        return axios.get(remoteUrl);
    },
    /**
     * Function returns rendered template for data that is provided
     * @param gist relative url of the raw file
     * @param data content of the file
     * @param start starting constraint for the file
     * @param end ending constraint for the file
     */
    getTemplateWithHighlightedCode: (gist, data, start, end) => {
        try {
            // extension
            const ext = gist.substr(gist.lastIndexOf('.') + 1);
            // get language or set extension
            const lang = extList[ext] || ext;
            loadLanguages([lang]);
            // check for offset and limit
            if (start || end) {
                code = helper.getConstrained(code, start, end);
            }
            // highlight content
            const highlight = Prism.highlight(code, Prism.languages[lang], lang);
            // create gist template
            const render = helper.getTemplate(highlight, gist);
            // return the created gist
            return helper.makeGistScript(render)
        } catch(error) {
            console.error(error);
            code = 'Something went wrong!';
            const render = helper.getTemplate(code, gist);
            return helper.makeGistScript(render);
        }
    }
}

module.exports = helper