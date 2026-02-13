import { act } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  type HeaderBarButtonItemWithAction,
  ScreenStackItem as _ScreenStackItem,
} from 'react-native-screens';

import { Link } from '../../../exports';
import { router } from '../../../imperative-api';
import { renderRouter, screen } from '../../../testing-library';
import Stack from '../../Stack';

jest.mock('react-native-screens', () => {
  const actualScreens = jest.requireActual(
    'react-native-screens'
  ) as typeof import('react-native-screens');
  return {
    ...actualScreens,
    ScreenStackItem: jest.fn((props) => <actualScreens.ScreenStackItem {...props} />),
  };
});

const MockedRouterToolbarHost = jest.fn(({ children }) => <>{children}</>);
const MockedRouterToolbarItem = jest.fn(({ children }) => <>{children}</>);

jest.mock('../../../toolbar/native', () => {
  return {
    RouterToolbarHost: (props: any) => MockedRouterToolbarHost(props),
    RouterToolbarItem: (props: any) => MockedRouterToolbarItem(props),
  };
});

const ScreenStackItem = _ScreenStackItem as jest.MockedFunction<typeof _ScreenStackItem>;

function getLastScreenCallByTitle(title: string) {
  const calls = ScreenStackItem.mock.calls.filter((call) => call[0].headerConfig?.title === title);
  return calls.length > 0 ? calls[calls.length - 1] : undefined;
}

let consoleWarnMock: jest.SpyInstance;
beforeEach(() => {
  consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.clearAllMocks();
});

afterEach(() => {
  consoleWarnMock.mockRestore();
});

describe('Stack.Toolbar with preloaded routes', () => {
  it('does not apply toolbar options to a preloaded unfocused route', () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <Link href="/detail" prefetch>
          <Text testID="index">Go to detail</Text>
        </Link>
      ),
      detail: () => (
        <>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon="star" onPress={() => {}} />
          </Stack.Toolbar>
          <Text testID="detail">Detail</Text>
        </>
      ),
    });

    expect(screen.getByTestId('index')).toBeVisible();

    // The detail route should be preloaded (rendered but not focused).
    // Toolbar options should NOT be applied because Screen skips setOptions
    // for preloaded unfocused routes.
    const detailCall = getLastScreenCallByTitle('detail');
    expect(detailCall).toBeDefined();
    expect(detailCall![0].headerConfig?.headerRightBarButtonItems ?? []).toHaveLength(0);
  });

  it('applies toolbar options when navigating to a preloaded route', () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <Link href="/detail" prefetch>
          <Text testID="index">Go to detail</Text>
        </Link>
      ),
      detail: () => (
        <>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon="star" onPress={() => {}} />
          </Stack.Toolbar>
          <Text testID="detail">Detail</Text>
        </>
      ),
    });

    expect(screen.getByTestId('index')).toBeVisible();

    // Verify toolbar items are NOT set while preloaded
    const detailCallBefore = getLastScreenCallByTitle('detail');
    expect(detailCallBefore).toBeDefined();
    expect(detailCallBefore![0].headerConfig?.headerRightBarButtonItems ?? []).toHaveLength(0);

    jest.clearAllMocks();

    // Navigate to the preloaded route - it becomes focused
    act(() => router.push('/detail'));

    expect(screen.getByTestId('detail')).toBeVisible();

    // After navigation, toolbar items SHOULD be applied
    const detailCallAfter = getLastScreenCallByTitle('detail');
    expect(detailCallAfter).toBeDefined();
    expect(detailCallAfter![0].headerConfig?.headerRightBarButtonItems).toHaveLength(1);
    expect(
      (
        detailCallAfter![0].headerConfig!
          .headerRightBarButtonItems![0] as HeaderBarButtonItemWithAction
      ).icon
    ).toEqual({ type: 'sfSymbol', name: 'star' });
  });

  it('retains toolbar items when the screen is blurred by pushing another screen', () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <Link href="/detail" prefetch>
          <Text testID="index">Go to detail</Text>
        </Link>
      ),
      detail: () => (
        <>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon="star" onPress={() => {}} />
          </Stack.Toolbar>
          <Text testID="detail">Detail</Text>
        </>
      ),
      other: () => <Text testID="other">Other</Text>,
    });

    // Navigate to the preloaded detail route
    act(() => router.push('/detail'));
    expect(screen.getByTestId('detail')).toBeVisible();

    // Verify toolbar items are applied
    let detailCall = getLastScreenCallByTitle('detail');
    expect(detailCall![0].headerConfig?.headerRightBarButtonItems).toHaveLength(1);

    jest.clearAllMocks();

    // Push another screen on top - detail is now blurred but still in the stack
    act(() => router.push('/other'));
    expect(screen.getByTestId('other')).toBeVisible();

    // The blurred detail screen should still have its toolbar items
    detailCall = getLastScreenCallByTitle('detail');
    expect(detailCall).toBeDefined();
    expect(detailCall![0].headerConfig?.headerRightBarButtonItems).toHaveLength(1);
    expect(
      (detailCall![0].headerConfig!.headerRightBarButtonItems![0] as HeaderBarButtonItemWithAction)
        .icon
    ).toEqual({ type: 'sfSymbol', name: 'star' });
  });

  it('applies left toolbar options only after preloaded route is focused', () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <Link href="/detail" prefetch>
          <Text testID="index">Go to detail</Text>
        </Link>
      ),
      detail: () => (
        <>
          <Stack.Toolbar placement="left">
            <Stack.Toolbar.Button icon="sidebar.left" onPress={() => {}} />
          </Stack.Toolbar>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon="ellipsis.circle" onPress={() => {}} />
          </Stack.Toolbar>
          <Text testID="detail">Detail</Text>
        </>
      ),
    });

    expect(screen.getByTestId('index')).toBeVisible();

    // While preloaded: no toolbar items
    const detailCallBefore = getLastScreenCallByTitle('detail');
    expect(detailCallBefore).toBeDefined();
    expect(detailCallBefore![0].headerConfig?.headerLeftBarButtonItems ?? []).toHaveLength(0);
    expect(detailCallBefore![0].headerConfig?.headerRightBarButtonItems ?? []).toHaveLength(0);

    jest.clearAllMocks();

    // Navigate to the preloaded route
    act(() => router.push('/detail'));
    expect(screen.getByTestId('detail')).toBeVisible();

    // Both left and right toolbar items should be applied
    const detailCallAfter = getLastScreenCallByTitle('detail');
    expect(detailCallAfter).toBeDefined();
    expect(detailCallAfter![0].headerConfig?.headerLeftBarButtonItems).toHaveLength(1);
    expect(
      (
        detailCallAfter![0].headerConfig!
          .headerLeftBarButtonItems![0] as HeaderBarButtonItemWithAction
      ).icon
    ).toEqual({ type: 'sfSymbol', name: 'sidebar.left' });
    expect(detailCallAfter![0].headerConfig?.headerRightBarButtonItems).toHaveLength(1);
    expect(
      (
        detailCallAfter![0].headerConfig!
          .headerRightBarButtonItems![0] as HeaderBarButtonItemWithAction
      ).icon
    ).toEqual({ type: 'sfSymbol', name: 'ellipsis.circle' });
  });

  it('clears toolbar items via cleanupOptions when navigating back from a focused preloaded route', () => {
    renderRouter({
      _layout: () => <Stack />,
      index: () => (
        <Link href="/detail" prefetch>
          <Text testID="index">Go to detail</Text>
        </Link>
      ),
      detail: () => (
        <>
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button icon="star" onPress={() => {}} />
          </Stack.Toolbar>
          <Text testID="detail">Detail</Text>
        </>
      ),
    });

    // Navigate to the preloaded route so toolbar options are applied
    act(() => router.push('/detail'));
    expect(screen.getByTestId('detail')).toBeVisible();

    // Verify toolbar items are set
    const detailCall = getLastScreenCallByTitle('detail');
    expect(detailCall![0].headerConfig?.headerRightBarButtonItems).toHaveLength(1);

    jest.clearAllMocks();

    // Navigate back - the detail screen unmounts, cleanup should fire
    act(() => router.back());
    expect(screen.getByTestId('index')).toBeVisible();

    // The detail screen should no longer be in the rendered stack
    // (or if still rendered during transition, its toolbar items should be cleared)
    const indexCall = getLastScreenCallByTitle('index');
    expect(indexCall).toBeDefined();
    // Index screen should not have the detail's toolbar items
    expect(indexCall![0].headerConfig?.headerRightBarButtonItems ?? []).toHaveLength(0);
  });
});
