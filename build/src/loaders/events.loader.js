//Here we import all events
var controllers = require("require-all")({
    dirname: __dirname + "/../events/subscribers",
    filter: /(.+.subscriber)\.ts$/,
    excludeDirs: /^\.(git)$/,
    recursive: true,
});
//# sourceMappingURL=events.loader.js.map