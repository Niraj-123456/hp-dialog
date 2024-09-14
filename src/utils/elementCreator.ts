export function createElement(
  name: string,
  classes?: string,
  parent?: HTMLElement
) {
  let element = document.createElement(name);
  element.className += classes;
  if (parent) parent.appendChild(element);
  return element;
}
