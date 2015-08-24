module.exports = {
  // ip address and port
  'ipAddress': process.env.OPENSHIFT_NODEJS_IP,
  'port': process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3080,
};
