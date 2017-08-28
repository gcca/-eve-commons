import { Navigator } from './navigator';

export class NextController implements ng.IController {

  /* @ngInject */
  constructor(private navigator: Navigator) { }

  click() {
    this.navigator.next();
  }
}

export const NextComponent = {
  controller: NextController,
  template: '<button ng-transclude ng-click="$ctrl.click()"></button>',
  transclude: true,
};
