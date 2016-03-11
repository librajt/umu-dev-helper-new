
fis.set('project.files', ['./src/**']);
fis.set('project.ignore', ['./output/*','.Ds_store']);


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




fis.match('src/js/*.js', {
    packTo: '/umu-dev-helper/js/content.js'
});


fis.match('src/(*)', {
    release: '/umu-dev-helper/$1'
});




