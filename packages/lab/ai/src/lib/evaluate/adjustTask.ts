/**
 * Prepares the doTask() method from the AI so that it is ready to be executed by eval()
 *
 * @param {[key: string]: string} selectorArr Associative array that has every selector to each class
 * @param {string} doTask Outputted doTask method as a string
 * @returns
 */
export function adjustTask(
  selectorArr: { [key: string]: string },
  doTask: string
) {
  const codeIdentifier = /^```javascript\s*([\s\S]*?)\s*```$/i;
  const classIdentifier = /\.?[A-Z][0-9]{2}/g;
  const match = doTask.match(codeIdentifier);

  if (match) {
    const functionString = match[1];
    console.log(functionString);

    //returns the selector from the array
    const replacedTask: string = functionString.replace(classIdentifier, (match: string): string => {
        const key: string = match.slice(1);
        if (key in selectorArr) {
          return selectorArr[key];
        }
        return match;
      }
    );
    return replacedTask;
  } else {
    return 'No match found';
  }
}

const theJSON = {
  tagName: 'BODY',
  attributes: {
    'data-selector': 'body',
  },
  childNodes: [
    {
      tagName: 'DIV',
      attributes: {
        'data-selector': '#root',
      },
      childNodes: [
        {
          tagName: 'DIV',
          attributes: {
            class: 'MuiBox-root css-1fa9wkz',
            'data-selector': '.css-1fa9wkz',
          },
          childNodes: [
            {
              tagName: 'HEADER',
              attributes: {
                class:
                  'MuiPaper-root MuiPaper-elevation MuiPaper-elevation4 MuiAppBar-root MuiAppBar-colorDefault MuiAppBar-positionFixed mui-fixed css-ftta7v-MuiPaper-root-MuiAppBar-root',
                'data-selector': '.MuiPaper-elevation4',
              },
              childNodes: [
                {
                  tagName: 'DIV',
                  attributes: {
                    class:
                      'MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-hyum1k-MuiToolbar-root',
                    'data-selector': '.MuiToolbar-root',
                  },
                  childNodes: [
                    {
                      tagName: 'DIV',
                      attributes: {
                        class: 'MuiBox-root css-2k0wqz',
                        'data-selector': '.css-2k0wqz',
                      },
                      childNodes: [
                        {
                          tagName: 'H3',
                          attributes: {
                            class:
                              'MuiTypography-root MuiTypography-h3 css-w9zzx7-MuiTypography-root',
                            'data-selector': '.css-w9zzx7-MuiTypography-root',
                          },
                          childNodes: [
                            {
                              nodeValue: 'Cody Engine',
                              childNodes: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: 'DIV',
                      attributes: {
                        class: 'MuiBox-root css-9n8416',
                        'data-selector': '.css-9n8416',
                      },
                      childNodes: [
                        {
                          tagName: 'NAV',
                          attributes: {
                            class:
                              'MuiTypography-root MuiTypography-body1 MuiBreadcrumbs-root css-1jpgyou-MuiTypography-root-MuiBreadcrumbs-root',
                            'data-selector': '.MuiBreadcrumbs-root',
                          },
                          childNodes: [
                            {
                              tagName: 'OL',
                              attributes: {
                                class:
                                  'MuiBreadcrumbs-ol css-4pdmu4-MuiBreadcrumbs-ol',
                                'data-selector': '.MuiBreadcrumbs-ol',
                              },
                              childNodes: [
                                {
                                  tagName: 'LI',
                                  attributes: {
                                    class: 'MuiBreadcrumbs-li',
                                    'data-selector': '.MuiBreadcrumbs-li',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'P',
                                      attributes: {
                                        class:
                                          'MuiTypography-root MuiTypography-body1 css-4peds9-MuiTypography-root',
                                        'data-selector':
                                          '.css-4peds9-MuiTypography-root',
                                      },
                                      childNodes: [
                                        {
                                          nodeValue: 'Status Overview',
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: 'DIV',
                      attributes: {
                        class: 'MuiBox-root css-i9gxme',
                        'data-selector': '.css-i9gxme',
                      },
                      childNodes: [],
                    },
                    {
                      tagName: 'BUTTON',
                      attributes: {
                        class:
                          'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root',
                        'data-selector':
                          '.css-78trlr-MuiButtonBase-root-MuiIconButton-root',
                      },
                      childNodes: [
                        {
                          tagName: 'svg',
                          attributes: {
                            class:
                              'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1d159sf-MuiSvgIcon-root',
                            'data-selector': '.css-1d159sf-MuiSvgIcon-root',
                          },
                          childNodes: [
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector':
                                  '.css-1d159sf-MuiSvgIcon-root > path',
                              },
                              childNodes: [],
                            },
                          ],
                        },
                        {
                          tagName: 'SPAN',
                          attributes: {
                            class:
                              'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                            'data-selector':
                              '.css-78trlr-MuiButtonBase-root-MuiIconButton-root > .MuiTouchRipple-root',
                          },
                          childNodes: [],
                        },
                      ],
                    },
                    {
                      tagName: 'BUTTON',
                      attributes: {
                        class:
                          'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root',
                        'data-selector':
                          '.css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root',
                      },
                      childNodes: [
                        {
                          tagName: 'svg',
                          attributes: {
                            class:
                              'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                            'data-selector':
                              '.css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root > .MuiSvgIcon-root',
                          },
                          childNodes: [
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector':
                                  '.css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root path',
                              },
                              childNodes: [],
                            },
                          ],
                        },
                        {
                          tagName: 'SPAN',
                          attributes: {
                            class:
                              'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                            'data-selector':
                              '.css-1jfmqnk-MuiButtonBase-root-MuiIconButton-root > .MuiTouchRipple-root',
                          },
                          childNodes: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              tagName: 'MAIN',
              attributes: {
                class: 'MuiBox-root css-5u1jm3',
                'data-selector': '.css-5u1jm3',
              },
              childNodes: [
                {
                  tagName: 'DIV',
                  attributes: {
                    class:
                      'MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3 css-1ynoxbp-MuiGrid2-root',
                    'data-selector': '.MuiGrid2-container',
                  },
                  childNodes: [
                    {
                      tagName: 'DIV',
                      attributes: {
                        'data-selector':
                          '.MuiGrid2-container > div:nth-child(1)',
                      },
                      childNodes: [
                        {
                          tagName: 'DIV',
                          attributes: {
                            class: 'SortableItem_sortableItem__2BTs1',
                            'data-selector':
                              '.SortableItem_sortableItem__2BTs1:nth-child(1)',
                          },
                          childNodes: [
                            {
                              tagName: 'DIV',
                              attributes: {
                                class:
                                  'SortableItem_draggableButtonWrapper__V+74v',
                                'data-selector':
                                  '.SortableItem_sortableItem__2BTs1:nth-child(1) > .SortableItem_draggableButtonWrapper__V\\+74v',
                              },
                              childNodes: [
                                {
                                  tagName: 'BUTTON',
                                  attributes: {
                                    class:
                                      'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1160ujr-MuiButtonBase-root-MuiIconButton-root',
                                    'data-selector':
                                      '.SortableItem_sortableItem__2BTs1:nth-child(1) > .SortableItem_draggableButtonWrapper__V\\+74v > .MuiButtonBase-root',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'svg',
                                      attributes: {
                                        class:
                                          'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                        'data-selector':
                                          '.SortableItem_sortableItem__2BTs1:nth-child(1) > .SortableItem_draggableButtonWrapper__V\\+74v .MuiSvgIcon-root',
                                      },
                                      childNodes: [
                                        {
                                          tagName: 'path',
                                          attributes: {
                                            'data-selector':
                                              '.SortableItem_sortableItem__2BTs1:nth-child(1) > .SortableItem_draggableButtonWrapper__V\\+74v path',
                                          },
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                    {
                                      tagName: 'SPAN',
                                      attributes: {
                                        class:
                                          'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                        'data-selector':
                                          '.SortableItem_sortableItem__2BTs1:nth-child(1) > .SortableItem_draggableButtonWrapper__V\\+74v .MuiTouchRipple-root',
                                      },
                                      childNodes: [],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tagName: 'DIV',
                              attributes: {
                                class:
                                  'MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-1wztgj9-MuiGrid2-root',
                                'data-selector':
                                  '.SortableItem_sortableItem__2BTs1:nth-child(1) > .MuiGrid2-root',
                              },
                              childNodes: [
                                {
                                  tagName: 'DIV',
                                  attributes: {
                                    class:
                                      'MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-omqjm3-MuiPaper-root-MuiCard-root',
                                    'data-selector': '.MuiPaper-rounded',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'DIV',
                                      attributes: {
                                        class: 'Wrapper_Wrapper__77rI4',
                                        'data-selector':
                                          '.MuiPaper-root > .Wrapper_Wrapper__77rI4',
                                      },
                                      childNodes: [
                                        {
                                          tagName: 'DIV',
                                          attributes: {
                                            class: 'Draggable_container__hSXoU',
                                            'data-selector':
                                              '.MuiPaper-root > .Wrapper_Wrapper__77rI4 > .Draggable_container__hSXoU',
                                          },
                                          childNodes: [
                                            {
                                              tagName: 'DIV',
                                              attributes: {
                                                'data-selector':
                                                  '.MuiPaper-root > .Wrapper_Wrapper__77rI4 > .Draggable_container__hSXoU > div',
                                              },
                                              childNodes: [
                                                {
                                                  tagName: 'DIV',
                                                  attributes: {
                                                    class:
                                                      'Draggable_draggableButton__Tcb9d',
                                                    'data-selector':
                                                      '.MuiPaper-root > .Wrapper_Wrapper__77rI4 .Draggable_draggableButton__Tcb9d',
                                                  },
                                                  childNodes: [
                                                    {
                                                      tagName: 'BUTTON',
                                                      attributes: {
                                                        class:
                                                          'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1160ujr-MuiButtonBase-root-MuiIconButton-root',
                                                        'data-selector':
                                                          '.MuiPaper-root > .Wrapper_Wrapper__77rI4 .MuiButtonBase-root',
                                                      },
                                                      childNodes: [
                                                        {
                                                          tagName: 'svg',
                                                          attributes: {
                                                            class:
                                                              'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                                            'data-selector':
                                                              '.MuiPaper-root > .Wrapper_Wrapper__77rI4 .MuiSvgIcon-root',
                                                          },
                                                          childNodes: [
                                                            {
                                                              tagName: 'path',
                                                              attributes: {
                                                                'data-selector':
                                                                  '.MuiPaper-root > .Wrapper_Wrapper__77rI4 path',
                                                              },
                                                              childNodes: [],
                                                            },
                                                          ],
                                                        },
                                                        {
                                                          tagName: 'SPAN',
                                                          attributes: {
                                                            class:
                                                              'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                                            'data-selector':
                                                              '.MuiPaper-root > .Wrapper_Wrapper__77rI4 .MuiTouchRipple-root',
                                                          },
                                                          childNodes: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                                {
                                                  tagName: 'DIV',
                                                  attributes: {
                                                    'data-selector':
                                                      '.MuiPaper-root > .Wrapper_Wrapper__77rI4 div:nth-child(2)',
                                                  },
                                                  childNodes: [
                                                    {
                                                      tagName: 'DIV',
                                                      attributes: {
                                                        class:
                                                          'MuiCardHeader-root css-185gdzj-MuiCardHeader-root',
                                                        'data-selector':
                                                          '.MuiCardHeader-root',
                                                      },
                                                      childNodes: [
                                                        {
                                                          tagName: 'DIV',
                                                          attributes: {
                                                            class:
                                                              'MuiCardHeader-content css-1qbkelo-MuiCardHeader-content',
                                                            'data-selector':
                                                              '.MuiCardHeader-content',
                                                          },
                                                          childNodes: [
                                                            {
                                                              tagName: 'SPAN',
                                                              attributes: {
                                                                class:
                                                                  'MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-hfk73x-MuiTypography-root',
                                                                'data-selector':
                                                                  '.MuiTypography-h5',
                                                              },
                                                              childNodes: [
                                                                {
                                                                  nodeValue:
                                                                    'Actions',
                                                                  childNodes:
                                                                    [],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      tagName: 'DIV',
                                      attributes: {
                                        'data-selector': '#DndDescribedBy-3',
                                      },
                                      childNodes: [
                                        {
                                          nodeValue:
                                            '\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  ',
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                    {
                                      tagName: 'DIV',
                                      attributes: {
                                        'data-selector': '#DndLiveRegion-1',
                                      },
                                      childNodes: [],
                                    },
                                    {
                                      tagName: 'HR',
                                      attributes: {
                                        class:
                                          'MuiDivider-root MuiDivider-fullWidth css-9mgopn-MuiDivider-root',
                                        'data-selector': '.MuiDivider-root',
                                      },
                                      childNodes: [],
                                    },
                                    {
                                      tagName: 'DIV',
                                      attributes: {
                                        class:
                                          'MuiCardActions-root MuiCardActions-spacing css-i0umbk-MuiCardActions-root',
                                        'data-selector': '.MuiCardActions-root',
                                      },
                                      childNodes: [
                                        {
                                          tagName: 'DIV',
                                          attributes: {
                                            class: 'Wrapper_Wrapper__77rI4',
                                            'data-selector':
                                              '.MuiCardActions-root > .Wrapper_Wrapper__77rI4',
                                          },
                                          childNodes: [
                                            {
                                              tagName: 'DIV',
                                              attributes: {
                                                class:
                                                  'Draggable_container__hSXoU',
                                                'data-selector':
                                                  '.MuiCardActions-root .Draggable_container__hSXoU',
                                              },
                                              childNodes: [
                                                {
                                                  tagName: 'DIV',
                                                  attributes: {
                                                    'data-selector':
                                                      '.MuiCardActions-root .Draggable_container__hSXoU > div',
                                                  },
                                                  childNodes: [
                                                    {
                                                      tagName: 'DIV',
                                                      attributes: {
                                                        class:
                                                          'Draggable_draggableButton__Tcb9d',
                                                        'data-selector':
                                                          '.MuiCardActions-root .Draggable_draggableButton__Tcb9d',
                                                      },
                                                      childNodes: [
                                                        {
                                                          tagName: 'BUTTON',
                                                          attributes: {
                                                            class:
                                                              'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1160ujr-MuiButtonBase-root-MuiIconButton-root',
                                                            'data-selector':
                                                              '.MuiCardActions-root .Draggable_draggableButton__Tcb9d > .MuiButtonBase-root',
                                                          },
                                                          childNodes: [
                                                            {
                                                              tagName: 'svg',
                                                              attributes: {
                                                                class:
                                                                  'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                                                'data-selector':
                                                                  '.MuiCardActions-root .Draggable_draggableButton__Tcb9d .MuiSvgIcon-root',
                                                              },
                                                              childNodes: [
                                                                {
                                                                  tagName:
                                                                    'path',
                                                                  attributes: {
                                                                    'data-selector':
                                                                      '.MuiCardActions-root .Draggable_draggableButton__Tcb9d path',
                                                                  },
                                                                  childNodes:
                                                                    [],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              tagName: 'SPAN',
                                                              attributes: {
                                                                class:
                                                                  'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                                                'data-selector':
                                                                  '.MuiCardActions-root .Draggable_draggableButton__Tcb9d .MuiTouchRipple-root',
                                                              },
                                                              childNodes: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      tagName: 'DIV',
                                                      attributes: {
                                                        'data-selector':
                                                          '.MuiCardActions-root > .Wrapper_Wrapper__77rI4 div:nth-child(2)',
                                                      },
                                                      childNodes: [
                                                        {
                                                          tagName: 'BUTTON',
                                                          attributes: {
                                                            class:
                                                              'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-1rh9r0p-MuiButtonBase-root-MuiButton-root',
                                                            'data-selector':
                                                              '.css-1rh9r0p-MuiButtonBase-root-MuiButton-root',
                                                          },
                                                          childNodes: [
                                                            {
                                                              tagName: 'SPAN',
                                                              attributes: {
                                                                class:
                                                                  'MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon',
                                                                'data-selector':
                                                                  '.MuiButton-startIcon',
                                                              },
                                                              childNodes: [
                                                                {
                                                                  tagName:
                                                                    'svg',
                                                                  attributes: {
                                                                    class:
                                                                      'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                                                    'data-selector':
                                                                      '.MuiButton-startIcon > .MuiSvgIcon-root',
                                                                  },
                                                                  childNodes: [
                                                                    {
                                                                      tagName:
                                                                        'path',
                                                                      attributes:
                                                                        {
                                                                          'data-selector':
                                                                            '.MuiButton-startIcon path',
                                                                        },
                                                                      childNodes:
                                                                        [],
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              nodeValue:
                                                                'Add Status',
                                                              childNodes: [],
                                                            },
                                                            {
                                                              tagName: 'SPAN',
                                                              attributes: {
                                                                class:
                                                                  'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                                                'data-selector':
                                                                  '.css-1rh9r0p-MuiButtonBase-root-MuiButton-root > .MuiTouchRipple-root',
                                                              },
                                                              childNodes: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          tagName: 'DIV',
                                          attributes: {
                                            'data-selector':
                                              '#DndDescribedBy-5',
                                          },
                                          childNodes: [
                                            {
                                              nodeValue:
                                                '\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  ',
                                              childNodes: [],
                                            },
                                          ],
                                        },
                                        {
                                          tagName: 'DIV',
                                          attributes: {
                                            'data-selector': '#DndLiveRegion-3',
                                          },
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          tagName: 'DIV',
                          attributes: {
                            class: 'SortableItem_sortableItem__2BTs1',
                            'data-selector':
                              '.SortableItem_sortableItem__2BTs1:nth-child(2)',
                          },
                          childNodes: [
                            {
                              tagName: 'DIV',
                              attributes: {
                                class:
                                  'SortableItem_draggableButtonWrapper__V+74v',
                                'data-selector':
                                  '.SortableItem_sortableItem__2BTs1:nth-child(2) > .SortableItem_draggableButtonWrapper__V\\+74v',
                              },
                              childNodes: [
                                {
                                  tagName: 'BUTTON',
                                  attributes: {
                                    class:
                                      'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1160ujr-MuiButtonBase-root-MuiIconButton-root',
                                    'data-selector':
                                      '.SortableItem_sortableItem__2BTs1:nth-child(2) .MuiButtonBase-root',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'svg',
                                      attributes: {
                                        class:
                                          'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                        'data-selector':
                                          '.SortableItem_sortableItem__2BTs1:nth-child(2) .MuiSvgIcon-root',
                                      },
                                      childNodes: [
                                        {
                                          tagName: 'path',
                                          attributes: {
                                            'data-selector':
                                              '.SortableItem_sortableItem__2BTs1:nth-child(2) path',
                                          },
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                    {
                                      tagName: 'SPAN',
                                      attributes: {
                                        class:
                                          'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                        'data-selector':
                                          '.SortableItem_sortableItem__2BTs1:nth-child(2) .MuiTouchRipple-root',
                                      },
                                      childNodes: [],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              tagName: 'DIV',
                              attributes: {
                                class:
                                  'MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 css-1wztgj9-MuiGrid2-root',
                                'data-selector':
                                  '.SortableItem_sortableItem__2BTs1:nth-child(2) > .MuiGrid2-root',
                              },
                              childNodes: [
                                {
                                  tagName: 'DIV',
                                  attributes: {
                                    class: 'MuiBox-root css-0',
                                    'data-selector': '.css-0',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'H3',
                                      attributes: {
                                        class:
                                          'MuiTypography-root MuiTypography-h3 sidebar-anchor css-tb87f8-MuiTypography-root',
                                        'data-selector':
                                          '#component-hsma-110-devs-status-list',
                                      },
                                      childNodes: [
                                        {
                                          nodeValue: 'Status List',
                                          childNodes: [],
                                        },
                                      ],
                                    },
                                    {
                                      tagName: 'SPAN',
                                      attributes: {
                                        class:
                                          'MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorPrimary css-18lrjg1-MuiCircularProgress-root',
                                        'data-selector':
                                          '.MuiCircularProgress-root',
                                      },
                                      childNodes: [
                                        {
                                          tagName: 'svg',
                                          attributes: {
                                            class:
                                              'MuiCircularProgress-svg css-1idz92c-MuiCircularProgress-svg',
                                            'data-selector':
                                              '.MuiCircularProgress-svg',
                                          },
                                          childNodes: [
                                            {
                                              tagName: 'circle',
                                              attributes: {
                                                class:
                                                  'MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate css-176wh8e-MuiCircularProgress-circle',
                                                'data-selector':
                                                  '.MuiCircularProgress-circle',
                                              },
                                              childNodes: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: 'DIV',
                      attributes: {
                        'data-selector': '#DndDescribedBy-1',
                      },
                      childNodes: [
                        {
                          nodeValue:
                            '\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  ',
                          childNodes: [],
                        },
                      ],
                    },
                    {
                      tagName: 'DIV',
                      attributes: {
                        'data-selector': '#DndLiveRegion-5',
                      },
                      childNodes: [],
                    },
                  ],
                },
                {
                  tagName: 'DIV',
                  attributes: {
                    class: 'css-169zaeq',
                    'data-selector': '.css-169zaeq',
                  },
                  childNodes: [
                    {
                      tagName: 'BUTTON',
                      attributes: {
                        class:
                          'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium css-12mxol5-MuiButtonBase-root-MuiButton-root',
                        'data-selector':
                          '.css-12mxol5-MuiButtonBase-root-MuiButton-root',
                      },
                      childNodes: [
                        {
                          tagName: 'svg',
                          attributes: {
                            class:
                              'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                            'data-selector':
                              '.MuiButton-contained > .MuiSvgIcon-root',
                          },
                          childNodes: [
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector':
                                  '.MuiButton-contained > .MuiSvgIcon-root > path',
                              },
                              childNodes: [],
                            },
                          ],
                        },
                        {
                          tagName: 'SPAN',
                          attributes: {
                            class:
                              'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                            'data-selector':
                              '.css-12mxol5-MuiButtonBase-root-MuiButton-root > .MuiTouchRipple-root',
                          },
                          childNodes: [],
                        },
                      ],
                    },
                    {
                      tagName: 'DIV',
                      attributes: {
                        class: 'css-14t828x',
                        'data-selector': '.css-14t828x',
                      },
                      childNodes: [
                        {
                          tagName: 'INPUT',
                          attributes: {
                            class: 'css-1advnh3',
                            'data-selector': '.css-1advnh3',
                          },
                          childNodes: [],
                        },
                        {
                          tagName: 'BUTTON',
                          attributes: {
                            class:
                              'MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root',
                            'data-selector': '.MuiButton-text',
                          },
                          childNodes: [
                            {
                              tagName: 'svg',
                              attributes: {
                                class:
                                  'MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root',
                                'data-selector':
                                  '.MuiButton-text > .MuiSvgIcon-root',
                              },
                              childNodes: [
                                {
                                  tagName: 'path',
                                  attributes: {
                                    'data-selector': '.MuiButton-text path',
                                  },
                                  childNodes: [],
                                },
                              ],
                            },
                            {
                              tagName: 'SPAN',
                              attributes: {
                                class:
                                  'MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root',
                                'data-selector':
                                  '.MuiButton-text > .MuiTouchRipple-root',
                              },
                              childNodes: [
                                {
                                  tagName: 'SPAN',
                                  attributes: {
                                    class:
                                      'css-y4cjyz-MuiTouchRipple-ripple MuiTouchRipple-ripple MuiTouchRipple-rippleVisible',
                                    'data-selector':
                                      '.css-y4cjyz-MuiTouchRipple-ripple',
                                  },
                                  childNodes: [
                                    {
                                      tagName: 'SPAN',
                                      attributes: {
                                        class:
                                          'MuiTouchRipple-child MuiTouchRipple-childLeaving',
                                        'data-selector':
                                          '.MuiTouchRipple-child',
                                      },
                                      childNodes: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tagName: 'ASIDE',
          attributes: {
            class: 'ReactQueryDevtools',
            'data-selector': '.ReactQueryDevtools',
          },
          childNodes: [
            {
              tagName: 'DIV',
              attributes: {
                class: 'ReactQueryDevtoolsPanel',
                'data-selector': '#ReactQueryDevtoolsPanel',
              },
              childNodes: [
                {
                  tagName: 'DIV',
                  attributes: {
                    'data-selector': '#ReactQueryDevtoolsPanel > div',
                  },
                  childNodes: [],
                },
                {
                  tagName: 'BUTTON',
                  attributes: {
                    'data-selector': 'button:nth-child(3)',
                  },
                  childNodes: [
                    {
                      nodeValue: 'Close',
                      childNodes: [],
                    },
                  ],
                },
              ],
            },
            {
              tagName: 'BUTTON',
              attributes: {
                'data-selector': '.ReactQueryDevtools > button',
              },
              childNodes: [
                {
                  tagName: 'svg',
                  attributes: {
                    'data-selector': '.ReactQueryDevtools svg',
                  },
                  childNodes: [
                    {
                      tagName: 'g',
                      attributes: {
                        'data-selector': 'svg > g',
                      },
                      childNodes: [
                        {
                          tagName: 'g',
                          attributes: {
                            'data-selector': 'g > g',
                          },
                          childNodes: [
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector': 'g > path:nth-child(1)',
                              },
                              childNodes: [],
                            },
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector': 'path:nth-child(2)',
                              },
                              childNodes: [],
                            },
                            {
                              tagName: 'path',
                              attributes: {
                                'data-selector': 'path:nth-child(3)',
                              },
                              childNodes: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tagName: 'SPAN',
                  attributes: {
                    'data-selector': '.ReactQueryDevtools span',
                  },
                  childNodes: [
                    {
                      nodeValue: 'Open React Query Devtools',
                      childNodes: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
