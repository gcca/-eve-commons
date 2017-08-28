import { Navigator } from './navigator';

export class StepsController implements ng.IController {

  /* @ngInject */
  constructor(navigator: Navigator) {
    navigator.onChange((step: any) => step.select());
  }
}

export const StepsComponent: any = {
  controller: StepsController,
  template: '<div class="steps" ng-transclude></div>',
  transclude: true,
};
