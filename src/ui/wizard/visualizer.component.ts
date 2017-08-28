import { Navigator } from './navigator';

export class VisualizerController implements ng.IController {

  /* @ngInject */
  constructor(private navigator: Navigator) { }

  items() {
    return this.navigator.items;
  }
}

export const VisualizerComponent = {
  controller: VisualizerController,
  template: `
  <ol>
    <li ng-repeat="item in $ctrl.items()"
        ng-class="{ selected: $ctrl.selected }">
      {{ item.label }}
    </li>
  </ol>
  `,
};
