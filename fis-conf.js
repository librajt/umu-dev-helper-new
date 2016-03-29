
fis.set('project.files', ['./src/**']);
fis.set('project.ignore', ['./output/*', '.Ds_store']);

// es6的处理
fis.set('project.fileType.text', 'es6');
fis.match('*.es6', {
    rExt: '.js',
    parser: fis.plugin('es6-babel', {})
});


fis.match('src/css/(*.css)', {
    release: '/umu-dev-helper/css/$1'
});

fis.match('src/images/(*)', {
    release: '/umu-dev-helper/images/$1'
});


fis.match('src/js/zepto.js', {
  packOrder: -100
});


fis.match('src/js/Mousetrap.js', {
    packOrder: -98
});

fis.match('src/js/jp.js', {
  packOrder: -97
});

fis.match('src/js/language.js', {
  packOrder: -96
});

fis.match('src/js/testCase.js', {
    packOrder: -95
});


fis.match('src/js/demo.es6', {
    packOrder: -94
});


fis.match('src/js/*.js', {
    packTo: '/umu-dev-helper/js/content.js'
});

fis.match('src/js/*.es6', {
    packTo: '/umu-dev-helper/js/content.js'
});


fis.match('src/(*)', {
    release: '/umu-dev-helper/$1'
});




