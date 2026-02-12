'use client';
import { createContext, useContext } from 'react';

const FloatingToolbarContext = createContext(false);

/**
 * Returns `true` when the component is rendered inside a `FloatingToolbar`.
 */
export function useFloatingToolbar(): boolean {
  return useContext(FloatingToolbarContext);
}

export { FloatingToolbarContext };
