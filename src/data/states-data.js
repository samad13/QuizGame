import { Droplet, Zap } from 'lucide-vue-next';
import { SteamIcon, IceIcon } from '../components/StateOfMatter/icons';

// Information about each state of matter
export const stateInfo = {
  steam: {
    name: "Steam",
    iconComponent: SteamIcon,
    color: "bg-[#40BCD8]",
    description: "A gas expands to fill any container. Its particles move freely and spread apart."
  },
  water: {
    name: "Water",
    iconComponent: Droplet,
    color: "bg-[#B96AD9]",
    description: "A liquid takes the shape of its container but keeps its volume. Its particles are close together."
  },
  ice: {
    name: "Ice",
    iconComponent: IceIcon,
    color: "bg-[#FFA630]",
    description: "Fixed shape & volume. Its particles vibrate but don't move freely."
  },
  lightning: {
    name: "Lightning",
    iconComponent: Zap,
    color: "bg-[#2D8EFF]",
    description: "Plasma is an ionized gas with unique electrical properties and high energy."
  }
};

// Question pages with options
export const questionPages = [
  {
    question: "Which state takes the shape of its container?",
    correctAnswer: "Liquid",
    options: [
      { label: "Solid", value: "Solid", color: "bg-[#FFA630]", iconComponent: IceIcon },
      { label: "Liquid", value: "Liquid", color: "bg-[#B96AD9]", iconComponent: Droplet },
      { label: "Gas", value: "Gas", color: "bg-[#40BCD8]", iconComponent: SteamIcon },
      { label: "Plasma", value: "Plasma", color: "bg-[#2D8EFF]", iconComponent: Zap }
    ]
  },
  {
    question: "Which state has particles that move freely?",
    correctAnswer: "Gas",
    options: [
      { label: "Solid", value: "Solid", color: "bg-[#FFA630]", iconComponent: IceIcon },
      { label: "Liquid", value: "Liquid", color: "bg-[#B96AD9]", iconComponent: Droplet },
      { label: "Gas", value: "Gas", color: "bg-[#40BCD8]", iconComponent: SteamIcon },
      { label: "Plasma", value: "Plasma", color: "bg-[#2D8EFF]", iconComponent: Zap }
    ]
  },
  {
    question: "Which state has fixed shape and volume?",
    correctAnswer: "Solid",
    options: [
      { label: "Solid", value: "Solid", color: "bg-[#FFA630]", iconComponent: IceIcon },
      { label: "Liquid", value: "Liquid", color: "bg-[#B96AD9]", iconComponent: Droplet },
      { label: "Gas", value: "Gas", color: "bg-[#40BCD8]", iconComponent: SteamIcon },
      { label: "Plasma", value: "Plasma", color: "bg-[#2D8EFF]", iconComponent: Zap }
    ]
  }
];