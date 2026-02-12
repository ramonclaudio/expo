'use client';
import { StyleSheet, View } from 'react-native';

import { FloatingToolbarContext } from './context';
import { FloatingToolbarHost } from './native';
import type { FloatingToolbarProps } from './types';

/**
 * A floating toolbar container for contextual actions.
 *
 * @platform android
 */
export function FloatingToolbarView(props: FloatingToolbarProps) {
  const {
    children,
    position = 'bottom',
    variant = 'standard',
    backgroundColor,
    elevation,
    borderRadius = 28,
    alignment = 'center',
    hidden = false,
    style,
  } = props;

  return (
    <View
      style={[styles.container, position === 'top' ? styles.top : styles.bottom, style]}
      pointerEvents="box-none">
      <FloatingToolbarHost
        style={styles.host}
        variant={variant}
        backgroundTint={backgroundColor}
        elevation={elevation}
        shapeAppearance={borderRadius}
        hidden={hidden}
        alignment={alignment}>
        <FloatingToolbarContext.Provider value>{children}</FloatingToolbarContext.Provider>
      </FloatingToolbarHost>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  top: {
    top: 16,
  },
  bottom: {
    bottom: 16,
  },
  host: {
    minHeight: 64,
  },
});
