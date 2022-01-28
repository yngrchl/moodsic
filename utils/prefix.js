/**
 * Fix path for images
 * so they render even when deployed
 */

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export { prefix };