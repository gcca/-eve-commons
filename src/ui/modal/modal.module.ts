import { ModalService } from './modal.service';

export const ModalModule = angular.module('commons.ui.modal', []);

ModalModule
  .service('modalService', ModalService);
;
