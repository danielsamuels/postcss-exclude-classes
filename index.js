var postcss = require('postcss');

module.exports = postcss.plugin('postcss-exclude-classes', (opts) => {
    opts = opts || {};

    // Work with options here
    if (undefined === opts.blacklist && undefined === opts.regexBlacklist) {
        return () => console.warn('A blacklist is required.');
    }

    return (css) => {
        // Transform CSS AST here
        if (opts.blacklist !== undefined) {
            css.walkRules((rule) => {
                opts.blacklist.forEach((item) => {
                    if (rule.selector.indexOf(item) !== -1) {
                        rule.remove();
                    }
                });
            });

            css.walkAtRules((rule) => {
                opts.blacklist.forEach((item) => {
                    if (item.startsWith('@') && item.substr(1) === rule.name) {
                        rule.remove();
                    }
                });
            });
        }

        if (opts.regexBlacklist !== undefined) {
            css.walkRules((rule) => {
                opts.regexBlacklist.forEach((item) => {
                    if (rule.selector.search(item) !== -1) {
                        rule.remove();
                    }
                });
            });
        }
    };
});
