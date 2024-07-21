module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    //babel-plugin-module-resolver
    plugins: [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@routes": "./src/routes",
          "@screans": "./src/screans",
          "@theme": "./src/theme",
          "@utils": "./src/utils",
        },
      },
    ],
  };
};
