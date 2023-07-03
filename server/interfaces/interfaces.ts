export interface Package{
  arch: string,
  pkgname:string,
  pkgdesc: string,
  url: string,
  archURL: string,
  licenses: string,
  maintainers: string,
  compressed_size: string,
  installed_size: string,
  last_update: Date,
  packager: string[],
  votes: number,
  pkgver: string
};