const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // postcssのVersionによってはうまく動作しない可能性あり
    // https://github.com/storybookjs/storybook/issues/18727
    "@storybook/addon-postcss",
  ],
  // framework: "@storybook/react",
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  staticDirs: ["public"],
  babel: async (options) => ({
    ...options,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ];

    return config;
  },
};
