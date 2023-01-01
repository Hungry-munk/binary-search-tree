import { Tree } from "./classes.js";

const exampleArray = [1, 7, 4, 23, 52, 9, 10, 4, 3, 8, 5, 7, 67, 6345, 324];
const BST = new Tree(exampleArray);

BST.root = BST.buildTree();
BST.prettyPrint();
console.log(BST.preOrder(console.log));
