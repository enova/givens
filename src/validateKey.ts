interface parsedKey {
  valid: boolean;
  errorMessage?: string;
}

export default function validateKey(key: string): parsedKey {
  if (typeof key !== 'string') {
    return {
      valid: false,
      errorMessage: `"${key}" is not a valid key; must be a string`,
    };
  }

  if (key === '') {
    return {
      valid: false,
      errorMessage: 'key must not be empty',
    };
  }

  if (key.startsWith('__') || key.endsWith('__')) {
    return {
      valid: false,
      errorMessage: `"${key}" is not a valid key; cannot start or end with "__"`,
    };
  }

  return {
    valid: true,
  };
};
