import { Overlay } from '../overlay';
import { ModalArgs } from './interfaces';

export interface Modal extends Overlay {
  show(): void;
}

export interface ModalBuilder {
  new: (options: ModalArgs) => Modal;
}
