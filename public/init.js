require.config({
    baseUrl: 'engine',
    paths: {
        public: '../public'
    }
});

require(['engine'], function(eng){
    eng.init();
});