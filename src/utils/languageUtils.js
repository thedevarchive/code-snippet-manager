// function for handling the type of language to be read by syntax highlighter
export const handleLanguage = (l) => {
    if (l) {
      switch (l) {
        case "asp.net":
          return "aspnet";
        case "brainfck":
        case "brainf*ck":
        case "brainf**k":
        case "brainfvck":
        case "branflakes":
        case "brainfrick":
        case "brainfreak":
        case "brainoof":
        case "brainf":
        case "bf":
          return "brainfuck";
        case "c#":
          return "csharp";
        case "c++":
          return "cpp";
        case "f#":
          return "fsharp";
        case "express": 
        case "expressjs": 
        case "express.js": 
        case "knockout": 
        case "knockoutjs":
        case "knockout js": 
        case "knockout.js": 
        case "next": 
        case "next.js": 
        case "node": 
        case "node.js": 
        case "react":
        case "react native": 
          return "javascript";
        case "objective c":
          return "objectivec";
        case "angular": 
          return "typescript"; 
        default:
          return l;
      }
    }
    else return "javascript";
  }