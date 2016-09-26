import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('[regular] ensure the class is removed', t => {
    return run(t, '.remove-me { }', '', {
        blacklist: ['.remove-me']
    });
});

test('[regular] ensure the nested class is removed', t => {
    return run(t, '.parent .remove-me { }', '', {
        blacklist: ['.remove-me']
    });
});

test('[regular] ensure the class is not removed', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {
        blacklist: ['.removze-me']
    });
});

test('[regular] ensure at-rules are removed without blacklist', t => {
    return run(t, '@at-root { @viewport { width: device-width } }', '', {
        blacklist: ['@at-root']
    });
});

test('[regular] ensure at-rules are not removed without blacklist', t => {
    return run(t, '@media screen { }', '@media screen { }', {
        blacklist: ['@at-root']
    });
});

test('[regex] ensure the class is removed', t => {
    return run(t, '.remove-me { }', '', {
        regexBlacklist: ['\.remove-me']
    });
});

test('[regex] ensure the nested class is removed', t => {
    return run(t, '.parent .remove-me { }', '', {
        regexBlacklist: ['\.remove-me']
    });
});

test('[regex] ensure the class is not removed', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {
        regexBlacklist: ['\.removze-me']
    });
});

test('ensure the class is not removed without blacklist', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {});
});
