const rights = {
  ADMIN: true,
  // MEMBER: ['field'],
  // ANYONE: ['field'],
  // GUEST: ['field'],
}

const rightsAfter = {
  ...rights,
  MEMBER: ['field'],
  // ANYONE: ['field'],
  // GUEST: ['field'],
}

const rightsEnd = {
  ...rights,
  // MEMBER: ['field'],
  // ANYONE: ['field'],
  // GUEST: ['field'],
}

const subitoAppUpdate = ({ doc }) => {
  const { status } = doc;
  if (status < 200) {
    return rights;
  } else if(status < 500) {
    return rightsAfter;
  } else {
    return rightsEnd;
  }
}

export default subitoAppUpdate;
