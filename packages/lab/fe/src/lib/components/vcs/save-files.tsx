import axios from 'axios';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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

  menuItems = [...dndModifications, ...orderModifications];
  menuItems.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function extractId(elementId: string) {
  const match = elementId.match(/\.(\w+)$/);
  return match ? match[1] : elementId;
}

export let menuItems: MenuItem[] = [];
