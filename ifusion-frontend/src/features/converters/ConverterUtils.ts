import yaml from 'js-yaml';
import Papa from 'papaparse';
import { marked } from 'marked';
import he from 'he';
import { xmlBeautifier, jsonBeautifier } from '../formatters/formattersUtils';
// import * as BSON from 'bson';

type JsonObject = Record<string, unknown>;
type JsonArray = Array<unknown>;
type JsonInput = JsonObject | JsonArray;

const safeBeautify = (input: string, format?: 'json' | 'xml' | 'yaml'): string => {
  switch (format) {
    case 'json':
      return jsonBeautifier(input);
    case 'xml':
      return xmlBeautifier(input);
    case 'yaml':
      return input; // Add YAML beautification logic if needed
    default:
      return input;
    }
  }


// Utility: Flatten an object
const flattenObject = (obj: JsonObject, parentKey = '', result: JsonObject = {}): JsonObject => {
  for (const key in obj) {
    const propKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key] as JsonObject, propKey, result);
    } else {
      result[propKey] = Array.isArray(obj[key]) ? obj[key].join(', ') : obj[key];
    }
  }
  return result;
};

// ------------------ JSON ↔ XML ------------------
export const jsonToXml = (input: string): string => {
  try {
    const obj: JsonInput = JSON.parse(input);

    const toXml = (value: unknown, key = 'item'): string => {
      if (Array.isArray(value)) {
        return value.map((v) => toXml(v, key)).join('');
      } else if (typeof value === 'object' && value !== null) {
        const inner = Object.entries(value)
          .map(([k, v]) => toXml(v, k))
          .join('');
        return `<${key}>${inner}</${key}>`;
      } else {
        return `<${key}>${String(value)}</${key}>`;
      }
    };

    return safeBeautify(`<root>${toXml(obj)}</root>`, 'xml');
  } catch (err) {
    return `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ JSON ↔ YAML ------------------
export const jsonToYaml = (input: string): string => {
  try {
    const obj: JsonInput = JSON.parse(input);
    return safeBeautify(yaml.dump(obj), 'yaml');
  } catch (err) {
    return `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`;
  }
};

export const yamlToJson = (input: string): string => {
  try {
    const obj: JsonInput = yaml.load(input) as JsonInput;
    return safeBeautify(JSON.stringify(obj, null, 2), 'json');
  } catch (err) {
    return `Invalid YAML: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ JSON ↔ CSV ------------------
export const jsonToCsv = (input: string): string => {
  try {
    const obj: JsonInput = JSON.parse(input);
    const dataArray = Array.isArray(obj) ? obj : [obj];
    const flatArray = dataArray.map((item) => flattenObject(item as JsonObject));
    return Papa.unparse(flatArray);
  } catch (err) {
    return `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`;
  }
};

export const csvToJson = (input: string): string => {
  try {
    const result = Papa.parse<JsonObject>(input.trim(), { header: true, skipEmptyLines: true });
    return safeBeautify(JSON.stringify(result.data, null, 2), 'json');
  } catch (err) {
    return `Invalid CSV: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ Text ↔ Base64 ------------------
export const textToBase64 = (input: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (err) {
    return `Error encoding to Base64: ${err instanceof Error ? err.message : String(err)}`;
  }
};

export const base64ToText = (input: string): string => {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (err) {
    return `Error decoding Base64: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ Text ↔ URL Encoding ------------------
export const textToUrlEncoded = (input: string): string => {
  return encodeURIComponent(input);
};

export const urlDecode = (input: string): string => {
  return decodeURIComponent(input);
};

// ------------------ Text ↔ Hex ------------------
export const textToHex = (input: string): string => {
  return input
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
};

// ------------------ HTML ↔ Text ------------------
export const htmlToText = (input: string): string => {
  return he.decode(input.replace(/<\/?[^>]+(>|$)/g, ''));
};

// ------------------ Markdown ↔ HTML ------------------
export const markdownToHtml = async (input: string): Promise<string> => {
  return marked.parse(input);
};

export const htmlToMarkdown = (input: string): string => {
  return he.decode(input.replace(/<\/?[^>]+(>|$)/g, ''));
};

// ------------------ JS Object ↔ JSON ------------------
export const jsObjectToJson = (input: string): string => {
  try {
    const obj = eval(`(${input})`);
    return safeBeautify(JSON.stringify(obj, null, 2), 'json');
  } catch (err) {
    return `Invalid JS Object: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ JSON Pretty Print / Minify ------------------
export const formatJson = (input: string): string => {
  try {
    const obj: JsonInput = JSON.parse(input);
    const pretty = JSON.stringify(obj, null, 2);
    const minified = JSON.stringify(obj);
    return `--- Pretty Format ---\n${pretty}\n\n--- Minified ---\n${minified}`;
  } catch (err) {
    return `Invalid JSON: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ HTML ↔ JSON ------------------
export const htmlToJson = (input: string): string => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');

    const parseNode = (node: Node): Record<string, unknown> | string | undefined => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim();
      }
      if (node instanceof Element) {
        const obj: Record<string, unknown> = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj[attr.name] = attr.value;
        }
        for (let child = node.firstElementChild; child; child = child.nextElementSibling) {
          obj[child.nodeName.toLowerCase()] = parseNode(child);
        }
        return obj;
      }
      return undefined;
    };

    return safeBeautify(JSON.stringify(parseNode(doc.documentElement), null, 2), "json");
  } catch (err) {
    return `Error parsing HTML to JSON: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ CSV ↔ YAML ------------------
export const csvToYaml = (input: string): string => {
  try {
    const result = Papa.parse<JsonObject>(input.trim(), { header: true, skipEmptyLines: true });
    return safeBeautify(yaml.dump(result.data), 'yaml');
  } catch (err) {
    return `Invalid CSV: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ YAML ↔ CSV ------------------
export const yamlToCsv = (input: string): string => {
  try {
    const obj: JsonInput = yaml.load(input) as JsonInput;
    const flatArray = Array.isArray(obj) ? obj : [obj];
    const flattened = flatArray.map((item) => flattenObject(item as JsonObject));
    return Papa.unparse(flattened);
  } catch (err) {
    return `Invalid YAML: ${err instanceof Error ? err.message : String(err)}`;
  }
};

// ------------------ HTML ↔ Base64 ------------------
export const htmlToBase64 = (input: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (err) {
    return `Error encoding HTML to Base64: ${err}`;
  }
};

export const base64ToHtml = (input: string): string => {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (err) {
    return `Error decoding Base64 to HTML: ${err}`;
  }
};

// ------------------ Markdown ↔ JSON ------------------
export const markdownToJson = async (input: string): Promise<string> => {
  try {
    const html = await markdownToHtml(input);
    return htmlToJson(html);
  } catch (err) {
    return `Error converting Markdown to JSON: ${err}`;
  }
};

// ------------------ Text ↔ Binary ------------------
export const textToBinary = (input: string): string => {
  return input
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

export const binaryToText = (input: string): string => {
  return input
    .split(' ')
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join('');
};

// ------------------ JSON ↔ BSON ------------------
export const jsonToBson = (input: string): string => {
  try {
    const obj: JsonInput = JSON.parse(input);
    // const bson = BSON.serialize(obj);
    const bson = Buffer.from(JSON.stringify(obj), 'utf8');

    return safeBeautify(bson.toString());
  } catch (err) {
    return `Invalid JSON for BSON conversion: ${err instanceof Error ? err.message : String(err)}`;
  }
};

export const bsonToJson = (input: string): string => {
  try {
    const buffer = Buffer.from(input, 'base64');
    // const obj = BSON.deserialize(buffer);
    const obj = JSON.parse(buffer.toString('utf8'));
    return safeBeautify(JSON.stringify(obj, null, 2), "json");
  } catch (err) {
    return `Invalid BSON: ${err}`;
  }
};

// ------------------ JSON ↔ XML Beautifier ------------------
export const jsonToXmlBeautifier = (input: string): string => {
  try {
    const xmlString = jsonToXml(input);
    return xmlBeautifier(xmlString);
  } catch (err) {
    return `Invalid JSON for XML beautification: ${err}`;
  }
};

// ------------------ Text ↔ CSV ------------------
export const textToCsv = (input: string): string => {
  const lines = input.split('\n');
  const csv = lines.map(line => line.split(' ').join(',')).join('\n');
  return csv;
};

export const csvToText = (input: string): string => {
  const rows = input.split('\n');
  return rows.map(row => row.split(',').join(' ')).join('\n');
};

// ------------------ JSON ↔ Markdown ------------------
export const jsonToMarkdown = (input: string): string => {
  try {
    const obj = JSON.parse(input);
    const markdown = Object.entries(obj)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join('\n');
    return markdown;
  } catch (err) {
    return `Invalid JSON: ${err}`;
  }
};

// ------------------ XML ↔ JSON ------------------
export const xmlToJson = (input: string): string => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(input, 'text/xml');

    const xmlToJsonObject = (xml: unknown): unknown => {
      const obj: Record<string, unknown> = {};
      if (xml instanceof Element) { // element
        if ((xml as Element).attributes.length > 0) {
          for (let i = 0; i < (xml as Element).attributes.length; i++) {
            if (xml instanceof Element) {
              const attribute = xml.attributes.item(i);
              if (attribute) {
                obj[attribute.nodeName] = attribute.nodeValue;
              }
            }
          }
        }
      } else if (xml instanceof Node && xml.nodeType === 3) { // text
        obj['#text'] = xml.nodeValue;
      }

      if (xml instanceof Node && xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
          const item = xml.childNodes.item(i);
          const nodeName = item.nodeName;
          if (obj[nodeName] === undefined) {
            obj[nodeName] = xmlToJsonObject(item);
          } else {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            (obj[nodeName] as unknown[]).push(xmlToJsonObject(item));
          }
        }
      }
      return obj;
    };

    const jsonObj = xmlToJsonObject(xmlDoc.documentElement);
    return safeBeautify(JSON.stringify(jsonObj, null, 2), "json");
  } catch (err) {
    return `Invalid XML: ${err instanceof Error ? err.message : String(err)}`;
  }
  return "Invalid XML"; // Ensure a return statement exists in all paths
};
