import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class BoxManipulation extends Contract {
  spliceableBox = BoxKey<bytes>({ key: 'spliceableBox' });

  resizeableBox = BoxKey<bytes>({ key: 'resizeableBox' });

  bootstrap(): void {
    this.spliceableBox.value = 'This is some old content.';
    this.resizeableBox.value = 'This is my collection of dots ....................'; // 20 dots total
  }

  spliceBox(): string {
    this.spliceableBox.splice(len('This is some '), 3, 'new');
    return this.spliceableBox.value;
  }

  resizeBox(): string {
    this.resizeableBox.resize(len('This is my collection of dots ') + 10);
    return this.resizeableBox.value;
  }
}
