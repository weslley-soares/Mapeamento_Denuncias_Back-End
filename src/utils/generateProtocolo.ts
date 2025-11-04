export const generateProtocolo = () => {
  return "PROTO-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};