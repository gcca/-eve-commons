import { Modal } from '../../index';

import { InternalModal } from './interfaces';

declare const $: { fn: { modal: { Constructor: InternalModal } } };

export class BootstrapModal implements Modal {

  private bootstrapModal: InternalModal;

  constructor(element: JQuery) {
    this.bootstrapModal = new $.fn.modal.Constructor(element, {
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
