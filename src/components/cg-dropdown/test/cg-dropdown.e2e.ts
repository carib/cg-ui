import { newE2EPage } from '@stencil/core/testing';

describe('cg-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cg-dropdown></cg-dropdown>');

    const element = await page.find('cg-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
