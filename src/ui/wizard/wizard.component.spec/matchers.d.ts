declare namespace jasmine {
  interface Matchers<T> {
    toBeTheOnlyShownStepOn(expected: HTMLElement[]): boolean;
  }
}
