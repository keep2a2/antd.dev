const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireEslint = require('react-app-rewire-eslint');
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true}],
        config,
    );

    // support less
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
        javascriptEnabled: true,
    })(config, env);

    // support @ as root path
    config.resolve.alias['@']= resolve('src');

    // eslint rewire
    config = rewireEslint(config, env);

    return config;
};