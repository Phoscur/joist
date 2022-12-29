import { shadow, css, html } from '@joist/shadow';

import { Todo } from './services/todo.service.js';

export const styles = css`
  :host {
    align-items: center;
    display: flex;
    padding: 1rem;
  }

  #name {
    flex-grow: 1;
  }

  :host([status='complete']) #name {
    text-decoration: line-through;
    opacity: 0.5;
  }

  button {
    border: none;
    color: cornflowerblue;
    cursor: pointer;
    font-size: 1rem;
    background: none;
    margin-left: 0.5rem;
  }

  button#remove {
    color: darkred;
  }
`;

export const template = html`
  <div id="name">
    <slot></slot>
  </div>

  <button id="remove">remove</button>

  <button id="complete">complete</button>
`;

export class TodoCardElement extends HTMLElement {
  static observedAttributes = ['status'];

  #shadow: ShadowRoot;
  #completeBtn: HTMLButtonElement;

  constructor() {
    super();

    this.#shadow = shadow(this, { styles, template });
    this.#completeBtn = this.#shadow.querySelector<HTMLButtonElement>('#complete')!;

    this.#shadow.addEventListener('click', (e) => {
      if (e.target instanceof HTMLButtonElement) {
        this.dispatchEvent(new Event(e.target.id, { bubbles: true }));
      }
    });
  }

  attributeChangedCallback() {
    const status = this.getAttribute('status');

    const isActive = status === 'active';

    this.#completeBtn.innerHTML = isActive ? 'complete' : 'active';
  }
}

export function createTodoCard(todo: Todo) {
  const card = new TodoCardElement();
  card.id = todo.id;
  card.innerHTML = todo.name;

  card.setAttribute('status', todo.status);

  return card;
}
