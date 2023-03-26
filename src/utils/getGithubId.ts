export const getGithubId = (avatar: string) => {
    const parts = avatar.split('/');
    const idIndex = parts.indexOf('u') + 1;
    if (idIndex > 0 && idIndex < parts.length) {
      return parseInt(parts[idIndex]);    }
    throw new Error('Invalid avatar URL');
  };
  