import { newSpecPage } from '@stencil/core/testing';
import { CgDropdownOption } from '../cg-dropdown-option';

describe('cg-dropdown-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CgDropdownOption],
      html: `<cg-dropdown-option></cg-dropdown-option>`,
    });
    expect(page.root).toEqualHtml(`
      <cg-dropdown-option>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cg-dropdown-option>
    `);
  });
});
