const npsUtils = require('nps-utils')

const series = npsUtils.series
const concurrent = npsUtils.concurrent
const rimraf = npsUtils.rimraf

module.exports = {
  scripts: {
    test: {
      size: {
        description: 'check the size of the bundle',
        script: 'bundlesize'
      }
    },
    build: {
      description: 'delete the dist directory and run all builds',
      default: series(
        rimraf('dist'),
        concurrent.nps('build.umd.main', 'build.umd.min')
      ),
      umd: {
        min: {
          description: 'run the rollup build with sourcemaps',
          script: 'rollup --config --sourcemap --environment MINIFY,FORMAT:umd'
        },
        main: {
          description: 'builds the umd files',
          script: 'rollup --config --sourcemap --environment FORMAT:umd'
        }
      },
      andTest: series.nps('build', 'test.size')
    },
    lint: {
      description: 'lint the entire project',
      script: 'eslint .'
    },
    validate: {
      description:
        'This runs several scripts to make sure things look good before committing or on clean install',
      default: concurrent.nps('lint', 'build.andTest')
    }
  },
  options: {
    silent: false
  }
}
