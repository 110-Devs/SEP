import axios from 'axios';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ReorderIcon from '@mui/icons-material/Reorder';

export interface MenuItem {
  text: string;
  date: Date;
  function: () => void;
  icon: JSX.Element;
}

interface ModificationData {
  elementId: string;
  x: number;
  y: number;
}

interface Modification {
  data: ModificationData;
  timestamp: number;
}

export async function initializeMenuItems(
  pageRoute: string,
  addCoordinates: (id: string, coords: { x: number; y: number }) => void,
  setOrder: (order: [number, number]) => void
) {
  let modifications;
  try {
    const response = await axios.get(
      `http://localhost:3000/api/get-all-modifications?route=${pageRoute}`
    );
    modifications = response?.data;
  } catch (error) {
    console.error(error);
  }

  if (!modifications || !modifications.dnd) {
    resetMenuItems();
    return;
  }

  const dndModifications: MenuItem[] = modifications.dnd
    ? modifications.dnd.modifications.map((modification: any) => ({
        text: extractId(modification.data.elementId),
        date: new Date(modification.timestamp),
        function: () => {
          addCoordinates(modification.data.elementId, {
            x: modification.data.x,
            y: modification.data.y,
          });
        },
        icon: <DragIndicatorIcon sx={{ fontSize: 20 }} />,
      }))
    : [];

  const orderModifications: MenuItem[] = modifications.order
    ? modifications.order.modifications.map((modification: any) => ({
        text: 'Reordered',
        date: new Date(modification.timestamp),
        function: () => {
          setOrder(modification.data.components);
        },
        icon: <ReorderIcon sx={{ fontSize: 20 }} />,
      }))
    : [];

    let func: string[] = [];

    const funcModifications: MenuItem[] = modifications.func
    ? modifications.func.modifications.map((modification: any) => {
        const currentFunc = [...func, modification.data.func]; // Create a new array with the current function
        func.push(modification.data.func); // Add to the global func array
        return {
          text: modification.data.prompt,
          date: new Date(modification.timestamp),
          function: () => {
            localStorage.setItem('funcToExecute', JSON.stringify(currentFunc));
            window.location.reload();
          },
          icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />,
        };
      })
    : [];

    menuItems = [...dndModifications, ...orderModifications, ...funcModifications];
    menuItems.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function extractId(elementId: string) {
  const match = elementId.match(/\.(\w+)$/);
  return match ? match[1] : elementId;
}

window.addEventListener('load', () => {
  const funcToExecute = localStorage.getItem('funcToExecute');
  if (funcToExecute) {
    const functions = JSON.parse(funcToExecute);
    functions.forEach((func: string) => {
      try {
        eval('(' + func + ')()');
      } catch (error) {}
    });
    localStorage.removeItem('funcToExecute');
  }
});

function resetMenuItems() {
  menuItems = [];
}

export let menuItems: MenuItem[] = [];
