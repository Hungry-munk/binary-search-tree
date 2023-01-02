import { Tree } from "./classes.js";

const exampleArray = [1, 7, 4, 23, 52, 9, 10, 4, 3, 8, 5, 7, 67, 6345, 324];
const tree = new Tree(exampleArray);

tree.root = tree.buildTree();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());
tree.insert(1232);
tree.insert(12324);
tree.insert(12325);
tree.insert(12326);
tree.insert(123266);
console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());
