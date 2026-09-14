export class StateMachine {
  constructor(states, initialState) {
    this.states = states;
    this.current = initialState;
    this.states[this.current].onEnter?.();
  }

  changeState(name) {
    this.states[this.current].onExit?.();
    this.current = name;
    this.states[this.current].onEnter?.();
  }

  update(dt) {
    this.states[this.current].onUpdate?.(dt);
  }

  render(ctx) {
    this.states[this.current].onRender?.(ctx);
  }

  handleClick(x, y) {
    this.states[this.current].onClick?.(x, y);
  }
}
