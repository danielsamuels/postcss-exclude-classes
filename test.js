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

test('[combined] ensure both classes are removed', t => {
    return run(t, '.aaaaa { }, .bbbbb { }', '', {
        blacklist: ['.aaaaa'],
        regexBlacklist: ['\.b{5}']
    });
});

test('[combined] ensure both classes are removed', t => {
    return run(t, '.aaaaa { }, .bbbbb { }', '', {
        blacklist: [],
        regexBlacklist: ['\.[a-z]+']
    });
});

test('[combined] ensure all classes are removed', t => {
    return run(
        t,
        '.test-class {}, .test-class2 {}, .test-class3 {},' +
        '.example-class1 {}, .example-class2 {}, .example-class3 {}', '',
        {
            blacklist: ['.test-class'],
            regexBlacklist: ['\.example-class']
        }
    );
});

test('[combined] ensure all classes are removed', t => {
    return run(
        t,
        '.test-class {}, .test-class2 {}, .test-class3 {},' +
        ' .example-class1 {}, .example-class2 {}, .example-class3 {}',
        '',
        {
            blacklist: ['.test-class'],
            regexBlacklist: ['\.example-']
        }
    );
});

test('ensure the class is not removed without blacklist', t => {
    return run(t, '.dont-remove-me { }', '.dont-remove-me { }', {});
});

test('ensure the whole declaration is not removed when class appear only one in a comma separated declaration', t => {
    return run(t, '.remove-me,.dont-remove-me { }', '.dont-remove-me { }', {
        blacklist: ['.remove-me']
    });
});
