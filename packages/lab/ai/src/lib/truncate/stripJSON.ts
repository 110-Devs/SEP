interface JsonNode {
    nodeType?: number;
    tagName?: string;
    attributes?: { [key: string]: string };
    childNodes?: JsonNode[];
    nodeValue?: string;
}

interface strippedJsonNode {
    newNode: JsonNode;
    classMap: AssociativeArray,
    selectorMap: AssociativeArray,
}

interface AssociativeArray {
    [key: string]: string
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
    classNameGenerator: ClassNameGenerator,
    parentSelector = '',
    classMap: AssociativeArray = {},
    selectorMap: AssociativeArray = {},
): strippedJsonNode {
    // eslint-disable-next-line prefer-const
    let newNode: any = { ...node, attributes: { ...node.attributes } };
    
    const currentNumber = classNameGenerator.generateClassName();
    const currentSelector = getSelectorString(node, parentSelector ? parentSelector.split(' > ') : []);


    if (newNode.attributes && newNode.attributes.class) {
        classMap[currentNumber] = newNode.attributes.class;
        selectorMap[currentNumber] = currentSelector;
        newNode.attributes.class = currentNumber;
    }

    if (node.childNodes) {
        for (const child of newNode.childNodes) {
            updateClassNames(child, classNameGenerator, currentSelector, classMap, selectorMap);
        }
    }

    return {newNode, classMap, selectorMap};
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
