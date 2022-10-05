import {Component, Element, Host, h, Prop, State, Watch, EventEmitter, Event} from '@stencil/core';

@Component({
  tag: 'cg-dropdown-option',
  styleUrl: 'cg-dropdown-option.css',
  shadow: true,
})
export class CgDropdownOption {
  @Element() el: HTMLCgDropdownOptionElement;

  @State() isSelected: boolean = false;
  @State() isHidden: boolean = false;

  @Prop({mutable: true, reflect: true}) optionId: string;

  @Prop({reflect: true, mutable: true}) selected: boolean = false;

  @Prop() hasCheckbox: boolean = false;

  @Watch('selected')
  selectedChanged(newValue: boolean) {
    this.isSelected = newValue;
  }

  @Prop({mutable: true, reflect: true}) hidden: boolean = false;

  @Watch('hidden')
  hiddenChanged(newValue: boolean) {
    this.isHidden = newValue;
  }

  @Prop() value: string;

  @Event() cgDropdownOptionChanged: EventEmitter<DropdownOptionChangedEventDetail>;

  componentWillLoad() {
    this.optionId = this.optionId || this.value;
  }

  changeHandler = (event: Event) => {
    event.stopPropagation();
    this.selected = event.target['checked'];
    this.emitChangeEvent();
  }

  clickHandler = (event: Event) => {
    event.preventDefault();
    if (!this.hasCheckbox && !this.isSelected) {
      this.selected = !this.selected;
      this.emitChangeEvent();
    }
  }

  emitChangeEvent() {
    this.cgDropdownOptionChanged.emit({
      optionId: this.optionId,
      isSelected: this.isSelected,
      isHidden: this.isHidden,
      el: this.el
    });
  }

  render() {
    return (
      <Host>
        <li>
          <label class={{
            'has-checkbox': this.hasCheckbox,
          }} onClick={this.hasCheckbox ? null : this.clickHandler}>
            <input class={{
              'has-checkbox': this.hasCheckbox,
            }} type='checkbox' value={this.value} onChange={this.changeHandler}/>
            <span>{this.value}</span>
          </label>
        </li>
      </Host>
    );
  }

}
