import { mergeSort, removeDuplicates } from "./arrayFuncs.js";

export class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

export class Tree {
    constructor(array, value = null) {
        this.array = mergeSort(removeDuplicates(array));
        this.root = new Node(value);
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

    insert(value, node = this.root) {
        if (node === null || node.value === value) {
            return new Node(value);
        }

        if (node.value > value) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    delete(value, node = this.root) {
        if (node.value == value) {
            console.log(node);
            return;
        }

        if (node.value > value) {
            this.delete(value, node.left);
        } else {
            this.delete(value, node.right);
        }
    }
}
