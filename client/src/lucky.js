const lucky = [  
  "linux",  "linux-headers",  "systemd",  "gcc",  "gcc-libs",
  "base",  "coreutils",  "glibc",  "bash",  "binutils",  "util-linux",
  "openssl",  "libxcrypt",  "perl",  "zlib",  "findutils",  "file",
  "sed",  "grep",  "pcre",  "gawk",  "util-linux-libs",  "libtirpc",
  "iproute2",  "libcap",  "acl",  "attr",  "libgpg-error",  "libassuan",
  "pinentry",  "sqlite",  "ncurses",  "gdbm",  "mpfr",  "mpc",
  "libmpc",  "gcc-fortran",  "python",  "gdb",  "perl-xml-parser",
  "python-setuptools",  "libffi",  "readline",  "bzip2",  "xz",
  "gmp",  "ncurses5-compat-libs",  "perl-error"
];
let getLucky = function(){
  return lucky[(Math.floor(Math.random()*50))];
};
module.exports = {getLucky}