import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { FloatingToolbarSpacer } from '../FloatingToolbarSpacer';
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

describe('FloatingToolbarSpacer', () => {
  it('renders FloatingToolbarItem when inside toolbar context', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarSpacer />
      </FloatingToolbarContext.Provider>
    );

    expect(screen.getByTestId('FloatingToolbarItem')).toBeVisible();
    expect(MockedFloatingToolbarItem).toHaveBeenCalled();
  });

  it('throws error when not inside FloatingToolbar', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<FloatingToolbarSpacer />);
    }).toThrow('FloatingToolbar.Spacer must be used inside a FloatingToolbar');
    jest.restoreAllMocks();
  });

  it('passes isSpacer=true to FloatingToolbarItem', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarSpacer />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        isSpacer: true,
      }),
      undefined
    );
  });

  it('passes spacerWidth when width is provided', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarSpacer width={20} />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        isSpacer: true,
        spacerWidth: 20,
      }),
      undefined
    );
  });

  it('passes spacerWidth as undefined when width is omitted', () => {
    render(
      <FloatingToolbarContext.Provider value>
        <FloatingToolbarSpacer />
      </FloatingToolbarContext.Provider>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledWith(
      expect.objectContaining({
        isSpacer: true,
        spacerWidth: undefined,
      }),
      undefined
    );
  });
});
