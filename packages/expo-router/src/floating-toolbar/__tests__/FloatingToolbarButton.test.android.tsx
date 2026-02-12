import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { Icon, Label } from '../../primitives';
import { FloatingToolbarButton } from '../FloatingToolbarButton';
import { FloatingToolbarContext } from '../context';

jest.mock('../native', () => {
  const { View }: typeof import('react-native') = jest.requireActual('react-native');
  return {
    FloatingToolbarHost: jest.fn(({ children }) => (
      <View testID="FloatingToolbarHost">{children}</View>
    )),
    FloatingToolbarItem: jest.fn((props) => <View testID="FloatingToolbarItem" {...props} />),
  };
});

const { FloatingToolbarItem } = jest.requireMock('../native') as typeof import('../native');
const MockedFloatingToolbarItem = FloatingToolbarItem as jest.MockedFunction<
  typeof FloatingToolbarItem
>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('FloatingToolbarButton', () => {
  it('renders FloatingToolbarItem when inside toolbar context', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} />
      </FloatingToolbarContext.Provider>
    );

    expect(screen.getByTestId('FloatingToolbarItem')).toBeVisible();
    expect(MockedFloatingToolbarItem).toHaveBeenCalled();
  });

  it('throws error when not inside FloatingToolbar', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<FloatingToolbarButton icon={{ drawable: 'star' }} />);
    }).toThrow('FloatingToolbar.Button must be used inside a FloatingToolbar');
    jest.restoreAllMocks();
  });

  it('passes drawable icon to FloatingToolbarItem', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        iconDrawable: 'star',
      }),
      undefined
    );
  });

  it('passes onPress as onSelected', () => {
    const onPress = jest.fn();
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} onPress={onPress} />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        onSelected: onPress,
      }),
      undefined
    );
  });

  it.each([true, false, undefined])('passes disabled=%s prop', (disabled) => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} disabled={disabled} />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled,
      }),
      undefined
    );
  });

  it('passes tintColor prop', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} tintColor="red" />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        tintColor: 'red',
      }),
      undefined
    );
  });

  it('passes accessibilityLabel prop', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton icon={{ drawable: 'star' }} accessibilityLabel="Favorite" />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        accessibilityLabel: 'Favorite',
      }),
      undefined
    );
  });

  it('passes iconDrawable as undefined when no icon is provided', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton onPress={() => {}} />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        iconDrawable: undefined,
      }),
      undefined
    );
  });

  it('resolves icon from Icon child with drawable prop', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton>
          <Icon drawable="star" />
        </FloatingToolbarButton>
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        iconDrawable: 'star',
      }),
      undefined
    );
  });

  it('resolves title from Label child', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton>
          <Label>Star</Label>
        </FloatingToolbarButton>
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Star',
      }),
      undefined
    );
  });

  it('resolves both icon and label from children', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton>
          <Icon drawable="edit" />
          <Label>Edit</Label>
        </FloatingToolbarButton>
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        iconDrawable: 'edit',
        title: 'Edit',
      }),
      undefined
    );
  });

  it('resolves title from string children', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarButton>Button Text</FloatingToolbarButton>
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Button Text',
      }),
      undefined
    );
  });
});
