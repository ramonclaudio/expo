import { render, screen } from '@testing-library/react-native';

import { FloatingToolbar } from '../FloatingToolbar';

jest.mock('../native', () => {
  const { View }: typeof import('react-native') = jest.requireActual('react-native');
  return {
    FloatingToolbarHost: jest.fn(({ children }) => (
      <View testID="FloatingToolbarHost">{children}</View>
    )),
    FloatingToolbarItem: jest.fn((props) => <View testID="FloatingToolbarItem" {...props} />),
  };
});

const { FloatingToolbarHost, FloatingToolbarItem } = jest.requireMock(
  '../native'
) as typeof import('../native');
const MockedFloatingToolbarHost = FloatingToolbarHost as jest.MockedFunction<
  typeof FloatingToolbarHost
>;
const MockedFloatingToolbarItem = FloatingToolbarItem as jest.MockedFunction<
  typeof FloatingToolbarItem
>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('FloatingToolbar', () => {
  it('renders host with default props', () => {
    render(
      <FloatingToolbar>
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(screen.getByTestId('FloatingToolbarHost')).toBeVisible();
    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'standard',
        shapeAppearance: 28,
        hidden: false,
      }),
      undefined
    );
  });

  it('passes variant prop to host', () => {
    render(
      <FloatingToolbar variant="vibrant">
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'vibrant',
      }),
      undefined
    );
  });

  it('passes backgroundColor as backgroundTint', () => {
    render(
      <FloatingToolbar backgroundColor="red">
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        backgroundTint: 'red',
      }),
      undefined
    );
  });

  it('passes elevation to host', () => {
    render(
      <FloatingToolbar elevation={8}>
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        elevation: 8,
      }),
      undefined
    );
  });

  it('passes borderRadius as shapeAppearance', () => {
    render(
      <FloatingToolbar borderRadius={16}>
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        shapeAppearance: 16,
      }),
      undefined
    );
  });

  it('passes hidden=true to host', () => {
    render(
      <FloatingToolbar hidden>
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarHost).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: true,
      }),
      undefined
    );
  });

  it('renders multiple buttons and a spacer', () => {
    render(
      <FloatingToolbar>
        <FloatingToolbar.Button icon={{ drawable: 'star' }} />
        <FloatingToolbar.Spacer />
        <FloatingToolbar.Button icon={{ drawable: 'edit' }} />
      </FloatingToolbar>
    );

    expect(MockedFloatingToolbarItem).toHaveBeenCalledTimes(3);
    // [0] first button
    expect(MockedFloatingToolbarItem.mock.calls[0][0]).toMatchObject({
      iconDrawable: 'star',
    });
    // [1] spacer
    expect(MockedFloatingToolbarItem.mock.calls[1][0]).toMatchObject({
      isSpacer: true,
    });
    // [2] second button
    expect(MockedFloatingToolbarItem.mock.calls[2][0]).toMatchObject({
      iconDrawable: 'edit',
    });
  });

  it('has compound sub-components', () => {
    expect(FloatingToolbar.Button).toBeDefined();
    expect(FloatingToolbar.Spacer).toBeDefined();
    expect(FloatingToolbar.Icon).toBeDefined();
    expect(FloatingToolbar.Label).toBeDefined();
  });
});
