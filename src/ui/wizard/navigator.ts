export interface Navigator {
  items: any[];  // TODO: remove
  add(item: any): void;
  back(): void;
  next(): void;
  onChange(callback: Function): void;
}

export interface Navegable {
  label: string;
  select(): void;
  selected: boolean;
  unselect(): void;
}

export type integer = number;

export class BoundaryNavigator implements Navigator {

  callback: Function;
  index: integer;
  items: any[];

  constructor() {
    this.index = 0;
    this.items = [];
  }

  add(item: any) {
    if (0 === this.items.length) {
      item.select();
    }
    this.items.push(item);
  }

  back() {
    if (0 < this.index) {
      this.index--;
      this.changeBy(this.index);
    }
  }

  next() {
    if (this.items.length > this.index + 1) {
      this.index++;
      this.changeBy(this.index);
    }
  }

  onChange(callback: Function) {
    this.callback = callback;
  }

  private change(item: any) {
    this.items.forEach(item => item.unselect());  // TODO: visitor
    this.callback(item);
  }

  private changeBy(index: integer) {
    this.change(this.items[index]);
  }
}

export class CircularNavigator { }

export class NotImplementedNavigator implements Navigator {
  items: any[];
  add() { return notImplemented(); }
  back() { return notImplemented(); }
  next() { return notImplemented(); }
  onChange() { return notImplemented(); }
}

export function notImplemented(): never {
  throw new Error('Not implemented');
}
