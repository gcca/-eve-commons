/**
 * Interface for options to construct a [[Modal]].
 */
export interface ModalOptionsArgs {
  controller?: ng.IController;
}

/**
 * Required structure when constructing new [[Modal]]();
 *
 * @experimental
 */
export interface ModalArgs extends ModalOptionsArgs {
  template: string;
  $scope: ng.IScope;  // TODO: optional
}
