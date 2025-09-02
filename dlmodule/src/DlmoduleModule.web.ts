import { registerWebModule, NativeModule } from 'expo';

import { DlmoduleModuleEvents } from './Dlmodule.types';

class DlmoduleModule extends NativeModule<DlmoduleModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(DlmoduleModule, 'DlmoduleModule');
