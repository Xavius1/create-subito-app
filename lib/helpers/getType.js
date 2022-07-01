function getType(interface) {
  switch(interface) {
    case 'graphql':
      return 'api';
    case 'rabbitmq':
      return 'consumer';
    default:
      return interface;
  }
}

module.exports = getType;
