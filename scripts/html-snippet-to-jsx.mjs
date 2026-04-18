import fs from "node:fs";
import path from "node:path";

const [inPath, outPath, exportName, desc] = process.argv.slice(2);
if (!inPath || !outPath || !exportName) {
  console.error(
    "Usage: node html-snippet-to-jsx.mjs <in.html> <out.tsx> <ExportName> [description]"
  );
  process.exit(1);
}

let s = fs.readFileSync(inPath, "utf8");
s = s.replace(/\bclass=/g, "className=");
const attrs = [
  ["stroke-width", "strokeWidth"],
  ["stroke-linecap", "strokeLinecap"],
  ["stroke-linejoin", "strokeLinejoin"],
  ["fill-rule", "fillRule"],
  ["clip-rule", "clipRule"],
  ["stroke-dasharray", "strokeDasharray"],
  ["font-weight", "fontWeight"],
  ["text-anchor", "textAnchor"],
  ["xmlns:xlink", "xmlnsXlink"],
  ["xlink:href", "xlinkHref"],
];
for (const [a, b] of attrs) {
  s = s.replace(new RegExp(`\\b${a}=`, "g"), `${b}=`);
}
s = s.replace(/<!--[\s\S]*?-->/g, "");
s = s.replace(/<br>/g, "<br />");

fs.mkdirSync(path.dirname(outPath), { recursive: true });

const comment = desc || "portfolio.html から機械変換";
const body = s
  .split("\n")
  .map((line) => "      " + line)
  .join("\n");

const out = `import type { ReactNode } from "react";

/** ${comment} */
export function ${exportName}(): ReactNode {
  return (
    <>
${body}
    </>
  );
}
`;

fs.writeFileSync(outPath, out);
