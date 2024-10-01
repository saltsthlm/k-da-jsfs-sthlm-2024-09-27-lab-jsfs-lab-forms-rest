export interface Quote {
  text: string;
  user: {
    id: string;
    name: string;
  };
}

export const QUOTES_LIST: Quote[] = [
  {
    text: "Chuck Norris doesn't drink coffee. Coffee drinks Chuck Norris to wake up.",
    user: {
      id: "1",
      name: "Bugs Bunny",
    },
  },
  {
    text: "When Chuck Norris meditates, even the universe finds its center.",
    user: {
      id: "2",
      name: "Yoda",
    },
  },
  {
    text: "Time waits for no man. Except for Chuck Norris.",
    user: {
      id: "3",
      name: "Doc Brown",
    },
  },
  {
    text: "Chuck Norris doesn't use debuggers. He just stares at the code until it confesses.",
    user: {
      id: "4",
      name: "Sherlock Holmes",
    },
  },
  {
    text: "If you spell Chuck Norris in Scrabble, you win. Forever.",
    user: {
      id: "5",
      name: "Waldo",
    },
  },
  {
    text: "When Bruce Banner gets mad, he turns into the Hulk. When the Hulk gets mad, he turns into Chuck Norris.",
    user: {
      id: "6",
      name: "Homer Simpson",
    },
  },
  {
    text: "Chuck Norris once won a staring contest with the Sun.",
    user: {
      id: "7",
      name: "Mr. Bean",
    },
  },
  {
    text: "Chuck Norris can hear sign language.",
    user: {
      id: "8",
      name: "Darth Vader",
    },
  },
  {
    text: "When Chuck Norris enters a room, the Wi-Fi connects to him.",
    user: {
      id: "9",
      name: "Iron Man",
    },
  },
  {
    text: "Chuck Norris can clap with one hand.",
    user: {
      id: "10",
      name: "The Joker",
    },
  },
];
