export interface Package{
  arch: string,
  pkgname:string,
  pkgdesc: string,
  url: string,
  archUrl: string,
  repo: string,
  licenses: string,
  maintainers: string,
  compressed_size: string,
  installed_size: string,
  last_update: string,
  flag_date: string,
  build_date: string,
  packager: string[],
  votes: number,
  pkgver: string
};