const lucky=['Python','Rust','Linux','C','Arch','Git'];

export default function getLucky(){
  return lucky[Math.floor(Math.random() * lucky.length)];
}