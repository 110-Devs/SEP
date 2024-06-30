import { DocumentStore } from '@event-engine/infrastructure/DocumentStore';
import { InMemoryDocumentStore } from '@event-engine/infrastructure/DocumentStore/InMemoryDocumentStore';
import * as fs from 'fs';
import * as path from 'path';

type Modification<T> = {
  data: T;
  timestamp: number;
};

type Documents<T> = {
  modifications: Modification<T>[];
};

type DragAndDropData = {
  elementId: string;
  x: number;
  y: number;
};

type SortingData = {
  elements: {
    commandbar: number;
    components: number;
  };
};

type JsFunctionData = {
  func: string;
};

interface ModificationTypeMap {
  DragAndDropData: DragAndDropData;
  SortingData: SortingData;
  JsFunctionData: JsFunctionData;
}

const COLLECTION_MAP: Record<keyof ModificationTypeMap, string> = {
  DragAndDropData: '__drag-and-drop',
  SortingData: '__sorting',
  JsFunctionData: '__js-function',
};

export class PersistentManager {
  /**
   * The path to the storage file used by the PersistentManager.
   */
  private static storageFile: string;

  /**
   * The document store used by the PersistentManager.
   */
  private static ds: DocumentStore;

  /**
   * The name of the collection for storing drag and drop modifications.
   */
  static readonly DRAG_AND_DROP_COLLECTION = '__drag-and-drop';

  /**
   * The name of the collection for storing sorting modifications.
   */
  static readonly SORTING_COLLECTION = '__sorting';

  /**
   * The name of the collection for storing javascript function modifications.
   */
  static readonly JS_FUNCTION_COLLECTION = '__js-function';

  static {
    PersistentManager.storageFile =
      PersistentManager.getPersistentCollectionsPath();
    PersistentManager.ds = new InMemoryDocumentStore(
      PersistentManager.storageFile
    );
    PersistentManager.initializePersistentCollections();
  }

  public static async getSortingModification(
    collection: string = PersistentManager.SORTING_COLLECTION,
    pageRoute: string
  ): Promise<Modification<SortingData> | undefined> {
    const modifications: Documents<SortingData> | null =
      await PersistentManager.ds.getDoc(collection, pageRoute);

    if (modifications && modifications.modifications.length > 0) {
      modifications.modifications.sort((a, b) => b.timestamp - a.timestamp);
      const latestModification = modifications.modifications[0];
      return latestModification;
    }
  }

  public static async getDragAndDropModification(
    collection: string = PersistentManager.DRAG_AND_DROP_COLLECTION,
    pageRoute: string
  ): Promise<object | undefined> {
    const modifications: Documents<DragAndDropData> | null =
      await PersistentManager.ds.getDoc(collection, pageRoute);
    const currentModifications = modifications?.modifications.reduce(
      (acc, curr) => {
        const elementId = curr.data.elementId;
        if (!acc[elementId] || acc[elementId].timestamp < curr.timestamp) {
          acc[elementId] = curr;
        }
        return acc;
      },
      {} as { [key: string]: Modification<DragAndDropData> }
    );

    return currentModifications;
  }

  public static async resetCollections(collection: string): Promise<void> {
    const collectionsToReset = [
      PersistentManager.DRAG_AND_DROP_COLLECTION,
      PersistentManager.SORTING_COLLECTION,
      PersistentManager.JS_FUNCTION_COLLECTION,
    ];
  
    for (const coll of collectionsToReset) {
      const existingDoc = await PersistentManager.ds.getDoc(coll, collection);
      if (existingDoc !== null) {
        await PersistentManager.ds.replaceDoc(coll, collection, {
          modifications: []
        });
      }
    }
  }  

  public static async getAllModifications(
    pageRoute: string
  ): Promise<Object | undefined> {
    const dnd = await PersistentManager.ds.getDoc('__drag-and-drop', pageRoute);
<<<<<<< HEAD
=======
    const order = await PersistentManager.ds.getDoc('__sorting', pageRoute);
>>>>>>> upstream/dev
    const func = await PersistentManager.ds.getDoc('__js-function', pageRoute);

    return {
      dnd,
<<<<<<< HEAD
=======
      order,
>>>>>>> upstream/dev
      func,
    };
  }

  public static async addModification<T extends object>(
    collection: string,
    pageRoute: string,
    data: T
  ): Promise<void> {
    let modifications = await PersistentManager.ds.getDoc(
      collection,
      pageRoute
    );

    if (modifications === null) {
      modifications = { modifications: [] };
      await PersistentManager.ds.addDoc(collection, pageRoute, modifications);
    }

    (modifications as { modifications: any[] }).modifications.push({
      data: data,
      timestamp: Date.now(),
    });

    await PersistentManager.ds.replaceDoc(collection, pageRoute, modifications);
  }

  /**
   * Initializes the persistent collections.
   */
  private static async initializePersistentCollections(): Promise<void> {
    await PersistentManager.ds.addCollection(
      PersistentManager.DRAG_AND_DROP_COLLECTION
    );
    await PersistentManager.ds.addCollection(
      PersistentManager.SORTING_COLLECTION
    );
    await PersistentManager.ds.addCollection(
      PersistentManager.JS_FUNCTION_COLLECTION
    );
  }

  /**
   * Recursively searches for the project root directory that contains the 'data'
   * folder and the 'persistent-collections.json' file.
   *
   * @param {string} startPath - The current path to start the search from.
   * @returns {string} The path of the project root directory.
   * @throws {Error} If the project root directory with the 'data' folder and
   * the 'persistent-collections.json' file is not found.
   */
  private static findPersistentCollectionsPath(startPath: string): string {
    let currentPath: string = startPath;

    // Loop through parent directories until the root directory is reached.
    while (currentPath !== path.parse(currentPath).root) {
      const dataPath = path.join(currentPath, 'data');
      const persistentCollectionsPath = path.join(
        dataPath,
        'persistent-collections.json'
      );

      if (
        fs.existsSync(dataPath) &&
        fs.statSync(dataPath).isDirectory() &&
        fs.existsSync(persistentCollectionsPath)
      ) {
        return currentPath;
      }

      currentPath = path.dirname(currentPath);
    }

    throw new Error(
      `\x1b[31mProject root with "data" folder or "persistent-collections.json" file not found.\x1b[0m
       Have you run \x1b[1mnpx nx run be:preparedb\x1b[0m?`
    );
  }

  /**
   * Returns the path to the persistent collections file.
   *
   * @returns {string} The path to the persistent collections file.
   */
  private static getPersistentCollectionsPath(): string {
    const currentWorkingDirectory = process.cwd();
    const projectRoot = this.findPersistentCollectionsPath(
      currentWorkingDirectory
    );
    return path.join(projectRoot, 'data', 'persistent-collections.json');
  }
}
