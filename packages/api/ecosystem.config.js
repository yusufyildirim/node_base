module.exports = {
  apps: [
    {
      name: 'API',
      script: 'server.js',
      interpreter: 'babel-node',
      watch: true,
      ignore_watch : ['node_modules'],
      env: {
        NODE_ENV: 'development',
        node_args: [
          '--inspect=0.0.0.0:9229',
        ],
      },
    },
  ],
};
