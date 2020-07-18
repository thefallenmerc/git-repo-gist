const { Remarkable } = require('remarkable');
const Prism = require('prismjs');
const axios = require('axios');
const helper = require("../helpers/main.helper");

// list of janguages
const extList = {
    css: 'css',
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
}

module.exports = function (req, res) {
    // gist url without github.com
    const gist = req.params[0];
    // extension
    const ext = gist.substr(gist.lastIndexOf('.') + 1);
    // get language or set extension
    const lang = extList[ext] || ext;
    // get raw file
    let finalizedGist = "";
    helper.getRawFileContent(gist)
        .then(response => {
            code = lang.toLowerCase() === 'json' ? JSON.stringify(response.data, null, 2) : response.data;
            // get finalized gist
            finalizedGist = helper.getTemplateWithHighlightedCode(gist, code, req.query.from, req.query.to);
        })
        .catch(error => {
            console.error(error);
            code = 'Something went wrong!';
            // get finalized gist
            finalizedGist = helper.getTemplateWithHighlightedCode(gist, code, req.query.from, req.query.to);
        }).finally(() => {
            // render it
            res.render('frame', { title: gist, gist: finalizedGist });
        });
}