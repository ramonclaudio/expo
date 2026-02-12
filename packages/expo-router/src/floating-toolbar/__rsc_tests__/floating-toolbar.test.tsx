/// <reference types="jest-expo/rsc/expect" />
import * as React from 'react';

import { FloatingToolbar } from '../FloatingToolbar';
import { FloatingToolbarButton } from '../FloatingToolbarButton';
import { FloatingToolbarSpacer } from '../FloatingToolbarSpacer';

it(`renders FloatingToolbar`, async () => {
  await expect(<FloatingToolbar />).toMatchFlightSnapshot();
});

it(`renders FloatingToolbarButton`, async () => {
  await expect(<FloatingToolbarButton icon={{ drawable: 'star' }} />).toMatchFlightSnapshot();
});

it(`renders FloatingToolbarSpacer`, async () => {
  await expect(<FloatingToolbarSpacer />).toMatchFlightSnapshot();
});
