import { getDefaultCustomizeFrame } from '../customizeFrame';

describe(getDefaultCustomizeFrame, () => {
  it('collapses URL frames and removes their locations', () => {
    const customizeFrame = getDefaultCustomizeFrame();

    expect(
      customizeFrame({
        file: 'http://localhost:8081/index.bundle?platform=ios',
        lineNumber: 10,
        column: 20,
        methodName: 'render',
      })
    ).toEqual({
      file: 'http://localhost:8081/index.bundle?platform=ios',
      lineNumber: null,
      column: null,
      methodName: 'render',
      collapse: true,
    });
  });

  it('does not collapse valid source file frames', () => {
    const customizeFrame = getDefaultCustomizeFrame();

    expect(
      customizeFrame({
        file: '/Users/app/src/index.tsx',
        lineNumber: 10,
        column: 20,
        methodName: 'render',
      })
    ).toEqual({
      file: '/Users/app/src/index.tsx',
      lineNumber: 10,
      column: 20,
      methodName: 'render',
      collapse: false,
    });
  });

  it('collapses node_modules frames with POSIX separators', () => {
    const customizeFrame = getDefaultCustomizeFrame();

    expect(
      customizeFrame({
        file: '/Users/app/node_modules/react/index.js',
        lineNumber: 10,
        column: 20,
        methodName: 'render',
      })
    ).toEqual({
      file: '/Users/app/node_modules/react/index.js',
      lineNumber: 10,
      column: 20,
      methodName: 'render',
      collapse: true,
    });
  });

  it('collapses node_modules frames with Windows separators', () => {
    jest.isolateModules(() => {
      mockWindowsPath();

      const { getDefaultCustomizeFrame } =
        require('../customizeFrame') as typeof import('../customizeFrame');
      const customizeFrame = getDefaultCustomizeFrame();

      expect(
        customizeFrame({
          file: 'C:\\Users\\app\\node_modules\\react\\index.js',
          lineNumber: 10,
          column: 20,
          methodName: 'render',
        })
      ).toEqual({
        file: 'C:\\Users\\app\\node_modules\\react\\index.js',
        lineNumber: 10,
        column: 20,
        methodName: 'render',
        collapse: true,
      });
    });
  });

  it.each([
    '/home/runner/work/expo-fork/expo-fork/packages/expo/build/async-require/setupHMR.js',
    '/Users/dev/oss/expo/packages/@expo/log-box/build/Data/LogBoxData.js',
    '/Users/dev/expo/.claude/worktrees/feature/packages/expo-router/build/useScreens.js',
    '/Users/dev/expo/packages/expo/build/launch/withDevTools.web.js',
  ])('collapses expo internal frames resolved outside node_modules: %s', (file) => {
    const customizeFrame = getDefaultCustomizeFrame();

    expect(
      customizeFrame({
        file,
        lineNumber: 10,
        column: 20,
        methodName: 'captureCurrentStack',
      })
    ).toEqual({
      file,
      lineNumber: 10,
      column: 20,
      methodName: 'captureCurrentStack',
      collapse: true,
    });
  });

  it('collapses expo internal frames outside node_modules with Windows separators', () => {
    jest.isolateModules(() => {
      mockWindowsPath();

      const { getDefaultCustomizeFrame } =
        require('../customizeFrame') as typeof import('../customizeFrame');
      const customizeFrame = getDefaultCustomizeFrame();

      expect(
        customizeFrame({
          file: 'D:\\a\\expo\\expo\\packages\\expo\\build\\async-require\\setupHMR.js',
          lineNumber: 10,
          column: 20,
          methodName: 'captureCurrentStack',
        })
      ).toEqual({
        file: 'D:\\a\\expo\\expo\\packages\\expo\\build\\async-require\\setupHMR.js',
        lineNumber: 10,
        column: 20,
        methodName: 'captureCurrentStack',
        collapse: true,
      });
    });
  });

  it('does not collapse workspace packages outside the expo internals list', () => {
    const customizeFrame = getDefaultCustomizeFrame();

    expect(
      customizeFrame({
        file: '/Users/dev/expo/packages/expo-camera/build/Camera.js',
        lineNumber: 8,
        column: 35,
        methodName: 'Camera',
      })
    ).toEqual({
      file: '/Users/dev/expo/packages/expo-camera/build/Camera.js',
      lineNumber: 8,
      column: 35,
      methodName: 'Camera',
      collapse: false,
    });
  });

  it.each([
    'C:\\Users\\app\\src\\index.tsx',
    'D:/Users/app/src/index.tsx',
    'K:\\Users\\app\\src\\index.tsx',
  ])('does not treat Windows absolute path %s as a URL', (file) => {
    jest.isolateModules(() => {
      mockWindowsPath();

      const { getDefaultCustomizeFrame } =
        require('../customizeFrame') as typeof import('../customizeFrame');
      const customizeFrame = getDefaultCustomizeFrame();

      expect(
        customizeFrame({
          file,
          lineNumber: 10,
          column: 20,
          methodName: 'render',
        })
      ).toEqual({
        file,
        lineNumber: 10,
        column: 20,
        methodName: 'render',
        collapse: false,
      });
    });
  });
});

function mockWindowsPath() {
  const path = jest.requireActual<typeof import('node:path')>('node:path');
  const windowsPath = {
    __esModule: true,
    ...path.win32,
    default: path.win32,
  };

  jest.doMock('node:path', () => windowsPath);
  jest.doMock('path', () => windowsPath);
}
