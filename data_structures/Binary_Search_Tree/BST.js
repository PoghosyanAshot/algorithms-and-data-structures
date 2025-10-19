const { Queue } = require("../Queue/queue.js");

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    #root;
    #size;

    constructor() {
        this.#root = null;
        this.#size = 0;
    }

    // insert & delete

    insert(value) {
        this.#root = this.#_insert(this.#root, value);
    }

    delete(value) {
        if (this.is_empty()) {
            return;
        }

        this.#root = this.#_delete(this.#root, value);
    }

    // size

    is_empty() {
        return this.#size === 0;
    }

    get_height() {
        return this.#_get_height(this.#root);
    }

    // min & max

    find_min() {
        return this.#_find_min(this.#root);
    }

    find_max() {
        return this.#_find_max(this.#root);
    }

    // traversal methods

    level_order() {
        if (this.is_empty()) {
            return [];
        }

        const result = [];
        const queue = new Queue(this.#size);
        queue.enqueue(this.#root);

        while (!queue.is_empty()) {
            const node = queue.dequeue();
            result.push(node.value);

            if (node.left) {
                queue.enqueue(node.left);
            }

            if (node.right) {
                queue.enqueue(node.right);
            }
        }

        return result;
    }

    // inorder left -> root -> right
    // inorder recursive

    inorder_rec() {
        const result = [];
        this.#_inorder(this.#root, result);

        return result;
    }

    // inorder iterative

    inorder_itr() {
        const result = [];
        const stack = [];
        let current = this.#root;

        while (current || stack.length) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            result.push(current.value);
            current = current.right;
        }

        return result;
    }

    // preorder root -> left -> right
    // preorder recursive

    preorder_rec() {
        const result = [];
        this.#_preorder(this.#root, result);
        return result;
    }

    //preorder iterative

    preorder_itr() {
        const result = [];
        const stack = [];
        let current = this.#root;

        while (current || stack.length) {
            while (current) {
                result.push(current.value);
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            current = current.right;
        }

        return result;
    }

    // postorder left -> right -> root
    // postorder recursive

    postorder_rec() {
        const result = [];
        this.#_postorder(this.#root, result);
        return result;
    }

    // postorder iterative
    postorder_itr() {
        if (this.is_empty()) {
            return [];
        }

        const stack1 = [];
        const stack2 = [];
        const result = [];

        stack1.push(this.#root);

        while (stack1.length) {
            const node = stack1.pop();
            stack2.push(node);

            if (node.left) {
                stack1.push(node.left);
            }

            if (node.right) {
                stack1.push(node.right);
            }
        }

        while (stack2.length) {
            const node = stack2.pop();
            result.push(node.value);
        }

        return result;
    }

    // helper functions

    #_insert(node, value) {
        if (!node) {
            ++this.#size;
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this.#_insert(node.left, value);
        }

        if (value > node.value) {
            node.right = this.#_insert(node.right, value);
        }

        return node;
    }

    #_inorder(node, result) {
        if (!node) {
            return;
        }
        this.#_inorder(node.left, result);
        result.push(node.value);
        this.#_inorder(node.right, result);
    }

    #_preorder(node, result) {
        if (!node) {
            return;
        }

        result.push(node.value);
        this.#_preorder(node.left, result);
        this.#_preorder(node.right, result);
    }

    #_postorder(node, result) {
        if (!node) {
            return;
        }

        this.#_postorder(node.left, result);
        this.#_postorder(node.right, result);
        result.push(node.value);
    }

    #_find_min(node) {
        if (!node) {
            return;
        }

        if (!node.left) {
            return node.value;
        }

        return this.#_find_min(node.left);
    }

    #_find_max(node) {
        if (!node) {
            return;
        }

        if (!node.right) {
            return node.value;
        }

        return this.#_find_max(node.right);
    }

    #_delete(node, value) {
        if (!node) {
            return node;
        }

        if (value < node.value) {
            node.left = this.#_delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.#_delete(node.right, value);
        } else {
            if (!node.right) {
                return node.left;
            } else if (!node.left) {
                return node.right;
            } else {
                const accessor = this.#accessor(node);
                node.value = accessor;
                node.right = this.#_delete(node.right, accessor);
            }
        }

        return node;
    }

    #accessor(node) {
        return this.#_find_min(node.right);
    }

    #_get_height(node) {
        if (!node) return 0;

        return Math.max(this.#_get_height(node.left), this.#_get_height(node.right)) + 1;
    }
}

const bst = new BST();

// Insert values
bst.insert(10);
bst.insert(8);
bst.insert(12);
bst.insert(6);
bst.insert(9);
bst.insert(11);
bst.insert(15);
bst.insert(20);
bst.insert(1);
bst.insert(7);

// Traversals
console.log("Level Order:", bst.level_order());
console.log("Inorder:", bst.inorder_rec());
console.log("Preorder:", bst.preorder_itr());
console.log("Postorder:", bst.postorder_rec());

// Properties
console.log("Height:", bst.get_height());
console.log("Min:", bst.find_min());
console.log("Max:", bst.find_max());

// Deletion
bst.delete(12);
console.log("After deleting 12:", bst.level_order());
