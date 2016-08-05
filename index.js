var postcss = require('postcss');

module.exports = postcss.plugin('postcss-exclude-classes', (opts) => {
    opts = opts || {};

    // Work with options here
    if (undefined === opts.blacklist) {
        return () => console.warn('A blacklist is required.');
    }

    return (css) => {
        // Transform CSS AST here
        css.walkRules((rule) => {
            opts.blacklist.forEach((item) => {
                if (rule.selector.search(item) !== -1) {
                    rule.remove();
                }
            });
        });
    };
});
