import { Modal } from './index';
import { ModalArgs } from './interfaces';
import { ModalBuilderFactory } from './builder.factory';

export class ModalService {

  static $inject = ['$injector'];

  constructor(private $injector: ng.auto.IInjectorService) { }

  new(options: ModalArgs): Modal {
    const $compile = this.$injector.get('$compile');
    const modalBuilder = new ModalBuilderFactory({ $compile }).get();
    const modal = modalBuilder.new(options);
    return modal;
  }
}
