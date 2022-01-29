/**
 * Fix path for images
 * so they render even when deployed
 */

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export { prefix };

export const prefixPath = path => {
  return `${prefix}${path}`;
}

export const prefixImgPath = path => {
  return `${prefix}/public${path}`
}