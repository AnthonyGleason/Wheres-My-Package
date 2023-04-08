let getPackageQuery= function(packageName){
  let querys = [
    {
      name: 'debian', // debian , api docs: https://sources.debian.org/doc/api/
      url: `https://sources.debian.org/api/search/${packageName}/`
    },
    {
      name: 'arch', // arch, api docs: https://wiki.archlinux.org/title/Official_repositories_web_interface
      url: `https://archlinux.org/packages/search/json/?q=${packageName}`
    },
  ];
  return querys;
};

module.exports = {getPackageQuery};