/** node server config module */
module.exports = {
  // environment
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.YGH_ADMIN_PORT ||
    process.env.PORT ||
    3000,

  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    '0.0.0.0',
};
