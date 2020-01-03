const parseKey = (key) => {
  if (typeof key !== 'string') {
    return {
      valid: false,
      message: `"${key}" is not a valid key; must be a string`,
    };
  }

  if (key === '') {
    return {
      valid: false,
      message: 'key must not be empty',
    };
  }

  if (key.startsWith('__')) {
    return {
      valid: false,
      message: `"${key}" is not a valid key; cannot start with "__"`,
    };
  }

  if (key.endsWith('__')) {
    return {
      valid: false,
      message: `"${key}" is not a valid key; cannot end with "__"`,
    };
  }

  if (key.startsWith('!')) {
    if (key.length === 1) {
      return {
        valid: false,
        message: '"!" is not a valid key',
      };
    }
    return {
      valid: true,
      type: 'immediate',
      key: key.slice(1),
    };
  }

  if (key.startsWith('@')) {
    if (key.length === 1) {
      return {
        valid: false,
        message: '"@" is not a valid key',
      };
    }
    return {
      valid: true,
      type: 'no-cache',
      key: key.slice(1),
    };
  }

  return {
    valid: true,
    type: 'regular',
    key,
  };
};

module.exports = parseKey;
