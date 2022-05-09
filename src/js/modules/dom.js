export default function createElement(tag, parent, ...classes) {
  const element = document.createElement(tag);

  if (classes.length) {
    element.classList.add(...classes);
  }

  parent.append(element);

  return element;
}
