interface JsonNode {
    nodeType?: number;
    tagName?: string;
    attributes?: { [key: string]: string };
    childNodes?: JsonNode[];
    nodeValue?: string;
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
) {
    const newNode = { ...node, attributes: { ...node.attributes } }; 
    let currentNumber = '';
    const currentSelector = getSelectorString(node);

    if (currentSelector == '.MuiGrid-container') {
        return {newNode, classMap, selectorMap};
    }

    if (newNode.attributes && newNode.attributes.class) {
        currentNumber = classNameGenerator.generateClassName();
        classMap[currentNumber] = newNode.attributes.class;
        selectorMap[currentNumber] = currentSelector;
        newNode.attributes.class = currentNumber;
    }

    if (newNode.childNodes) {
        newNode.childNodes = newNode.childNodes.map(child =>
            updateClassNames(child, classNameGenerator, currentSelector, classMap, selectorMap).newNode
        );
    }

    return {newNode, classMap, selectorMap};
}


function getSelectorString(node: JsonNode): string {
    let selector = '';

    if (node.attributes) {
        if (node.attributes['data-selector']) {
            selector = node.attributes['data-selector'];
        }
    }

    return selector;
}

