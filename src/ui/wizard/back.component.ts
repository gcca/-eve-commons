import { Navigator } from './navigator';

export class BackController implements ng.IController {

  /* @ngInject */
  constructor(private navigator: Navigator) { }

  click() {
    this.navigator.back();
  }
}

export const BackComponent = {
  controller: BackController,
  template: '<button ng-transclude ng-click="$ctrl.click()"></button>',
  transclude: true,
};
