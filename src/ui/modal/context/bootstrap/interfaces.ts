/**
 * Programatic API for Bootstrap [Modal](
 * https://v4-alpha.getbootstrap.com
 *   /getting-started/javascript/#programmatic-api)
 */
export interface InternalModal {
  new(element: JQuery, config: Config): InternalModal;
  dispose(): void;
  handleUpdate(): void;
  hide(event?: Event): void;
  show(_relatedTarget?: Element): void;
  toogle(_relatedTarget?: Element): void;
  VERSION: string;
  Default: Config;
}

export interface Config {
  backdrop: boolean | string;
  keyboard: boolean;
  focus: boolean;
  show: boolean;
}
