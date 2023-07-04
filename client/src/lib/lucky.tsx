const lucky=['python','rust','linux','pipewire','i3-wm','pulseaudio','xorg-server','node','git',];

export default function getLuckyTerm(){
  return lucky[Math.floor(Math.random() * lucky.length)];
}