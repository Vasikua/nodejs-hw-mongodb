import path from 'node:path';

export const typeList = ['work', 'home', 'personal'];
export const sortOrderList = ["asc", "desc"];
export const fieldList = [
    "_id",
    "name",
    "phoneNumber",
    "email",
    "isFavourite",
    "contactType",
    "createdAt",
    "updatedAt",
];

export const ACCESS_TOKEN_LIFETIME =  15 * 60 * 1000;
export const REFRESH_TOKEN_LIFETIME = 2 * 24 * 3600 * 1000; 

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');