import { ModalService, Modal } from './modal.service';

angular.module('test.commons.ui.modal', [])
  .component('testComponent', {
    controller: class /*implements ng.IOnInit*/ {
      title: string;

      constructor(private modalService: ModalService,
                  private $scope: ng.IScope) {
        this.title = 'MODAL TITLE';
        const modal = this.modalService.new({
          template: `<div>{{ $ctrl.title }}</div>`,
          $scope: this.$scope,
        });
        modal.show();
      }
    },
    template: '<div></div>',
  })
  .service('modalService', ModalService)
;

describe('ModalService', () => {
  let modalService: ModalService;

  beforeEach(angular.mock.module('test.commons.ui.modal'));

  beforeEach(inject(($compile: ng.ICompileService,
                     $componentController: ng.IComponentControllerService,
                     $injector: ng.auto.IInjectorService,
                     $rootScope: ng.IRootScopeService) => {
    const $scope = $rootScope.$new();
    const controller = $componentController('testComponent', $scope);
    $compile('<test-component></test-component>')($scope);
    modalService = new ModalService($injector);
  }));

  it('should', () => {
    expect(document.body.innerHTML).toContain('MODAL TITLE');
  });

  //beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    //$provide.service('modalService', ModalService);
  //}));

  describe('when constructs a modal', () => {
    let modal: Modal;

    beforeEach(() => {
      modal = modalService.new({
        template: `
          <div class="modal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <button type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Modal body.</p>
                </div>
                <div class="modal-footer">
                  <button type="button"
                          class="btn btn-primary"
                          >
                    OK
                  </button>
                  <button type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        `,
        $scope: { $digest: () => {}, } as ng.IScope,
      });
    });

    it('should insert html template', () => {
      modal.show();
      expect(document.body.innerHTML).toContain('Modal title');
    });
  });
});
