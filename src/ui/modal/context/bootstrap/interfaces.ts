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
  backdrop: boolean;
  keyboard: boolean;
  focus: boolean;
  show: boolean;
}
