import { mergeSort, removeDuplicates } from "./arrayFuncs.js";

export class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export class Tree {
    constructor(array) {
        this.array = mergeSort(removeDuplicates(array));
        this.root = null;
    }

    buildTree(Currentarray = this.array) {
        const array = [...Currentarray];
        if (array.length == 0) return null;

        const mid = Math.floor(array.length / 2);
        const node = new Node(array[mid]);

        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1, array.length - 1));

        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}
