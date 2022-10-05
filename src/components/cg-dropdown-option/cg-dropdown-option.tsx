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
    this.selected = event.target['checked'];
    console.log(this.isSelected);
    this.cgDropdownOptionChanged.emit({
      optionId: this.optionId,
      isSelected: this.isSelected,
      isHidden: this.isHidden,
      el: this.el
    });
  }

  clickHandler = () => {
    this.selected = !this.selected;
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
            {this.hasCheckbox ? <input type='checkbox' value={this.value} onChange={this.changeHandler}/> : null}
            <span>{this.value}</span>
          </label>
        </li>
      </Host>
    );
  }

}
