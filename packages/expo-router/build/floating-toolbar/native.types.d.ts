import type { ColorValue, ViewProps } from 'react-native';
export interface FloatingToolbarHostProps extends ViewProps {
    variant?: 'standard' | 'vibrant';
    backgroundTint?: ColorValue;
    elevation?: number;
    shapeAppearance?: number;
    hidden?: boolean;
    alignment?: 'left' | 'center' | 'right';
}
export interface FloatingToolbarItemProps extends ViewProps {
    title?: string;
    iconDrawable?: string;
    iconSrc?: number;
    disabled?: boolean;
    tintColor?: ColorValue;
    isSpacer?: boolean;
    spacerWidth?: number;
    onSelected?: () => void;
}
//# sourceMappingURL=native.types.d.ts.map