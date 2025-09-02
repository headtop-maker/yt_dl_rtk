import * as React from 'react';

import { DlmoduleViewProps } from './Dlmodule.types';

export default function DlmoduleView(props: DlmoduleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
