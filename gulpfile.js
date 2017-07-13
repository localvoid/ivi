const exec = require("child_process").exec;
const process = require("process");
const gulp = require("gulp");
const del = require("del");

function compileTypeScript(project, done) {
  exec(`./node_modules/typescript/bin/tsc -p ${project}`,
    function (err, stdout, stderr) {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      done(err);
    });
}

function npmLink(done) {
  exec(`npm link`,
    function (err, stdout, stderr) {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      done(err);
    });
}

function execIn(cwd, fn) {
  const tmp = process.cwd();
  process.chdir(cwd);
  fn();
  process.chdir(tmp);
}

gulp.task("clean", function () {
  return del([
    "packages/core/dist",
    "packages/dom/dist",
    "packages/events/dist",
    "packages/html/dist",
    "packages/ivi/dist",
    "packages/ivi/coverage",
    "packages/scheduler/dist",
    "packages/snapshot/dist",
    "packages/ssr/dist",
    "packages/ssr-html/dist",
    "packages/state/dist",
  ]);
});

gulp.task("link:core", function (done) {
  execIn("./packages/core", function () {
    npmLink(done);
  });
});

gulp.task("link:dom", function (done) {
  execIn("./packages/dom", function () {
    npmLink(done);
  });
});

gulp.task("link:events", function (done) {
  execIn("./packages/events", function () {
    npmLink(done);
  });
});

gulp.task("link:html", function (done) {
  execIn("./packages/html", function () {
    npmLink(done);
  });
});

gulp.task("link:ivi", function (done) {
  execIn("./packages/ivi", function () {
    npmLink(done);
  });
});

gulp.task("link:scheduler", function (done) {
  execIn("./packages/scheduler", function () {
    npmLink(done);
  });
});

gulp.task("link:snapshot", function (done) {
  execIn("./packages/snapshot", function () {
    npmLink(done);
  });
});

gulp.task("link:ssr", function (done) {
  execIn("./packages/ssr", function () {
    npmLink(done);
  });
});

gulp.task("link:ssr-html", function (done) {
  execIn("./packages/ssr-html", function () {
    npmLink(done);
  });
});

gulp.task("link:state", function (done) {
  execIn("./packages/state", function () {
    npmLink(done);
  });
});

gulp.task("link", [
  "link:core",
  "link:dom",
  "link:events",
  "link:html",
  "link:scheduler",
  "link:ivi",
  "link:snapshot",
  "link:ssr",
  "link:ssr-html",
  "link:state",
], function (done) {
  exec(`npm link ivi-core ivi-dom ivi-events ivi-html ivi-scheduler ivi ivi-snapshot ivi-ssr ivi-ssr-html ivi-state`,
    function (err, stdout, stderr) {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      done(err);
    });
});



gulp.task("build:es6:core", function (done) {
  compileTypeScript("./packages/core/tsconfig.build.json", done);
});

gulp.task("build:es6:dom", ["build:es6:core"], function (done) {
  compileTypeScript("./packages/dom/tsconfig.build.json", done);
});

gulp.task("build:es6:events", ["build:es6:core", "build:es6:dom", "build:es6:scheduler"], function (done) {
  compileTypeScript("./packages/events/tsconfig.build.json", done);
});

gulp.task("build:es6:html", ["build:es6:ivi"], function (done) {
  compileTypeScript("./packages/html/tsconfig.build.json", done);
});

gulp.task("build:es6:ivi", ["build:es6:core", "build:es6:dom", "build:es6:events"], function (done) {
  compileTypeScript("./packages/ivi/tsconfig.build.json", done);
});

gulp.task("build:es6:scheduler", ["build:es6:core"], function (done) {
  compileTypeScript("./packages/scheduler/tsconfig.build.json", done);
});

gulp.task("build:es6:snapshot", ["build:es6:core", "build:es6:ssr"], function (done) {
  compileTypeScript("./packages/snapshot/tsconfig.build.json", done);
});

gulp.task("build:es6:ssr", ["build:es6:core"], function (done) {
  compileTypeScript("./packages/ssr/tsconfig.build.json", done);
});

gulp.task("build:es6:ssr-html", ["build:es6:ssr"], function (done) {
  compileTypeScript("./packages/ssr-html/tsconfig.build.json", done);
});

gulp.task("build:es6:state", ["build:es6:core"], function (done) {
  compileTypeScript("./packages/state/tsconfig.build.json", done);
});

gulp.task("build:es6", [
  "build:es6:core",
  "build:es6:dom",
  "build:es6:events",
  "build:es6:html",
  "build:es6:scheduler",
  "build:es6:ivi",
  "build:es6:snapshot",
  "build:es6:ssr",
  "build:es6:ssr-html",
  "build:es6:state",
]);

gulp.task("build:cjs:core", ["build:es6"], function (done) {
  compileTypeScript("./packages/core/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:dom", ["build:es6"], function (done) {
  compileTypeScript("./packages/dom/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:events", ["build:es6"], function (done) {
  compileTypeScript("./packages/events/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:html", ["build:es6"], function (done) {
  compileTypeScript("./packages/html/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:ivi", ["build:es6"], function (done) {
  compileTypeScript("./packages/ivi/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:scheduler", ["build:es6"], function (done) {
  compileTypeScript("./packages/scheduler/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:snapshot", ["build:es6"], function (done) {
  compileTypeScript("./packages/snapshot/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:ssr", ["build:es6"], function (done) {
  compileTypeScript("./packages/ssr/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:ssr-html", ["build:es6"], function (done) {
  compileTypeScript("./packages/ssr-html/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs:state", ["build:es6"], function (done) {
  compileTypeScript("./packages/state/tsconfig.build.cjs.json", done);
});

gulp.task("build:cjs", [
  "build:cjs:core",
  "build:cjs:dom",
  "build:cjs:events",
  "build:cjs:html",
  "build:cjs:scheduler",
  "build:cjs:ivi",
  "build:cjs:snapshot",
  "build:cjs:ssr",
  "build:cjs:ssr-html",
  "build:cjs:state",
]);

gulp.task("build:ssr:core", ["build:es6"], function (done) {
  compileTypeScript("./packages/core/tsconfig.build.ssr.json", done);
});

gulp.task("build:ssr:snapshot", ["build:es6"], function (done) {
  compileTypeScript("./packages/snapshot/tsconfig.build.ssr.json", done);
});

gulp.task("build:ssr:ssr", ["build:es6"], function (done) {
  compileTypeScript("./packages/ssr/tsconfig.build.ssr.json", done);
});

gulp.task("build:ssr:ssr-html", ["build:es6"], function (done) {
  compileTypeScript("./packages/ssr-html/tsconfig.build.ssr.json", done);
});

gulp.task("build:ssr", [
  "build:ssr:core",
  "build:ssr:snapshot",
  "build:ssr:ssr",
  "build:ssr:ssr-html",
]);

gulp.task("build:unpkg", ["build:es6"], function (done) {
  exec(`./node_modules/.bin/rollup -c ./packages/ivi/rollup.conf.unpkg.js`,
    function (err, stdout, stderr) {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log(stderr);
      }
      done(err);
    });
});

gulp.task("build", ["build:es6", "build:cjs", "build:ssr", "build:unpkg"]);
