# Vue.js 源码构建

### Vue.js 源码是基于 Rollup 构建的,它的构建相关配置都在 scripts 目录下。

```
scripts
├── alias.js
├── build.js
├── config.js
├── gen-release-note.js
├── get-weex-version.js
├── git-hooks
│   ├── commit-msg
│   └── pre-commit
├── release-weex.sh
├── release.sh
└── verify-commit-msg.js
```

 package.json 文件中,script 字段作为 NPM 的执行脚本，Vue.js 源码构建的脚本如下：

 ```
 {
  "script": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build --weex"
  }
}
 ```

 当在命令行运行 npm run build 的时候,实际上就会执行 node scripts/build.js,接下来我们来看看它实际是怎么构建的

 scripts/build.js文件:

```
// 从config.js 里拿到所有构建的配置 
let builds = require('./config').getAllBuilds()

// 过滤配置文件 process.argv[2] 为配置参数 ，例如：npm run build --weex 的 --weex
// filter builds via command line arg
if (process.argv[2]) {
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    // some() 方法用于检测数组中的元素是否满足指定条件
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}

// 将过滤后的文件传入 build 函数
build(builds)

// build函数
function build (builds) {
  let built = 0
  const total = builds.length
  // 一个一个编译执行 buildEntry,next递归
    const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config) {
  const output = config.output
  const { file, banner } = output
  const isProd = /min\.js$/.test(file)
  // 把处理过的配置传入rollup.rollup,从而完成构建
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ code }) => {
      if (isProd) {
        var minified = (banner ? banner + '\n' : '') + uglify.minify(code, {
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        return write(file, minified, true)
      } else {
        return write(file, code)
      }
    })
}

```

 scripts/config.js 文件 :

```
const banner =
  '/*!\n' +
  ' * Vue.js v' + version + '\n' +
  ' * (c) 2014-' + new Date().getFullYear() + ' Evan You\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  // 在scripts/alias.js 里找 / 前匹配的目录,做映射
  // alias.js 的地址为项目里真实的地址
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
  // alias.js 没有找到匹配目录时
    return path.resolve(__dirname, '../', p)
  }
}

//  配置文件

const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.js'),
    // resolve 执行上面的 resolve 函数
    format: 'cjs',
    // format: amd cmd es6 导出不同格式的js, 'cjs': module.exports = Vue
    banner
    // banner 为局部变量 定义生成的注释
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.js'),
    format: 'cjs',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime only (ES Modules). Used by bundlers that support ES Modules,
  // e.g. Rollup & Webpack 2
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner
  },
  // Runtime+compiler CommonJS build (ES Modules)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner
  },

  ······

}

// genConfig 函数,构造出新的config配置,是 Rollup 认识的配置config

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      replace({
        __WEEX__: !!opts.weex,
        __WEEX_VERSION__: weexVersion,
        __VERSION__: version
      }),
      flow(),
      buble(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    }
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
   // 拿到builds keys 的数组，执行genConfig,处理后变成Rollup识别的配置，暴露 给build.js 
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
 

```

### Runtime Only VS Runtime+Compiler

 vue-cli 初始化 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime+Compiler 版本。

Runtime Only

我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。

Runtime+Compiler

我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板，如下所示：

// 需要编译器的版本
```
new Vue({
  template: '<div>{{ hi }}</div>'
})
```

// 这种情况不需要
```
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```
因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。

编译过程对性能会有一定损耗，所以通常更推荐使用 Runtime-Only 的 Vue.js。
