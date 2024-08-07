import { useEffect } from 'react';

import { useStoreApi } from '../hooks/useStore';
import useKeyPress, { type UseKeyPressOptions } from './useKeyPress';
import type { KeyCode } from '../types';
import useReactFlow from './useReactFlow';
interface HookParams {
  deleteKeyCode: KeyCode | null;
  multiSelectionKeyCode: KeyCode | null;
}

const deleteKeyOptions: UseKeyPressOptions = { actInsideInputWithModifier: false };

export default ({ deleteKeyCode, multiSelectionKeyCode }: HookParams): void => {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();

  const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
  const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode);

  useEffect(() => {
    if (deleteKeyPressed) {
      const { edges, getNodes } = store.getState();
      const selectedNodes = getNodes().filter((node) => node.selected);
      const selectedEdges = edges.filter((edge) => edge.selected);
      deleteElements({ nodes: selectedNodes, edges: selectedEdges });
      store.setState({ nodesSelectionActive: false });
    }
  }, [deleteKeyPressed]);

  useEffect(() => {
    store.setState({ multiSelectionActive: multiSelectionKeyPressed });
  }, [multiSelectionKeyPressed]);
};
