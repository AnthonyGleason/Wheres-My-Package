export interface Package{
  arch: string, //the type of cpu architecture of the package
  pkgname:string, //the package name
  pkgdesc: string, //the package description
  url: string, //the url to the author's personal page, for example: aur packages will usually link to github addresses
  archUrl: string, //the url to view the package on the official arch package browser
  repo: string, //the repository of a package
  licenses: string, //the license(s) the software is licensed under. (Comma seperated)
  maintainers: string, //the package maintainers (Comma seperated)
  compressed_size: string, // Example: "100MB", "25.2KB"
  installed_size: string,  //the total size after installation, see compressed_size property above for examples of package sizes
  last_update: string, //last time this package was updated
  flag_date: string, //the date the package was flagged out of date
  build_date: string, //the date the package was build by the packager
  packager: string[], //the package bundlers
  votes?: number, //aur only, users can upvote or downvote packages and it recieves an overall rating
  pkgver: string, //the version of the package bundled
  optdepends?: Package[], //official arch repos only. Optional package dependencies
  depends?: Package[], //official arch repos only. Required package dependencies
};