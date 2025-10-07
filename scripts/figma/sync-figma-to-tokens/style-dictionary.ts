import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";

["root", "day", "night"].map(function (brand) {
  const sd = new StyleDictionary(getStyleDictionaryConfig(brand));
  sd.buildPlatform("css");
});

function getStyleDictionaryConfig(brand) {
  return {
    source: [`scripts/figma/sync-figma-to-tokens/tokens_new/${brand}/*.json`],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `scripts/figma/sync-figma-to-tokens/tokens_new`,
        files: [
          {
            destination: `${brand}.json`,
            format: formats.json
          }
        ]
      }
    }
  };
}
