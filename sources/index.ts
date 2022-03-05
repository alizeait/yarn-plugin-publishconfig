import { Plugin, Workspace } from "@yarnpkg/core";
import { dset } from "dset";

export function beforeWorkspacePacking(
  _: Workspace | undefined,
  rawManifest: Record<any, any>
) {
  const publishConfig = rawManifest.publishConfig;
  if (publishConfig) {
    const properties = Object.entries(publishConfig)
      .filter(([key]) => key.startsWith("$"))
      .map(([key, value]) => [key.replace(/^\$/, ""), value] as [string, any]);
    for (const [key, value] of properties) {
      dset(rawManifest, key, value);
    }
  }
}
const plugin: Plugin = {
  hooks: {
    beforeWorkspacePacking,
  },
};

export default plugin;
