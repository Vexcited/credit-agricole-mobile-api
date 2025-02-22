const decodeJWT = (token: string): any => {
  const parts = token.split(".");
  return JSON.parse(atob(parts[1]));
};

export const retrieveHashFromAccessToken = (accessToken: string): string => {
  const { hashId } = decodeJWT(accessToken);
  return hashId;
};
