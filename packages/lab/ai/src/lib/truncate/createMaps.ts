/* eslint-disable prefer-const */
import { stringify } from "querystring";

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

// Example usage:
const htmlJson: JsonNode = {
    "nodeType": 1,
    "tagName": "DIV",
    "attributes": {},
    "childNodes": [
        {
            "nodeType": 1,
            "tagName": "DIV",
            "attributes": {
                "class": "MuiBox-root css-1fa9wkz"
            },
            "childNodes": [
                {
                    "nodeType": 1,
                    "tagName": "HEADER",
                    "attributes": {
                        "class": "MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorDefault MuiAppBar-positionFixed mui-fixed css-ftta7v-MuiPaper-root-MuiAppBar-root"
                    },
                    "childNodes": [
                        {
                            "nodeType": 1,
                            "tagName": "DIV",
                            "attributes": {
                                "class": "MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-hyum1k-MuiToolbar-root"
                            },
                            "childNodes": [
                                {
                                    "nodeType": 1,
                                    "tagName": "DIV",
                                    "attributes": {
                                        "class": "MuiBox-root css-2k0wqz"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "H3",
                                            "attributes": {
                                                "class": "MuiTypography-root MuiTypography-h3 css-w9zzx7-MuiTypography-root"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 3,
                                                    "nodeValue": "\n                Cody Engine\n              ",
                                                    "childNodes": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "nodeType": 1,
                                    "tagName": "DIV",
                                    "attributes": {
                                        "class": "MuiBox-root css-9n8416"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "NAV",
                                            "attributes": {
                                                "class": "MuiTypography-root MuiTypography-body1 MuiBreadcrumbs-root css-1jpgyou-MuiTypography-root-MuiBreadcrumbs-root"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "OL",
                                                    "attributes": {
                                                        "class": "MuiBreadcrumbs-ol css-4pdmu4-MuiBreadcrumbs-ol"
                                                    },
                                                    "childNodes": [
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "LI",
                                                            "attributes": {
                                                                "class": "MuiBreadcrumbs-li"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "P",
                                                                    "attributes": {
                                                                        "class": "MuiTypography-root MuiTypography-body1 css-4peds9-MuiTypography-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "\n                      Status Overview\n                    ",
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "nodeType": 1,
                                    "tagName": "DIV",
                                    "attributes": {
                                        "class": "MuiBox-root css-i9gxme"
                                    },
                                    "childNodes": []
                                },
                                {
                                    "nodeType": 1,
                                    "tagName": "BUTTON",
                                    "attributes": {
                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "svg",
                                            "attributes": {
                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1d159sf-MuiSvgIcon-root"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "path",
                                                    "attributes": {},
                                                    "childNodes": []
                                                }
                                            ]
                                        },
                                        {
                                            "nodeType": 1,
                                            "tagName": "SPAN",
                                            "attributes": {
                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                            },
                                            "childNodes": []
                                        }
                                    ]
                                },
                                {
                                    "nodeType": 1,
                                    "tagName": "BUTTON",
                                    "attributes": {
                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "svg",
                                            "attributes": {
                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "path",
                                                    "attributes": {},
                                                    "childNodes": []
                                                }
                                            ]
                                        },
                                        {
                                            "nodeType": 1,
                                            "tagName": "SPAN",
                                            "attributes": {
                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                            },
                                            "childNodes": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": 1,
                    "tagName": "MAIN",
                    "attributes": {
                        "class": "MuiBox-root css-5u1jm3"
                    },
                    "childNodes": [
                        {
                            "nodeType": 1,
                            "tagName": "DIV",
                            "attributes": {
                                "class": "MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3 css-1ynoxbp-MuiGrid2-root"
                            },
                            "childNodes": [
                                {
                                    "nodeType": 1,
                                    "tagName": "DIV",
                                    "attributes": {
                                        "class": "MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-1wztgj9-MuiGrid2-root"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "DIV",
                                            "attributes": {
                                                "class": "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-omqjm3-MuiPaper-root-MuiCard-root"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "DIV",
                                                    "attributes": {
                                                        "class": "MuiCardHeader-root css-185gdzj-MuiCardHeader-root"
                                                    },
                                                    "childNodes": [
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "DIV",
                                                            "attributes": {
                                                                "class": "MuiCardHeader-content css-1qbkelo-MuiCardHeader-content"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "SPAN",
                                                                    "attributes": {
                                                                        "class": "MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-hfk73x-MuiTypography-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "Actions",
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "HR",
                                                    "attributes": {
                                                        "class": "MuiDivider-root MuiDivider-fullWidth css-9mgopn-MuiDivider-root"
                                                    },
                                                    "childNodes": []
                                                },
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "DIV",
                                                    "attributes": {
                                                        "class": "MuiCardActions-root MuiCardActions-spacing css-i0umbk-MuiCardActions-root"
                                                    },
                                                    "childNodes": [
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "BUTTON",
                                                            "attributes": {
                                                                "class": "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1rh9r0p-MuiButtonBase-root-MuiButton-root"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "SPAN",
                                                                    "attributes": {
                                                                        "class": "MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "svg",
                                                                            "attributes": {
                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "path",
                                                                                    "attributes": {},
                                                                                    "childNodes": []
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 3,
                                                                    "nodeValue": "Add Status",
                                                                    "childNodes": []
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "SPAN",
                                                                    "attributes": {
                                                                        "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                    },
                                                                    "childNodes": []
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "nodeType": 1,
                                    "tagName": "DIV",
                                    "attributes": {
                                        "class": "MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-1wztgj9-MuiGrid2-root"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "DIV",
                                            "attributes": {
                                                "class": "MuiBox-root css-0"
                                            },
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "H3",
                                                    "attributes": {
                                                        "class": "MuiTypography-root MuiTypography-h3 sidebar-anchor css-tb87f8-MuiTypography-root"
                                                    },
                                                    "childNodes": [
                                                        {
                                                            "nodeType": 3,
                                                            "nodeValue": "\n                  Status List\n                ",
                                                            "childNodes": []
                                                        }
                                                    ]
                                                },
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "DIV",
                                                    "attributes": {
                                                        "class": "MuiDataGrid-root MuiDataGrid-root--densityComfortable MuiDataGrid-withBorderColor css-10nd77o-MuiDataGrid-root"
                                                    },
                                                    "childNodes": [
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "DIV",
                                                            "attributes": {
                                                                "class": "MuiDataGrid-toolbarContainer css-128fb87-MuiDataGrid-toolbarContainer"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "BUTTON",
                                                                    "attributes": {
                                                                        "class": "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "svg",
                                                                                    "attributes": {
                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "path",
                                                                                            "attributes": {},
                                                                                            "childNodes": []
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "Columns",
                                                                            "childNodes": []
                                                                        },
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                            },
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "BUTTON",
                                                                    "attributes": {
                                                                        "class": "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "SPAN",
                                                                                    "attributes": {
                                                                                        "class": "MuiBadge-root css-1c32n2y-MuiBadge-root"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "svg",
                                                                                            "attributes": {
                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "path",
                                                                                                    "attributes": {},
                                                                                                    "childNodes": []
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "SPAN",
                                                                                            "attributes": {
                                                                                                "class": "MuiBadge-badge MuiBadge-standard MuiBadge-invisible MuiBadge-anchorOriginTopRight MuiBadge-anchorOriginTopRightRectangular MuiBadge-overlapRectangular MuiBadge-colorPrimary css-1pi4uwz-MuiBadge-badge"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 3,
                                                                                                    "nodeValue": "0",
                                                                                                    "childNodes": []
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "Filters",
                                                                            "childNodes": []
                                                                        },
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                            },
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "BUTTON",
                                                                    "attributes": {
                                                                        "class": "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "svg",
                                                                                    "attributes": {
                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "path",
                                                                                            "attributes": {},
                                                                                            "childNodes": []
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "Density",
                                                                            "childNodes": []
                                                                        },
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                            },
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "BUTTON",
                                                                    "attributes": {
                                                                        "class": "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "svg",
                                                                                    "attributes": {
                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "path",
                                                                                            "attributes": {},
                                                                                            "childNodes": []
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "nodeType": 3,
                                                                            "nodeValue": "Export",
                                                                            "childNodes": []
                                                                        },
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "SPAN",
                                                                            "attributes": {
                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                            },
                                                                            "childNodes": []
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "DIV",
                                                                    "attributes": {
                                                                        "class": "MuiBox-root css-1rr4qq7"
                                                                    },
                                                                    "childNodes": []
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "DIV",
                                                            "attributes": {
                                                                "class": "MuiDataGrid-main css-204u17-MuiDataGrid-main"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "DIV",
                                                                    "attributes": {
                                                                        "class": "MuiDataGrid-columnHeaders MuiDataGrid-withBorderColor css-1iyq7zh-MuiDataGrid-columnHeaders",
                                                                        "style": "\n                        min-height: 72px;\n                        max-height: 72px;\n                        line-height: 72px;\n                      "
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "DIV",
                                                                            "attributes": {
                                                                                "class": "MuiDataGrid-columnHeadersInner css-gl260s-MuiDataGrid-columnHeadersInner",
                                                                                "style": "transform: translate3d(0px, 0px, 0px)"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "css-yrdy0g-MuiDataGrid-columnHeaderRow"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiDataGrid-columnHeader MuiDataGrid-columnHeader--sortable MuiDataGrid-withBorderColor",
                                                                                                "style": "\n                              height: 72px;\n                              width: 265.5px;\n                              min-width: 265.5px;\n                              max-width: 265.5px;\n                            "
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnHeaderDraggableContainer"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-columnHeaderTitleContainer"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-columnHeaderTitleContainerContent"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "DIV",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiDataGrid-columnHeaderTitle css-t89xny-MuiDataGrid-columnHeaderTitle"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 3,
                                                                                                                                    "nodeValue": "\n                                    Title\n                                  ",
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "BUTTON",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "svg",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall MuiDataGrid-sortIcon css-ptiqhd-MuiSvgIcon-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": [
                                                                                                                                        {
                                                                                                                                            "nodeType": 1,
                                                                                                                                            "tagName": "path",
                                                                                                                                            "attributes": {},
                                                                                                                                            "childNodes": []
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "SPAN",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-menuIcon"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "BUTTON",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiDataGrid-menuIconButton css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "svg",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "path",
                                                                                                                                    "attributes": {},
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "SPAN",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                            },
                                                                                                                            "childNodes": []
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnSeparator MuiDataGrid-columnSeparator--sideRight",
                                                                                                        "style": "min-height: 72px; opacity: 1"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "svg",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiDataGrid-iconSeparator css-i4bv87-MuiSvgIcon-root"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "path",
                                                                                                                    "attributes": {},
                                                                                                                    "childNodes": []
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiDataGrid-columnHeader MuiDataGrid-columnHeader--sortable MuiDataGrid-withBorderColor",
                                                                                                "style": "\n                              height: 72px;\n                              width: 265.5px;\n                              min-width: 265.5px;\n                              max-width: 265.5px;\n                            "
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnHeaderDraggableContainer"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-columnHeaderTitleContainer"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-columnHeaderTitleContainerContent"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "DIV",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiDataGrid-columnHeaderTitle css-t89xny-MuiDataGrid-columnHeaderTitle"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 3,
                                                                                                                                    "nodeValue": "\n                                    Language\n                                  ",
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "BUTTON",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "svg",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall MuiDataGrid-sortIcon css-ptiqhd-MuiSvgIcon-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": [
                                                                                                                                        {
                                                                                                                                            "nodeType": 1,
                                                                                                                                            "tagName": "path",
                                                                                                                                            "attributes": {},
                                                                                                                                            "childNodes": []
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "SPAN",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-menuIcon"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "BUTTON",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiDataGrid-menuIconButton css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "svg",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "path",
                                                                                                                                    "attributes": {},
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "SPAN",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                            },
                                                                                                                            "childNodes": []
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnSeparator MuiDataGrid-columnSeparator--sideRight",
                                                                                                        "style": "min-height: 72px; opacity: 1"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "svg",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiDataGrid-iconSeparator css-i4bv87-MuiSvgIcon-root"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "path",
                                                                                                                    "attributes": {},
                                                                                                                    "childNodes": []
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiDataGrid-columnHeader MuiDataGrid-columnHeader--sortable MuiDataGrid-withBorderColor",
                                                                                                "style": "\n                              height: 72px;\n                              width: 265.5px;\n                              min-width: 265.5px;\n                              max-width: 265.5px;\n                            "
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnHeaderDraggableContainer"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-columnHeaderTitleContainer"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-columnHeaderTitleContainerContent"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "DIV",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiDataGrid-columnHeaderTitle css-t89xny-MuiDataGrid-columnHeaderTitle"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 3,
                                                                                                                                    "nodeValue": "\n                                    Active\n                                  ",
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "BUTTON",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "svg",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall MuiDataGrid-sortIcon css-ptiqhd-MuiSvgIcon-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": [
                                                                                                                                        {
                                                                                                                                            "nodeType": 1,
                                                                                                                                            "tagName": "path",
                                                                                                                                            "attributes": {},
                                                                                                                                            "childNodes": []
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "SPAN",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-menuIcon"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "BUTTON",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiDataGrid-menuIconButton css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "svg",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "path",
                                                                                                                                    "attributes": {},
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "SPAN",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                            },
                                                                                                                            "childNodes": []
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnSeparator MuiDataGrid-columnSeparator--sideRight",
                                                                                                        "style": "min-height: 72px; opacity: 1"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "svg",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiDataGrid-iconSeparator css-i4bv87-MuiSvgIcon-root"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "path",
                                                                                                                    "attributes": {},
                                                                                                                    "childNodes": []
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiDataGrid-columnHeader MuiDataGrid-columnHeader--sortable MuiDataGrid-withBorderColor",
                                                                                                "style": "\n                              height: 72px;\n                              width: 265.5px;\n                              min-width: 265.5px;\n                              max-width: 265.5px;\n                            "
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnHeaderDraggableContainer"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-columnHeaderTitleContainer"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-columnHeaderTitleContainerContent"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "DIV",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiDataGrid-columnHeaderTitle css-t89xny-MuiDataGrid-columnHeaderTitle"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 3,
                                                                                                                                    "nodeValue": "\n                                    Status Id\n                                  ",
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "DIV",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "BUTTON",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "svg",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall MuiDataGrid-sortIcon css-ptiqhd-MuiSvgIcon-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": [
                                                                                                                                        {
                                                                                                                                            "nodeType": 1,
                                                                                                                                            "tagName": "path",
                                                                                                                                            "attributes": {},
                                                                                                                                            "childNodes": []
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "SPAN",
                                                                                                                                    "attributes": {
                                                                                                                                        "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                                    },
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "DIV",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiDataGrid-menuIcon"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "BUTTON",
                                                                                                                    "attributes": {
                                                                                                                        "class": "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiDataGrid-menuIconButton css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                                                                                                    },
                                                                                                                    "childNodes": [
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "svg",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root"
                                                                                                                            },
                                                                                                                            "childNodes": [
                                                                                                                                {
                                                                                                                                    "nodeType": 1,
                                                                                                                                    "tagName": "path",
                                                                                                                                    "attributes": {},
                                                                                                                                    "childNodes": []
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "nodeType": 1,
                                                                                                                            "tagName": "SPAN",
                                                                                                                            "attributes": {
                                                                                                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                                                                                                            },
                                                                                                                            "childNodes": []
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "DIV",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiDataGrid-columnSeparator MuiDataGrid-columnSeparator--sideRight",
                                                                                                        "style": "min-height: 72px; opacity: 1"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "svg",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiDataGrid-iconSeparator css-i4bv87-MuiSvgIcon-root"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "path",
                                                                                                                    "attributes": {},
                                                                                                                    "childNodes": []
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "DIV",
                                                                    "attributes": {
                                                                        "class": "MuiDataGrid-virtualScroller css-axafay-MuiDataGrid-virtualScroller",
                                                                        "style": ""
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "DIV",
                                                                            "attributes": {
                                                                                "class": "MuiDataGrid-overlayWrapper css-ql19fo-MuiDataGrid-overlayWrapper"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "MuiDataGrid-overlayWrapperInner css-1akuw9y-MuiDataGrid-overlayWrapperInner",
                                                                                        "style": "height: 251px; width: 1062px"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiBox-root css-1qtb3ry"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "SPAN",
                                                                                                    "attributes": {},
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "svg",
                                                                                                            "attributes": {
                                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-colorDisabled MuiSvgIcon-fontSizeMedium css-4u6os2-MuiSvgIcon-root"
                                                                                                            },
                                                                                                            "childNodes": [
                                                                                                                {
                                                                                                                    "nodeType": 1,
                                                                                                                    "tagName": "path",
                                                                                                                    "attributes": {},
                                                                                                                    "childNodes": []
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "SPAN",
                                                                                                    "attributes": {},
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 3,
                                                                                                            "nodeValue": "  Nothing to show",
                                                                                                            "childNodes": []
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "DIV",
                                                                            "attributes": {
                                                                                "class": "MuiDataGrid-virtualScrollerContent css-1kwdphh-MuiDataGrid-virtualScrollerContent",
                                                                                "style": "width: 1062px; height: 1px; min-height: 100%"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "MuiDataGrid-virtualScrollerRenderZone css-s1v7zr-MuiDataGrid-virtualScrollerRenderZone"
                                                                                    },
                                                                                    "childNodes": []
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "nodeType": 1,
                                                            "tagName": "DIV",
                                                            "attributes": {
                                                                "class": "MuiDataGrid-footerContainer MuiDataGrid-withBorderColor css-wop1k0-MuiDataGrid-footerContainer"
                                                            },
                                                            "childNodes": [
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "DIV",
                                                                    "attributes": {},
                                                                    "childNodes": []
                                                                },
                                                                {
                                                                    "nodeType": 1,
                                                                    "tagName": "DIV",
                                                                    "attributes": {
                                                                        "class": "MuiTablePagination-root css-rtrcn9-MuiTablePagination-root"
                                                                    },
                                                                    "childNodes": [
                                                                        {
                                                                            "nodeType": 1,
                                                                            "tagName": "DIV",
                                                                            "attributes": {
                                                                                "class": "MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular MuiTablePagination-toolbar css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar"
                                                                            },
                                                                            "childNodes": [
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "MuiTablePagination-spacer css-1psng7p-MuiTablePagination-spacer"
                                                                                    },
                                                                                    "childNodes": []
                                                                                },
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "P",
                                                                                    "attributes": {
                                                                                        "class": "MuiTablePagination-selectLabel css-pdct74-MuiTablePagination-selectLabel"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 3,
                                                                                            "nodeValue": "\n                          Rows per page:\n                        ",
                                                                                            "childNodes": []
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "MuiInputBase-root MuiInputBase-colorPrimary css-16c50h-MuiInputBase-root-MuiTablePagination-select"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "DIV",
                                                                                            "attributes": {
                                                                                                "class": "MuiSelect-select MuiTablePagination-select MuiSelect-standard MuiInputBase-input css-194a1fa-MuiSelect-select-MuiInputBase-input"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 3,
                                                                                                    "nodeValue": "\n                            5\n                          ",
                                                                                                    "childNodes": []
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "INPUT",
                                                                                            "attributes": {
                                                                                                "class": "MuiSelect-nativeInput css-yf8vq0-MuiSelect-nativeInput"
                                                                                            },
                                                                                            "childNodes": []
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "svg",
                                                                                            "attributes": {
                                                                                                "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiTablePagination-selectIcon MuiSelect-iconStandard css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "path",
                                                                                                    "attributes": {},
                                                                                                    "childNodes": []
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "P",
                                                                                    "attributes": {
                                                                                        "class": "MuiTablePagination-displayedRows css-levciy-MuiTablePagination-displayedRows"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 3,
                                                                                            "nodeValue": "\n                          0–0 of 0\n                        ",
                                                                                            "childNodes": []
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "nodeType": 1,
                                                                                    "tagName": "DIV",
                                                                                    "attributes": {
                                                                                        "class": "MuiTablePagination-actions"
                                                                                    },
                                                                                    "childNodes": [
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "BUTTON",
                                                                                            "attributes": {
                                                                                                "class": "MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "svg",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "path",
                                                                                                            "attributes": {},
                                                                                                            "childNodes": []
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "nodeType": 1,
                                                                                            "tagName": "BUTTON",
                                                                                            "attributes": {
                                                                                                "class": "MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorInherit MuiIconButton-sizeMedium css-zylse7-MuiButtonBase-root-MuiIconButton-root"
                                                                                            },
                                                                                            "childNodes": [
                                                                                                {
                                                                                                    "nodeType": 1,
                                                                                                    "tagName": "svg",
                                                                                                    "attributes": {
                                                                                                        "class": "MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                                                                    },
                                                                                                    "childNodes": [
                                                                                                        {
                                                                                                            "nodeType": 1,
                                                                                                            "tagName": "path",
                                                                                                            "attributes": {},
                                                                                                            "childNodes": []
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": 1,
                            "tagName": "DIV",
                            "attributes": {
                                "class": "css-169zaeq"
                            },
                            "childNodes": [
                                {
                                    "nodeType": 1,
                                    "tagName": "BUTTON",
                                    "attributes": {
                                        "class": "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-12mxol5-MuiButtonBase-root-MuiButton-root"
                                    },
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "IMG",
                                            "attributes": {
                                                "style": "width: 40px; height: 40px"
                                            },
                                            "childNodes": []
                                        },
                                        {
                                            "nodeType": 1,
                                            "tagName": "SPAN",
                                            "attributes": {
                                                "class": "MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
                                            },
                                            "childNodes": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "nodeType": 1,
            "tagName": "ASIDE",
            "attributes": {
                "class": "ReactQueryDevtools"
            },
            "childNodes": [
                {
                    "nodeType": 1,
                    "tagName": "DIV",
                    "attributes": {
                        "class": "ReactQueryDevtoolsPanel",
                        "style": "\n            font-size: clamp(12px, 1.5vw, 14px);\n            font-family: sans-serif;\n            display: flex;\n            background-color: rgb(11, 21, 33);\n            color: white;\n            height: 500px;\n            position: fixed;\n            direction: ltr;\n            bottom: 0px;\n            border-top: 1px solid rgb(63, 78, 96);\n            transform-origin: center top;\n            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;\n            z-index: 99999;\n            visibility: hidden;\n            transition: all 0.2s ease 0s;\n            opacity: 0;\n            pointer-events: none;\n            transform: translateY(15px) scale(1.02);\n            left: 0px;\n            width: 100%;\n            max-height: 90%;\n          "
                    },
                    "childNodes": [
                        {
                            "nodeType": 1,
                            "tagName": "STYLE",
                            "attributes": {},
                            "childNodes": [
                                {
                                    "nodeType": 3,
                                    "nodeValue": "\n            .ReactQueryDevtoolsPanel * {\n              scrollbar-color: #132337 #3f4e60;\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar,\n            .ReactQueryDevtoolsPanel scrollbar {\n              width: 1em;\n              height: 1em;\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar-track,\n            .ReactQueryDevtoolsPanel scrollbar-track {\n              background: #132337;\n            }\n\n            .ReactQueryDevtoolsPanel *::-webkit-scrollbar-thumb,\n            .ReactQueryDevtoolsPanel scrollbar-thumb {\n              background: #3f4e60;\n              border-radius: 0.5em;\n              border: 3px solid #132337;\n            }\n          ",
                                    "childNodes": []
                                }
                            ]
                        },
                        {
                            "nodeType": 1,
                            "tagName": "DIV",
                            "attributes": {
                                "style": "\n              position: absolute;\n              cursor: row-resize;\n              z-index: 100000;\n              top: 0px;\n              margin-top: -4px;\n              width: 100%;\n              height: 4px;\n            "
                            },
                            "childNodes": []
                        },
                        {
                            "nodeType": 1,
                            "tagName": "BUTTON",
                            "attributes": {
                                "style": "\n              appearance: none;\n              font-size: 0.9em;\n              font-weight: bold;\n              background: rgb(63, 78, 96);\n              border: 0px;\n              border-radius: 0.3em;\n              color: white;\n              padding: 0.5em;\n              cursor: pointer;\n              position: absolute;\n              z-index: 99999;\n              margin: 0.5em;\n              bottom: 0px;\n              left: 0px;\n            "
                            },
                            "childNodes": [
                                {
                                    "nodeType": 3,
                                    "nodeValue": "\n            Close\n          ",
                                    "childNodes": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": 1,
                    "tagName": "BUTTON",
                    "attributes": {
                        "style": "\n            background: none;\n            border: 0px;\n            padding: 0px;\n            position: fixed;\n            z-index: 99999;\n            display: inline-flex;\n            font-size: 1.5em;\n            margin: 0.5em;\n            cursor: pointer;\n            width: fit-content;\n            bottom: 0px;\n            left: 0px;\n          "
                    },
                    "childNodes": [
                        {
                            "nodeType": 1,
                            "tagName": "svg",
                            "attributes": {},
                            "childNodes": [
                                {
                                    "nodeType": 1,
                                    "tagName": "g",
                                    "attributes": {},
                                    "childNodes": [
                                        {
                                            "nodeType": 1,
                                            "tagName": "g",
                                            "attributes": {},
                                            "childNodes": [
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "path",
                                                    "attributes": {},
                                                    "childNodes": []
                                                },
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "path",
                                                    "attributes": {},
                                                    "childNodes": []
                                                },
                                                {
                                                    "nodeType": 1,
                                                    "tagName": "path",
                                                    "attributes": {},
                                                    "childNodes": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": 1,
                            "tagName": "SPAN",
                            "attributes": {
                                "style": "\n              position: absolute;\n              width: 0.1px;\n              height: 0.1px;\n              overflow: hidden;\n            "
                            },
                            "childNodes": [
                                {
                                    "nodeType": 3,
                                    "nodeValue": "Open React Query Devtools",
                                    "childNodes": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}


let classMap = new Map<string,string>;
let selectorMap = new Map<string,string>;
const classNameGenerator = new ClassNameGenerator();
updateClassNames(htmlJson,classMap, selectorMap, classNameGenerator);


//console.log(JSON.stringify(htmlJson, null, 2));
console.log(classMap);
console.log(selectorMap);
