module.exports = {
  apps: [
    {
      name: 'ireachflow-backend',
      cwd: 'backend',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'ireachflow-frontend',
      cwd: 'frontend',
      script: 'node_modules/.bin/serve',
      args: '-s dist/ireachflow -l 4200',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
