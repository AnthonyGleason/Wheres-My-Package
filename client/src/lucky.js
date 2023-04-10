const lucky = [  
  "linux",  "systemd",  "gcc",  "gcc-libs",
  "base",  "coreutils",  "python",  "bash",  "rust",  "util-linux",
  "openssl"
];
let getLucky = function(){
  return lucky[(Math.floor(Math.random()*lucky.length))];
};
module.exports = {getLucky}