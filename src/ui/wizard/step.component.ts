import { Navegable, Navigator } from './navigator';

export class StepController implements ng.IController, Navegable {

  label: string;
  selected: boolean;

  /* @ngInject */
  constructor(navigator: Navigator) {
    this.label = '';
    this.selected = false;
    navigator.add(this);
  }

  unselect() {
    this.selected = false;
  }

  select() {
    this.selected = true;
  }
}

export const StepComponent: ng.IComponentOptions & { styleUrl?: string } = {
  bindings: {
    label: '@',
  },
  controller: StepController,
  template: '<div class="step" ng-show="$ctrl.selected" ng-transclude></div>',
  transclude: true,
};
