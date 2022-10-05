import { newSpecPage } from '@stencil/core/testing';
import { CgDropdown } from '../cg-dropdown';

describe('cg-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CgDropdown],
      html: `<cg-dropdown></cg-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <cg-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cg-dropdown>
    `);
  });
});
