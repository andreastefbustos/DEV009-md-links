const dataMock = {
    pathFile: 'test.md',
    validateFalse: [
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md'
        },
        {
            href: 'https://nodejs.org/',
            text: 'Node.js',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md'
        },
        {
            href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
            text: 'md-links',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md'
        }
    ],
    validateTrue: [
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md',
            status: 200,
            ok: 'ok'
        },
        {
            href: 'https://nodejs.org/',
            text: 'Node.js',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md',
            status: 200,
            ok: 'ok'
        },
        {
            href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
            text: 'md-links',
            file: '/Users/andreabustos/workdir/laboratoria/DEV009-md-links/test.md',
            status: 200,
            ok: 'ok'
        }
    ]
}

module.exports = { dataMock };