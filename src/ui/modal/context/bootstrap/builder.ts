import { Modal, ModalBuilder } from '../../index';
import { ModalArgs } from '../../interfaces';

import { BootstrapModal } from './modal';

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
