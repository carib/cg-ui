import { Config, Env } from '@stencil/core';

const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;
const apiEnv: string = dev ? 'dev' : 'prod';

export const config: Config = {
  namespace: 'cg-ui',
  sourceMap: apiEnv === 'dev',
  env: {
    apiEnv: apiEnv,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
