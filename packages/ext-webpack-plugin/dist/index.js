'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require('@babel/polyfill');

class ExtWebpackPlugin {
  constructor(options) {
    var data = require(`./pluginUtil`)._constructor(options);

    this.plugin = data.plugin;
  }

  apply(compiler) {
    if (compiler.hooks) {
      if (this.plugin.vars.framework == 'extjs') {
        compiler.hooks.afterCompile.tap('ext-after-compile', compilation => {
          require(`./extjsUtil`)._afterCompile(compilation, this.plugin.vars, this.plugin.options);
        });
      } else {
        compiler.hooks.compilation.tap(`ext-compilation`, compilation => {
          if (this.vars.production) {
            log(app + `ext-compilation-production`);
            compilation.hooks.succeedModule.tap(`ext-succeed-module`, module => {
              if (module.resource && module.resource.match(/\.(j|t)sx?$/) && !module.resource.match(/node_modules/) && !module.resource.match('/ext-react/dist/')) {
                this.vars.deps = [...(this.vars.deps || []), ...require(`./${framework}Util`).extractFromSource(module._source._value)];
              }
            });
          } else {
            log(app + `ext-compilation`);
          }

          compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tap(`ext-html-generation`, data => {
            log(app + `ext-html-generation`);

            const path = require('path');

            var publicPath = '';

            if (compilation.outputOptions.publicPath != undefined) {
              publicPath = compilation.outputOptions.publicPath;
            }

            data.assets.js.unshift(path.join(publicPath, this.vars.output + '/ext.js'));
            data.assets.css.unshift(path.join(publicPath, this.vars.output + '/ext.css'));
          });
        });
      }

      compiler.hooks.emit.tapAsync(`ext-emit`, (compilation, callback) => {
        require(`./pluginUtil`).emit(compiler, compilation, this.plugin.vars, this.plugin.options, callback);
      });
      compiler.hooks.done.tap(`ext-done`, () => {
        require('./pluginUtil').log(this.plugin.vars.app + `ext-done`);
      });
    }
  }

}

exports.default = ExtWebpackPlugin;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRXh0V2VicGFja1BsdWdpbiIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImRhdGEiLCJfY29uc3RydWN0b3IiLCJwbHVnaW4iLCJhcHBseSIsImNvbXBpbGVyIiwiaG9va3MiLCJ2YXJzIiwiZnJhbWV3b3JrIiwiYWZ0ZXJDb21waWxlIiwidGFwIiwiY29tcGlsYXRpb24iLCJfYWZ0ZXJDb21waWxlIiwicHJvZHVjdGlvbiIsImxvZyIsImFwcCIsInN1Y2NlZWRNb2R1bGUiLCJtb2R1bGUiLCJyZXNvdXJjZSIsIm1hdGNoIiwiZGVwcyIsImV4dHJhY3RGcm9tU291cmNlIiwiX3NvdXJjZSIsIl92YWx1ZSIsImh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24iLCJwYXRoIiwicHVibGljUGF0aCIsIm91dHB1dE9wdGlvbnMiLCJ1bmRlZmluZWQiLCJhc3NldHMiLCJqcyIsInVuc2hpZnQiLCJqb2luIiwib3V0cHV0IiwiY3NzIiwiZW1pdCIsInRhcEFzeW5jIiwiY2FsbGJhY2siLCJkb25lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUNBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDs7QUFFZSxNQUFNQyxnQkFBTixDQUF1QjtBQUVwQ0MsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkIsUUFBSUMsSUFBSSxHQUFHSixPQUFPLENBQUUsY0FBRixDQUFQLENBQXdCSyxZQUF4QixDQUFxQ0YsT0FBckMsQ0FBWDs7QUFDQSxTQUFLRyxNQUFMLEdBQWNGLElBQUksQ0FBQ0UsTUFBbkI7QUFDRDs7QUFFREMsRUFBQUEsS0FBSyxDQUFDQyxRQUFELEVBQVc7QUFDZCxRQUFJQSxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFFbEIsVUFBSyxLQUFLSCxNQUFMLENBQVlJLElBQVosQ0FBaUJDLFNBQWpCLElBQThCLE9BQW5DLEVBQTRDO0FBQzFDSCxRQUFBQSxRQUFRLENBQUND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UUFBM0Y7QUFDRCxPQUZEO0FBSUFoQyxNQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZWdDLElBQWYsQ0FBb0I1QixHQUFwQixDQUF5QixVQUF6QixFQUFvQyxNQUFNO0FBQ3hDYixRQUFBQSxPQUFPLENBQUMsY0FBRCxDQUFQLENBQXdCaUIsR0FBeEIsQ0FBNEIsS0FBS1gsTUFBTCxDQUFZSSxJQUFaLENBQWlCUSxHQUFqQixHQUF3QixVQUFwRDtBQUNELE9BRkQ7QUFJRDtBQUNGOztBQTFEbUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbnJlcXVpcmUoJ0BiYWJlbC9wb2x5ZmlsbCcpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4dFdlYnBhY2tQbHVnaW4ge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB2YXIgZGF0YSA9IHJlcXVpcmUoYC4vcGx1Z2luVXRpbGApLl9jb25zdHJ1Y3RvcihvcHRpb25zKVxuICAgIHRoaXMucGx1Z2luID0gZGF0YS5wbHVnaW5cbiAgfVxuXG4gIGFwcGx5KGNvbXBpbGVyKSB7XG4gICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG5cbiAgICAgIGlmICggdGhpcy5wbHVnaW4udmFycy5mcmFtZXdvcmsgPT0gJ2V4dGpzJykge1xuICAgICAgICBjb21waWxlci5ob29rcy5hZnRlckNvbXBpbGUudGFwKCdleHQtYWZ0ZXItY29tcGlsZScsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIHJlcXVpcmUoYC4vZXh0anNVdGlsYCkuX2FmdGVyQ29tcGlsZShjb21waWxhdGlvbiwgdGhpcy5wbHVnaW4udmFycywgdGhpcy5wbHVnaW4ub3B0aW9ucylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuXG4gICAgICAgIFxuICAgICAgICBjb21waWxlci5ob29rcy5jb21waWxhdGlvbi50YXAoYGV4dC1jb21waWxhdGlvbmAsIChjb21waWxhdGlvbikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnZhcnMucHJvZHVjdGlvbikge1xuICAgICAgICAgICAgbG9nKGFwcCArIGBleHQtY29tcGlsYXRpb24tcHJvZHVjdGlvbmApXG4gICAgICAgICAgICBjb21waWxhdGlvbi5ob29rcy5zdWNjZWVkTW9kdWxlLnRhcChgZXh0LXN1Y2NlZWQtbW9kdWxlYCwgKG1vZHVsZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobW9kdWxlLnJlc291cmNlICYmIG1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvXFwuKGp8dClzeD8kLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgvbm9kZV9tb2R1bGVzLykgJiYgIW1vZHVsZS5yZXNvdXJjZS5tYXRjaCgnL2V4dC1yZWFjdC9kaXN0LycpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YXJzLmRlcHMgPSBbIFxuICAgICAgICAgICAgICAgICAgLi4uKHRoaXMudmFycy5kZXBzIHx8IFtdKSwgXG4gICAgICAgICAgICAgICAgICAuLi5yZXF1aXJlKGAuLyR7ZnJhbWV3b3JrfVV0aWxgKS5leHRyYWN0RnJvbVNvdXJjZShtb2R1bGUuX3NvdXJjZS5fdmFsdWUpIFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2coYXBwICsgYGV4dC1jb21waWxhdGlvbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXBpbGF0aW9uLmhvb2tzLmh0bWxXZWJwYWNrUGx1Z2luQmVmb3JlSHRtbEdlbmVyYXRpb24udGFwKGBleHQtaHRtbC1nZW5lcmF0aW9uYCwoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbG9nKGFwcCArIGBleHQtaHRtbC1nZW5lcmF0aW9uYClcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbiAgICAgICAgICAgIHZhciBwdWJsaWNQYXRoID0gJydcbiAgICAgICAgICAgIGlmIChjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHB1YmxpY1BhdGggPSBjb21waWxhdGlvbi5vdXRwdXRPcHRpb25zLnB1YmxpY1BhdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEuYXNzZXRzLmpzLnVuc2hpZnQocGF0aC5qb2luKHB1YmxpY1BhdGgsIHRoaXMudmFycy5vdXRwdXQgKyAnL2V4dC5qcycpKVxuICAgICAgICAgICAgZGF0YS5hc3NldHMuY3NzLnVuc2hpZnQocGF0aC5qb2luKHB1YmxpY1BhdGgsIHRoaXMudmFycy5vdXRwdXQgKyAnL2V4dC5jc3MnKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG5cblxuICAgICAgfVxuXG4gICAgICBjb21waWxlci5ob29rcy5lbWl0LnRhcEFzeW5jKGBleHQtZW1pdGAsIChjb21waWxhdGlvbiwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgcmVxdWlyZShgLi9wbHVnaW5VdGlsYCkuZW1pdChjb21waWxlciwgY29tcGlsYXRpb24sIHRoaXMucGx1Z2luLnZhcnMsIHRoaXMucGx1Z2luLm9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgfSlcblxuICAgICAgY29tcGlsZXIuaG9va3MuZG9uZS50YXAoYGV4dC1kb25lYCwgKCkgPT4ge1xuICAgICAgICByZXF1aXJlKCcuL3BsdWdpblV0aWwnKS5sb2codGhpcy5wbHVnaW4udmFycy5hcHAgKyBgZXh0LWRvbmVgKVxuICAgICAgfSlcblxuICAgIH1cbiAgfVxuXG59XG4iXX0=