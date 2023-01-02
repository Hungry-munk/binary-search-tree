import { Tree } from "./classes.js";

const exampleArray = [1, 7, 4, 23, 52, 9, 10, 4, 3, 8, 5, 7, 67, 6345, 324];
const tree = new Tree(exampleArray);

tree.root = tree.buildTree();
tree.prettyPrint();
const testNode = tree.find(8);
console.log(testNode);
console.log(tree.depth(234));
