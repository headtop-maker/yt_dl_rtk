// Reexport the native module. On web, it will be resolved to DlmoduleModule.web.ts
// and on native platforms to DlmoduleModule.ts
export { default } from './DlmoduleModule';
export { default as DlmoduleView } from './DlmoduleView';
export * from  './Dlmodule.types';
