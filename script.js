import { Tree } from "./classes.js";

const exampleArray = [1, 7, 4, 23, 8, 9, 52, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = new Tree(exampleArray);

BST.root = BST.buildTree();
BST.insert(334);
BST.prettyPrint(BST.root);
