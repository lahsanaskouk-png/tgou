export const phoneToEmail = (phone: string) =>
  `${phone.replace(/\D/g, '')}@brixa.com`
