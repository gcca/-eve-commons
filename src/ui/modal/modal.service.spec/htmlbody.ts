import { Modal } from '../index';
import { ModalService } from '../modal.service';

export function describeHTMLBody() {
  let spyOk: jasmine.Spy;

  angular.module('test.commons.ui.modal (html-body)', [])
    .component('testComponent', {
      controller: class implements ng.IOnInit {
        modal: Modal;
        modalHtml: {
          title: string;
          content: string;
        };

        constructor(private modalService: ModalService,
                    $scope: ng.IScope) {
          this.modalHtml = {
            title: 'MODAL TITLE',
            content: 'MODAL CONTENT',
          };

          this.modal = this.modalService.new({
            template: `
            <div class="modal">
              <header>{{ $ctrl.modalHtml.title }}</header>
              <section>{{ $ctrl.modalHtml.content }}</section>
              <footer>
                <button id="modalButton" ng-click="$ctrl.ok()">OK</button>
              </footer>
            </div>
            `,
            $scope,
          });
        }

        ok() {
          this.modalHtml.title = 'OK TITLE';
          spyOk();
        }

        $onInit() {
          this.modal.show();
        }
      },
      template: '',
    })
    .service('modalService', ModalService)
  ;

  afterEach(() => {
    const modal = document.querySelector('.modal.ng-scope');
    if (modal) {
      document.body.removeChild(modal);
    } else {
      throw new TypeError('`modal` not found');
    }
  });

  beforeEach(angular.mock.module('test.commons.ui.modal (html-body)'));

  beforeEach(inject(($compile: ng.ICompileService,
                     $rootScope: ng.IRootScopeService) => {
    spyOk = jasmine.createSpy('ok');
    $compile('<test-component></test-component>')($rootScope.$new());
  }));

  it('should append `modalHtml` text parts', () => {
    const bodyHtml = document.body.innerHTML;
    expect(bodyHtml).toContain('MODAL TITLE');
    expect(bodyHtml).toContain('MODAL CONTENT');
    expect(bodyHtml).toContain('OK');
  });

  it('should bind component events', () => {
    const button = getButton();
    button.click();
    expect(spyOk).toHaveBeenCalled();
  });

  it('should update context component', () => {
    const button = getButton();
    button.click();
    expect(document.body.innerHTML).toContain('OK TITLE');
  });
}

function getButton() {
  const button = document.getElementById('modalButton');
  if (button) return button as HTMLButtonElement;
  throw new TypeError('`modalButton` not found');
}
