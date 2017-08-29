import { BoundaryNavigator } from '../navigator';
import { WizardModule } from '../wizard.module';

export function singleNavigation() {
  let back: HTMLButtonElement,
      next: HTMLButtonElement,
      steps: Array<HTMLElement>,
      $element: JQLite;

  angular.module('test.commons.ui.wizard (creation)', [ WizardModule.name ])
    .component('dummy', {})
    .component('test', {
      template: `
        <wizard>

          <visualizer></visualizer>

          <steps>
            <step label="Step 0"><dummy></dummy></step>
            <step label="Step 1"><dummy></dummy></step>
            <step label="Step 2"><dummy></dummy></step>
          </steps>

          <back>Regresar</back>
          <next>Siguiente</next>

        </wizard>
      `,
    })
    .service('navigator', BoundaryNavigator)
  ;

  beforeEach(angular.mock.module('test.commons.ui.wizard (creation)'));

  beforeEach(inject(($compile: ng.ICompileService,
                     $rootScope: ng.IRootScopeService) => {
    $element = $compile('<test></test>')($rootScope.$new());
    $rootScope.$digest();

    back = findButton($element, 'back');
    next = findButton($element, 'next');
    steps = findSteps($element);

    if (3 !== steps.length) {
      throw new Error('This needs three steps');
    }
  }));

  it('should base nav next', () => {
    next.click();
    next.click();
    back.click();
    back.click();
  });

  it('should single next', () => {
    expect(isStepShown(steps[0])).toBeTruthy();
    expect(everyIsHidden(restOf(steps, 0))).toBeTruthy();
    next.click();
  });

  it('should double next', () => {
    next.click();
    next.click();
  });

  it('should complete next and back', () => {
    next.click();
    next.click();
    back.click();
  });

  it('should next boundary and back', () => {
    next.click();
    next.click();
    next.click();
    back.click();
  });

  it('should extra info back', () => {
    next.click();
    next.click();
    next.click();
    next.click();
    back.click();
    back.click();
  });
}

function everyIsHidden(steps: HTMLElement[]) {
  return steps.every(s => isStepHidden(s))
}

function findButton($element: JQLite, name: 'back' | 'next') {
  const button = $element.find(name)[0].querySelector('button');
  if (button) {
    return button;
  }
  throw new Error(`Error finding button ${name}`);
}

function findSteps($element: JQLite) {
  const steps = $element.find('steps')[0].querySelectorAll('step');
  if (steps && 0 < steps.length) {
    return [...(steps as any)] as HTMLElement[];
  }
  throw new Error(`Error finding steps`);
}

function isStepHidden(step: Element) {
  const div = step.firstElementChild;
  if (div) {
    return div.classList.contains('ng-hide');
  }
  throw new Error('Without elements?');
}

function isStepShown(step: Element) {
  return !isStepHidden(step);
}

function restOf(steps: HTMLElement[], n: number) {
  return steps.slice(0, n).concat(steps.slice(n + 1));
}
