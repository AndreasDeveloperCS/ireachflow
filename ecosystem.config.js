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
  ],
};
