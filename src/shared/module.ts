export interface ModuleOptionsArgs {
  imports?: any[];
}

export interface ModuleArgs extends ModuleOptionsArgs {
  name: string;
}

export function Module(options: ModuleArgs) {
  const imports = options.imports;
  const requires = imports ? imports.map(module => module.name) : [];

  angular.module(options.name, requires);

  return <T extends {new(...args: any[]): {}}>(constructor: T): T =>
    constructor;
}
