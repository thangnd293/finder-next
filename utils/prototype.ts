declare global {
  interface String {
    capitalizeFirstLetter(): string;
  }
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
