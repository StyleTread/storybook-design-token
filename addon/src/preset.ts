import {
  StorybookDesignTokenPlugin,
  viteStorybookDesignTokenPlugin,
} from "./plugin";

type AddonOptions = {
  designTokenGlob?: string;
  presets: any;
  preserveCSSVars?: boolean;
};

function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve("./manager")];
}

async function webpackFinal(
  config: any,
  { designTokenGlob, presets, preserveCSSVars }: AddonOptions
) {
  const version = await presets.apply("webpackVersion");

  if (version >= 5) {
    config.plugins.push(
      new StorybookDesignTokenPlugin(preserveCSSVars, designTokenGlob)
    );
  } else {
    throw Error(
      "Webpack 4 is not supported by the storybook-design-token addon."
    );
  }

  return config;
}
