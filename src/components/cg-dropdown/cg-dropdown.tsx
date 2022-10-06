import {Component, Host, h, Element, Prop, State, Watch, Listen} from '@stencil/core';

@Component({
  tag: 'cg-dropdown',
  styleUrl: 'cg-dropdown.css',
  shadow: true,
})
export class CgDropdown {
  selectedValues: Map<string, string> = new Map();

  @Element() el: HTMLCgDropdownElement;

  @State() selectedValuesToRender: string;

  @State() hiddenItemIds: string[] = [];

  @State() itemRefs: {[key: string]: ItemRef} = {};

  @State() _multiple: boolean = false;

  @Prop() searchable: boolean = true;

  @Prop({reflect: true, attribute: 'multiple'}) multiple = false;

  @Watch('multiple')
  multipleChanged(newValue: boolean) {
    this._multiple = newValue;
  }

  componentWillLoad() {
    this._multiple = this.multiple;
    this.syncItemRefs();
  }

  componentWillRender() {
    this.syncItemRefs();
  }

  @Listen('cgDropdownOptionChanged')
  dropdownOptionChangedHandler(event: CustomEvent) {
    const updatedItem = {...this.itemRefs[event.detail.optionId], ...event.detail};
    this.syncItemRef(updatedItem.el);
    this.updateSelectedValues(updatedItem);
    this.updateHiddenValues(updatedItem);
  }

  updateSelectedValues({id, value, isSelected}) {
    if (this.selectedValues.has(id) && !isSelected) this.selectedValues.delete(id);
    if (!this.selectedValues.has(id) && isSelected) this.selectedValues.set(id, value);
    if (!this._multiple) this.forceSingleSelection(id);
    this.selectedValuesToRender = Array.from(this.selectedValues.values()).join(', ');
  }

  updateHiddenValues({id, isHidden}) {
    if (this.itemRefs.hasOwnProperty(id)) this.itemRefs[id].isHidden = isHidden;
    if (Object.values(this.itemRefs).filter(item => item.isHidden).length !== this.hiddenItemIds.length) {
      this.hiddenItemIds = Object.values(this.itemRefs).filter(item => item.isHidden).map(item => item.id);
    }
  }

  forceSingleSelection(id) {
    if (this.selectedValues.size > 1) {
      this.selectedValues.forEach((_, key) => {
        if (key !== id) {
          this.itemRefs[key].el.selected = false;
          this.selectedValues.delete(key);
        }
      });
    }
  }

  syncItemRefs = () => {
    const children = Array.from(this.el.children);
    if (children.length > 0) children.forEach((child: HTMLCgDropdownOptionElement) => {
      this.syncItemRef(child);
      child.hasCheckbox = this._multiple;
    });
  }

  syncItemRef = (item: HTMLCgDropdownOptionElement) => {
    const updatedRef: ItemRef = {
      id: item.optionId || item.value,
      el: item,
      value: item.value,
      isSelected: item.selected,
      isHidden: item.hidden,
    };
    if (!this.itemRefs.hasOwnProperty(updatedRef.id)) {
      this.itemRefs[updatedRef.id] = updatedRef;
    } else {
      this.itemRefs[updatedRef.id] = {...this.itemRefs[updatedRef.id], ...updatedRef};
    }
  }

  inputHandler = (event: Event) => {
    const filter = event.target['value'];
    Object.values(this.itemRefs).forEach(item => {
      item.el.hidden = !item.value.toLowerCase().includes(filter.toLowerCase());
    });
  }

  render() {
    return (
      <Host>
        <details>
          <summary>
            <div class={this._multiple ? 'multiple' : 'single'}>
              {this.selectedValues.size > 0 ? this.selectedValuesToRender : 'Select'}
            </div>
          </summary>
          <ul>
            {this.searchable ? <input type='text' placeholder='Filter options...' onInput={this.inputHandler}/> : null}
            <slot onSlotchange={this.syncItemRefs}></slot>
          </ul>
        </details>
      </Host>
    );
  }
}
