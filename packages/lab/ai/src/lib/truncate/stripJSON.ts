// script.ts
interface JsonNode {
    nodeType?: number;
    tagName?: string;
    attributes?: { [key: string]: string };
    childNodes?: JsonNode[];
    nodeValue?: string;
}

export class ClassNameGenerator {

    private currentNumber = 0;
    private currentLetter = 'A';


    private getNextNumber() : string {
        this.currentNumber++;
        if (this.currentNumber > 99) {
            this.currentNumber = 1;
            this.currentLetter = String.fromCharCode(this.currentLetter.charCodeAt(0) + 1);
        }
        return this.currentLetter + this.currentNumber.toString().padStart(2,'0');
    }

    public generateClassName(): string {
        return this.getNextNumber();
    }
}


export function updateClassNames(node: JsonNode,
    classMap: Map<string, string>,
    selectorMap: Map<string, string>,
    classNameGenerator: ClassNameGenerator,
    parentSelector = ''
): void {


    const currentNumber = classNameGenerator.generateClassName();
    const currentSelector = getSelectorString(node, parentSelector ? parentSelector.split(' > ') : []);


    if (node.attributes && node.attributes.class) {
        classMap.set(currentNumber, node.attributes.class);
        selectorMap.set(currentNumber,currentSelector);
        node.attributes.class = currentNumber;

    }

    if (node.childNodes) {
        for (const child of node.childNodes) {
            updateClassNames(child, classMap, selectorMap, classNameGenerator);
        }
    }
}

function getSelectorString(node: JsonNode, path: string[] = []): string {
    let selector: any = node.tagName;

    if (node.attributes) {
        if (node.attributes.id) {
            selector += `#${node.attributes.id}`;
        }
        if (node.attributes.class) {
            const classes = node.attributes.class.split(' ').join('.');
            selector += `.${classes}`;
        }
    }

    path.push(selector);

    return path.join(' > ');
}
