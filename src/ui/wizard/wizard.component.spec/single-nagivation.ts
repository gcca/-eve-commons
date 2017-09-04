import { BoundaryNavigator } from '../navigator';
import { WizardModule } from '../wizard.module';

export function singleNavigation() {
  beforeEach(() => {
    jasmine.addMatchers({
      toBeTheOnlyShownStepOn: () => ({
        compare: (actual: HTMLElement, expected: HTMLElement[]) => ({
          pass: isStepShown(actual)
                && everyIsHidden(restOf(expected, expected.indexOf(actual))),
        }),
      }),
    });
  });

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

  // it('should base nav next', () => {});

  it('should single next', () => {
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
  });

  it('should double next', () => {
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
  });

  it('should complete next and back', () => {
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    back.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
  });

  it('should next boundary and back', () => {
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    back.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
  });

  it('should extra info back', () => {
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    next.click();
    expect(steps[2]).toBeTheOnlyShownStepOn(steps);
    back.click();
    expect(steps[1]).toBeTheOnlyShownStepOn(steps);
    back.click();
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
    back.click();
    expect(steps[0]).toBeTheOnlyShownStepOn(steps);
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
