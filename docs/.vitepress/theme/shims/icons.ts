import { addCollection } from "@iconify/vue";
import heroicons from "@iconify-json/heroicons/icons.json";
import lucide from "@iconify-json/lucide/icons.json";
import remixicon from "@iconify-json/ri/icons.json";
import simpleIcons from "@iconify-json/simple-icons/icons.json";

addCollection(heroicons);
addCollection(lucide);
addCollection(remixicon);
addCollection(simpleIcons);

export const COLLECTION_PREFIXES = [
  "simple-icons",
  "heroicons",
  "lucide",
  "remixicon",
  "ri",
];
