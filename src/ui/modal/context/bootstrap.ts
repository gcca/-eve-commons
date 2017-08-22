import { Modal, ModalBuilder } from '../index';
import { ModalArgs } from '../interfaces';

declare const $: { fn: { modal: { Constructor: _BootstrapModal } } };

export class BootstrapModal implements Modal {

  private bootstrapModal: _BootstrapModal;

  constructor(private element: JQuery) {
    this.bootstrapModal = new $.fn.modal.Constructor(this.element, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true,
    });
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

interface _BootstrapModal {
  new(element: JQuery, config: BootstrapModalConfig): _BootstrapModal;
  dispose(): void;
  handleUpdate(): void;
  hide(event?: Event): void;
  show(_relatedTarget?: Element): void;
  toogle(_relatedTarget?: Element): void;
  VERSION: string;
  Default: BootstrapModalConfig;
}

interface BootstrapModalConfig {
  backdrop: boolean;
  keyboard: boolean;
  focus: boolean;
  show: boolean;
}
