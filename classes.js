import { parseAsync } from "@babel/core";
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
        node.right = this.buildTree(array.slice(mid + 1, array.length));

        return node;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }

    insert(value, node = this.root) {
        if (!node || node.value === value) {
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
            if ((!node.left && !node.right) || !node) {
                return null;
            } else if (node.left && node.right) {
                let pointer = node.right;
                while (pointer.left) pointer = pointer.left;
                node.value = pointer.value;
                node.right = this.delete(node.value, node.right);
            }

            return node.left ? node.left : node.right;
        }

        if (node.value > value) {
            node.left = this.delete(value, node.left);
        } else {
            node.right = this.delete(value, node.right);
        }
        return node;
    }

    find(value, node = this.root) {
        if (node.value == value) return node;

        if (node.value > value) {
            if (node.left) return this.find(value, node.left);
        } else {
            if (node.right) return this.find(value, node.right);
        }

        return null;
    }

    levelOrder(callBackFn) {
        //need root element
        if (!this.root) return [];
        //  queue for storing discovered nodes
        const queue = [this.root];
        const values = [];
        while (queue.length) {
            const currentNode = queue.shift();
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            callBackFn
                ? callBackFn(currentNode)
                : values.push(currentNode.value);
        }

        if (!callBackFn) return values;
    }

    preOrder(callBackFn, node = this.root) {
        if (!node) return [];
        let values = [];

        callBackFn ? callBackFn(node.value) : values.push(node.value);
        values = values.concat(this.preOrder(callBackFn, node.left));
        values = values.concat(this.preOrder(callBackFn, node.right));

        if (!values.includes(undefined)) return values;
    }

    levelOrder(callBackFn, node = this.root) {
        if (!node) return [];
        let values = [];

        values = values.concat(this.levelOrder(callBackFn, node.left));
        callBackFn ? callBackFn(node.value) : values.push(node.value);
        values = values.concat(this.levelOrder(callBackFn, node.right));

        if (!values.includes(undefined)) return values;
    }

    postOrder(callBackFn, node = this.root) {
        if (!node) return [];
        let values = [];

        values = values.concat(this.postOrder(callBackFn, node.left));
        values = values.concat(this.postOrder(callBackFn, node.right));
        callBackFn ? callBackFn(node.value) : values.push(node.value);

        if (!values.includes(undefined)) return values;
    }

    height(node = this.root) {
        if (!node) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(searchedNode, recursiveNode = this.root, level = 0) {
        if (searchedNode === recursiveNode) return level;
        if (!recursiveNode) return;

        if (searchedNode.value < recursiveNode.value) {
            return this.depth(searchedNode, recursiveNode.left, level + 1);
        } else {
            return this.depth(searchedNode, recursiveNode.right, level + 1);
        }
    }

    isBalanced() {
        return (function utilDfs(node) {
            if (!node) return [true, 0];
            const [left, right] = [utilDfs(node.left), utilDfs(node.right)];
            const balanced =
                Math.abs(left[1] - right[1]) <= 1 && left[0] && right[0];

            return [balanced, 1 + Math.max(left[1], right[1])];
        })(this.root)[0];
    }

    reBalance() {
        // could have used an dfs method to get array of values
        this.root = this.buildTree(mergeSort(this.preOrder()));
    }
}
