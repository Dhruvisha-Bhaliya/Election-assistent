import '@testing-library/jest-dom';

// Mock requestSubmit which is missing in JSDOM
if (typeof HTMLFormElement !== 'undefined') {
  HTMLFormElement.prototype.requestSubmit = function () {
    if (this.submit) {
      this.submit();
    } else {
      this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  };
}

// Mock PointerEvent
if (typeof window !== 'undefined') {
  window.PointerEvent = class PointerEvent extends Event {};
}
