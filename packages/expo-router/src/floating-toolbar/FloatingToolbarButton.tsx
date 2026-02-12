'use client';
import type { ReactNode } from 'react';

import { useFloatingToolbar } from './context';
import { FloatingToolbarItem } from './native';
import type { FloatingToolbarButtonProps } from './types';
import { Icon, Label } from '../primitives';
import { getFirstChildOfType } from '../utils/children';

/**
 * A button displayed inside a `FloatingToolbar`.
 *
 * @example
 * ```tsx
 * <FloatingToolbar.Button icon={{ drawable: 'star' }} onPress={() => {}} />
 * ```
 *
 * @example
 * ```tsx
 * <FloatingToolbar.Button onPress={() => {}}>
 *   <FloatingToolbar.Icon drawable="star" />
 *   <FloatingToolbar.Label>Star</FloatingToolbar.Label>
 * </FloatingToolbar.Button>
 * ```
 *
 * @platform android
 */
export function FloatingToolbarButton(props: FloatingToolbarButtonProps) {
  const isInsideToolbar = useFloatingToolbar();

  if (process.env.NODE_ENV !== 'production' && !isInsideToolbar) {
    throw new Error('FloatingToolbar.Button must be used inside a FloatingToolbar');
  }

  const iconDrawable = resolveIconDrawable(props);
  const title = resolveLabel(props.children);

  return (
    <FloatingToolbarItem
      iconDrawable={iconDrawable}
      title={title}
      disabled={props.disabled}
      tintColor={props.tintColor}
      onSelected={props.onPress}
      accessibilityLabel={props.accessibilityLabel}
    />
  );
}

function resolveIconDrawable(props: FloatingToolbarButtonProps): string | undefined {
  if (props.icon) {
    return props.icon.drawable;
  }

  const iconChild = getFirstChildOfType(props.children, Icon);
  if (iconChild && typeof iconChild === 'object' && 'props' in iconChild) {
    return (iconChild.props as { drawable?: string }).drawable;
  }

  return undefined;
}

function resolveLabel(children: ReactNode): string | undefined {
  if (typeof children === 'string') {
    return children;
  }

  const labelChild = getFirstChildOfType(children, Label);
  if (labelChild && typeof labelChild === 'object' && 'props' in labelChild) {
    const labelChildren = (labelChild.props as { children?: ReactNode }).children;
    if (typeof labelChildren === 'string') {
      return labelChildren;
    }
  }

  return undefined;
}
