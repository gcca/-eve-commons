// TODO: import on demand to optimize packaging
import { ModalBootstrapBuilder } from './context/bootstrap/builder';
import { ModalBuilder } from './index';

export type UIContext = 'bootstrap';

export interface BuilderFactoryArgs {
  $compile: ng.ICompileService;
}

export class ModalBuilderFactory {

  constructor(private args: BuilderFactoryArgs) { }

  // TODO: remove dummy default when implement factory injection
  get(context: UIContext = 'bootstrap'): ModalBuilder {
    switch(context) {
      case 'bootstrap': return new ModalBootstrapBuilder(this.args.$compile);
      default: return invalidContext(context);
    }
  }
}

function invalidContext(context: UIContext): never {
  throw new TypeError('Unexpected UI context: ' + context);
}
