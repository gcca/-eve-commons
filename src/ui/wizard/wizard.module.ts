import { BackComponent } from './back.component';
import { NextComponent } from './next.component';
import { NotImplementedNavigator } from './navigator';
import { StepComponent } from './step.component';
import { StepsComponent } from './steps.component';
import { VisualizerComponent } from './visualizer.component';
import { WizardComponent } from './wizard.component';

export const WizardModule = angular.module('ui.wizard', [
]);

WizardModule
  .component('back', BackComponent)
  .component('next', NextComponent)
  .component('step', StepComponent)
  .component('steps', StepsComponent)
  .component('visualizer', VisualizerComponent)
  .component('wizard', WizardComponent)
  .service('navigator', NotImplementedNavigator)
;
