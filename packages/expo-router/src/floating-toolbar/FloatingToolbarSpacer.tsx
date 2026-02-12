'use client';
import { useFloatingToolbar } from './context';
import { FloatingToolbarItem } from './native';
import type { FloatingToolbarSpacerProps } from './types';

/**
 * A spacer element inside a `FloatingToolbar` to create gaps between buttons.
 *
 * @example
 * ```tsx
 * <FloatingToolbar>
 *   <FloatingToolbar.Button icon={{ drawable: 'star' }} onPress={() => {}} />
 *   <FloatingToolbar.Spacer />
 *   <FloatingToolbar.Button icon={{ drawable: 'delete' }} onPress={() => {}} />
 * </FloatingToolbar>
 * ```
 *
 * @platform android
 */
export function FloatingToolbarSpacer(props: FloatingToolbarSpacerProps) {
  const isInsideToolbar = useFloatingToolbar();

  if (process.env.NODE_ENV !== 'production' && !isInsideToolbar) {
    throw new Error('FloatingToolbar.Spacer must be used inside a FloatingToolbar');
  }

  return <FloatingToolbarItem isSpacer spacerWidth={props.width} />;
}
