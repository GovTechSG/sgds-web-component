import prettier from "prettier";
import cem from "../custom-elements.json" with { type: "json" };
import { getAllComponents, getSgdsComponents } from "./shared.mjs";
import fs from 'fs';
import path from 'path';

const components = getSgdsComponents(getAllComponents(cem))
const directory = path.join('lib/css');
const cssSelector = components.map(com => {
    const tagName = com.tagName
    const selector = `${tagName}:not(:defined), ${tagName}:not(:defined) > * `
    return selector
}).join(",")

const source = prettier.format(
    `${cssSelector} {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }`, 
    { parser: 'css' }
)

fs.writeFileSync(path.join(directory, 'fouc.css'), source, 'utf8');