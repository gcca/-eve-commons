import { Modal } from './index';
import { ModalArgs } from './interfaces';
// TODO: @commons.injector
import { ModalBootstrapBuilder } from './contexts/bootstrap';

export class ModalService {

  static $inject = ['$injector'];

  constructor(private $injector: ng.auto.IInjectorService) { }

  new(options: ModalArgs): Modal {
    const $compile = this.$injector.get('$compile');
    const $scope = {} as ng.IScope;
    const modalBuilder = new ModalBootstrapBuilder();
    modalBuilder.ng = {
      $compile,
      $scope,
    };
    const modal = modalBuilder.new(options);
    return modal;
  }
}
