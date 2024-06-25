type Modification = {
  // type: 'drag-and-drop' | 'sorting' | 'js-function';
  data: DragAndDropData | SortingData | JsFunctionData;
  timestamp: number;
};

type documents = {
  modifications: Modification[];
};

type DragAndDropData = {
  elementId: string;
  x: number;
  y: number;
};

type SortingData = {
  elements: string[];
};

type JsFunctionData = {};
class ModificationData {
  constructor(
    readonly data: DragAndDropData | SortingData | JsFunctionData,
    readonly timestamp: number,
    readonly collectoin: string
  ) {}
}

class DragAndDropData extends ModificationData {
  constructor(data: DragAndDropData, timestamp: number) {
    super(data, timestamp, '__drag-and-drop');
  }
}
