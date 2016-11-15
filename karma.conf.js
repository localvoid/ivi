module.exports = function(config) {
    config.set({
        browsers: ["Chrome"],

        frameworks: ["mocha", "chai"],

        files: [
            "build/es6/tests.js",
            { pattern: "src/**/*.ts", included: false, watched: false },
            { pattern: "tests/**/*.ts", included: false, watched: false },
        ],

        preprocessors: {
            "build/es6/tests.js": ["sourcemap"],
        },

        reporters: ["mocha"],

        colors: true,
        autoWatch: true,

        client: {
            mocha: {
                reporter: "html",
                ui: "bdd",
            }
        },

        coverageReporter: {
            dir: "coverage/",
            reporters: [
                { type: "json", subdir: "./", file: "coverage.json" },
            ]
        },

        sauceLabs: {
            testName: "ivijs",
            retryLimit: 3,
            startConnect: false,
            recordVideo: false,
            recordScreenshots: false,
            options: {
                "command-timeout": 600,
                "idle-timeout": 600,
                "max-duration": 5400,
            },
        },
        // Allocating a browser can take pretty long (eg. if we are out of capacity and need to wait
        // for another build to finish) and so the `captureTimeout` typically kills
        // an in-queue-pending request, which makes no sense.
        captureTimeout: 0,
        browserNoActivityTimeout: 300000,

        customLaunchers: {
            sl_chrome: {
                base: "SauceLabs",
                browserName: "chrome",
            },
            sl_firefox: {
                base: "SauceLabs",
                browserName: "firefox",
            },
            sl_mac_safari: {
                base: "SauceLabs",
                browserName: "safari",
                platform: "OS X 10.11"
            },
            sl_edge: {
                base: "SauceLabs",
                browserName: "MicrosoftEdge",
                platform: "Windows 10"
            },

            sl_ie_11: {
                base: "SauceLabs",
                browserName: "internet explorer",
                platform: "Windows 8.1",
                version: "11"
            },
            sl_ie_10: {
                base: "SauceLabs",
                browserName: "internet explorer",
                platform: "Windows 8",
                version: "10"
            },

            sl_ios_safari_9: {
                base: "SauceLabs",
                browserName: "iphone",
                version: "9.3"
            },
            sl_ios_safari_8: {
                base: "SauceLabs",
                browserName: "iphone",
                version: "8.4"
            },

            sl_android_4_4: {
                base: "SauceLabs",
                browserName: "android",
                version: "4.4"
            },
            sl_android_5_1: {
                base: "SauceLabs",
                browserName: "android",
                version: "5.1"
            },
        },
    });

    if (process.env.TRAVIS) {
        const buildLabel = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
        config.sauceLabs.build = buildLabel;
        config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }
};
