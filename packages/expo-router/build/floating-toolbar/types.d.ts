import type { ReactNode } from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
/**
 * Props for the `FloatingToolbar` component.
 *
 * @platform android
 */
export interface FloatingToolbarProps {
    /**
     * The content of the floating toolbar. Use `FloatingToolbar.Button` and `FloatingToolbar.Spacer`.
     */
    children?: ReactNode;
    /**
     * Positioning within the parent container.
     *
     * @default 'bottom'
     */
    position?: 'top' | 'bottom';
    /**
     * Visual style variant.
     *
     * - `'standard'` uses `colorSurfaceContainer` background
     * - `'vibrant'` uses `colorPrimaryContainer` background
     *
     * @default 'standard'
     */
    variant?: 'standard' | 'vibrant';
    /**
     * Background color override for the toolbar.
     */
    backgroundColor?: ColorValue;
    /**
     * Shadow/elevation depth of the toolbar in density-independent pixels (dp).
     */
    elevation?: number;
    /**
     * Corner radius of the toolbar container.
     *
     * @default 28
     */
    borderRadius?: number;
    /**
     * Horizontal alignment of the toolbar within its parent.
     *
     * @default 'center'
     */
    alignment?: 'left' | 'center' | 'right';
    /**
     * Whether the toolbar is hidden.
     *
     * @default false
     */
    hidden?: boolean;
    /**
     * Additional container styles.
     */
    style?: StyleProp<ViewStyle>;
}
/**
 * Props for `FloatingToolbar.Button`.
 *
 * @platform android
 */
export interface FloatingToolbarButtonProps {
    /**
     * Icon to display. Use `{ drawable: string }` for Android drawable resources.
     */
    icon?: {
        drawable: string;
    };
    /**
     * Called when the button is pressed.
     */
    onPress?: () => void;
    /**
     * Whether the button is disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Tint color applied to the icon.
     */
    tintColor?: ColorValue;
    /**
     * Accessibility label for the button.
     */
    accessibilityLabel?: string;
    /**
     * Sub-components: `FloatingToolbar.Icon`, `FloatingToolbar.Label`.
     */
    children?: ReactNode;
}
/**
 * Props for `FloatingToolbar.Spacer`.
 *
 * @platform android
 */
export interface FloatingToolbarSpacerProps {
    /**
     * Fixed width in density-independent pixels. If omitted, the spacer is flexible.
     */
    width?: number;
}
//# sourceMappingURL=types.d.ts.map