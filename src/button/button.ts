export type ButtonProps = {
  text: string;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  style?: Partial<CSSStyleDeclaration>;
};
export class Button {
  private button: HTMLButtonElement;
  constructor(options: ButtonProps) {
    this.button = document.createElement("button");
    this._createButton(options);
  }

  private _createButton(props: ButtonProps) {
    const { text, className, onClick, style } = props;
    this.button.textContent = text;
    if (className) this.button.className = className;
    if (onClick) this.button.addEventListener("click", onClick);
    if (style) Object.assign(this.button.style, style);
    document.body.appendChild(this.button);
  }
}
