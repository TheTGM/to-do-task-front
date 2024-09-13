export const decodeJwtPayload = (token: string): User => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("El token no tiene el formato correcto.");
  }
  const payload = parts[1];
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
};
