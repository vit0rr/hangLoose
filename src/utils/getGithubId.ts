export const getGithubId = (avatar: string) => {
    const parts = avatar.split('/');
    const idIndex = parts.indexOf('u') + 1;
    if (idIndex > 0 && idIndex < parts.length) {
      const userId = parseInt(parts[idIndex]);
      return (userId - 1).toString();
    }
    throw new Error('Invalid avatar URL');
  };
  