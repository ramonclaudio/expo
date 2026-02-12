import { requireNativeView } from 'expo';
import type { ViewProps } from 'react-native';

import type { FloatingToolbarHostProps, FloatingToolbarItemProps } from './native.types';

const FloatingToolbarHostView: React.ComponentType<ViewProps & FloatingToolbarHostProps> =
  requireNativeView('ExpoFloatingToolbarModule', 'FloatingToolbarContainerView');

export function FloatingToolbarHost(props: FloatingToolbarHostProps) {
  return <FloatingToolbarHostView {...props} />;
}

const FloatingToolbarItemView: React.ComponentType<ViewProps & FloatingToolbarItemProps> =
  requireNativeView('ExpoFloatingToolbarModule', 'FloatingToolbarItemView');

export function FloatingToolbarItem(props: FloatingToolbarItemProps) {
  return <FloatingToolbarItemView {...props} />;
}
