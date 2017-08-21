import { ModalBootstrapBuilder } from './contexts/bootstrap';
import { ModalBuilder } from './index';

export type UIContext = 'bootstrap';

export class ModalBuilderFactory {
  static get(context: UIContext): ModalBuilder {
    switch(context) {
      case 'bootstrap': return new ModalBootstrapBuilder();
      default: return invalidContext(context);
    }
  }
}

function invalidContext(context: UIContext): never {
  throw new TypeError('Unexpected UI context: ' + context);
}
