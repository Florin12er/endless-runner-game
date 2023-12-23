/** @type {HTMLCanvasElement} */
export default class input {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "s" ||
          e.key === "w" ||
          e.key === "a" ||
          e.key === "d" ||
          e.key === " " ||
          e.key === "Enter" ||
          e.key === "Control") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "s" ||
        e.key === "w" ||
        e.key === "a" ||
        e.key === "d" ||
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "Control"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
