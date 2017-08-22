import { Modal, ModalBuilder } from '../index';
import { ModalArgs } from '../interfaces';

declare const $: any;  // TODO: remove

export class BootstrapModal implements Modal {

  bootstrapModal: {
    show(_relatedTarget?: Element): void;
  }

  constructor(private element: JQuery) {
    this.bootstrapModal = new $.fn.modal.Constructor(this.element, {});
  }

  show() {
    this.bootstrapModal.show();
  }
}

export class ModalBootstrapBuilder implements ModalBuilder {

  constructor(private $compile: ng.ICompileService) { }

  new(options: ModalArgs): Modal {
    const element = angular.element(options.template);
    const $scope = options.$scope;
    this.$compile(element)($scope);
    $scope.$digest();
    return new BootstrapModal(element);
  }
}
