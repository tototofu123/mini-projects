/**
 * Asset path helpers
 *
 * Files in `public/` are copied to the site root at build time, so they are
 * served from the deploy base rather than from the repo root. Referencing
 * them as `/images/foo.png` breaks on a project Pages site like
 * tototofu123.github.io/new-personal-profolio/, where the base is the
 * /new-personal-profolio/ prefix. Every public asset reference must go
 * through `assetUrl` so it resolves under the same base Vite built with.
 */

export const assetUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}