declare const $: any;  // TODO: remove

export interface Overlay { }

export interface Modal extends Overlay {
  show(): void;
}

export interface ModalOptionsArgs {
  controller?: ng.IController;
}

export interface ModalArgs extends ModalOptionsArgs {
  template: string;
  $scope: ng.IScope;  // TODO: optional
}

export interface ModalBuilder {
  new: (options: ModalArgs) => Modal;
}

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
  ng: {
    $compile: ng.ICompileService;
    $scope: ng.IScope;
  };

  new(options: ModalArgs): Modal {
    const element = angular.element(options.template);
    const $scope = options.$scope;
    this.ng.$compile(element)($scope);
    $scope.$digest();
    return new BootstrapModal(element);
  }
}

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
