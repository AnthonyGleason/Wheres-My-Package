/*
  This functions like google's feeling lucky button that will search a random term.
*/
export default function getLuckyTerm():string{
  const luckyTerms:string[]=['python','rust','linux','pipewire','i3-wm','pulseaudio','xorg-server','node','git',];
  //get random index of luckyTerms arr
  const index:number = Math.floor(Math.random() * luckyTerms.length)
  return luckyTerms[index];
}