import { Tree } from "./classes.js";

const exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = new Tree(exampleArray);

console.log(BST.array);
BST.root = BST.buildTree();
console.log(BST.root);
BST.prettyPrint(BST.root);
