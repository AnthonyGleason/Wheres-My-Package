const lucky=['Python','Rust','Linux','C','Arch','Git'];

export default function getLuckyTerm(){
  return lucky[Math.floor(Math.random() * lucky.length)];
}