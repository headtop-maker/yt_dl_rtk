import { requireNativeView } from 'expo';
import * as React from 'react';

import { DlmoduleViewProps } from './Dlmodule.types';

const NativeView: React.ComponentType<DlmoduleViewProps> =
  requireNativeView('Dlmodule');

export default function DlmoduleView(props: DlmoduleViewProps) {
  return <NativeView {...props} />;
}
