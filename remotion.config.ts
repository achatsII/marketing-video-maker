/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";
import path from "path";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((currentConfig) => {
  const withTailwind = enableTailwind(currentConfig);

  // Force-set alias after enableTailwind to ensure @ works
  if (!withTailwind.resolve) {
    withTailwind.resolve = {};
  }
  if (!withTailwind.resolve.alias) {
    withTailwind.resolve.alias = {};
  }
  (withTailwind.resolve.alias as Record<string, string>)["@"] = path.resolve(
    process.cwd(),
    "src"
  );

  return withTailwind;
});
