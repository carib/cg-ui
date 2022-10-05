import { newE2EPage } from '@stencil/core/testing';

describe('cg-dropdown-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cg-dropdown-option></cg-dropdown-option>');

    const element = await page.find('cg-dropdown-option');
    expect(element).toHaveClass('hydrated');
  });
});
