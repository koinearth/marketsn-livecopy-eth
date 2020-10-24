/* eslint-disable linebreak-style */
module.exports = {
  apps: [
    {
      name: "marketsn-webapp-service",
      instances: 1,
      min_uptime: "5m",
      max_restarts: 5,
      restart_delay: 3000,
      exec_mode: "cluster",
      script: "index.js",
      autorestart: true,
      watch: false,
      log: "/var/log/pm2.log",
      watch_options: {
        // usePolling: true,
      },
    },
  ],
};
