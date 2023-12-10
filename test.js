const word = "exalk,,bkllrrmple.jpg"; // le mot à vérifier

const imageExtensionRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

if (imageExtensionRegex.test(word)) {
  console.log("Le mot est une extension d'image.");
} else {
  console.log("Le mot n'est pas une extension d'image.");
}