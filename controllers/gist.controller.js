const { Remarkable } = require('remarkable');
const md = new Remarkable();

module.exports = function (req, res) {
    const gist = req.params[0];
    const code = "console.log('red')";
    return res.end(md.render(`\`\`\`${code}\`\`\``));
}