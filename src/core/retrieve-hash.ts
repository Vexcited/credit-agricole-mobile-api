export const retrieveHashFromAccessToken = (accessToken: string): string => {
  const parts = accessToken.split(".");
  return JSON.parse(atob(parts[1])).hashId;
};
