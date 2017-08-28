import { WizardModule } from './wizard.module';

import { BoundaryNavigator } from './navigator';

angular.module('test.commons.ui.wizard (creation)', [ WizardModule.name ])
  .component('dummy', { template: '- d u m m y -' })
  .service('navigator', BoundaryNavigator)
  .component('test', {
    template: `
      <wizard>

        <visualizer></visualizer>

        <steps>
          <step label="Step 1"><dummy></dummy></step>
          <step label="Step 2"><dummy></dummy></step>
          <step label="Step 3"><dummy></dummy></step>
        </steps>

        <back>Regresar</back>
        <next>Siguiente</next>

      </wizard>
    `,
  })
;

describe('WizardComponent', () => {
  let $element: JQLite;

  beforeEach(angular.mock.module('test.commons.ui.wizard (creation)'));

  beforeEach(inject(($compile: ng.ICompileService,
                     $rootScope: ng.IRootScopeService) => {
    $element = $compile('<test></test>')($rootScope.$new());
    $rootScope.$digest();
  }));

  it('should base nav next', () => {
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    backClick();
    infoSelection();
    backClick();
    infoSelection();
  });

  it('should single next', () => {
    infoSelection();
    nextClick();
  });

  it('should double next', () => {
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
  });

  it('should complete next and back', () => {
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    backClick();
    infoSelection();
  });

  it('should next boundary and back', () => {
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    backClick();
    infoSelection();
  });

  fit('should extra info back', () => {
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    nextClick();
    infoSelection();
    backClick();
    infoSelection();
    backClick();
    infoSelection();
  });

  function infoSelection() {
    const result = $element.html().match(/span.*(true|false)/g);
    if (result) {
      console.log(result.map(s =>
        (({'false': 'o', 'true': 'x'} as any)[s.slice(24)])).join('  '));
    } else {
      throw new Error('No STEP info');
    }
  }

  function nextClick() {
    const button = findButton('next');
    button.click();
  }

  function backClick() {
    const button = findButton('back');
    button.click();
  }

  function findButton(name: 'back' | 'next') {
    const button = $element.find(name)[0].querySelector('button');
    if (button) {
      return button;
    }
    throw new Error('No NEXT');
  }
});
