const { Queue } = require("../Queue/queue.js");

class Node {
    value;
    left = null;
    right = null;
    height = 1;

    constructor(value = null) {
        this.value = value;
    }
}

class AVL {
    #root;
    #size = 0;

    constructor() {
        this.#root = null;
    }

    // public interface

    // insert, delete, search

    insert(value) {
        this.#root = this.#insert(this.#root, value);
    }

    delete(value) {
        this.#root = this.#delete(this.#root, value);
    }

    search(value) {
        return this.#search(this.#root, value);
    }

    // getter functions

    getHeight() {
        return this.#getHeight(this.#root);
    }

    getMin() {
        return this.#getMin(this.#root);
    }

    getMax() {
        return this.#getMax(this.#root);
    }

    // traversal bfs & dfs

    levelOrder() {
        if (!this.#root) return;

        const queue = new Queue(this.#size);
        const result = [];
        queue.enqueue(this.#root);

        while (!queue.is_empty()) {
            const node = queue.dequeue();
            result.push(node.value);

            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }

        return result;
    }

    // preorder recursive & iterative
    // root->left->right

    preorder_rec() {
        return this.#preorder_rec(this.#root, []);
    }

    preorder_itr() {
        const res = [];
        const stack = [];
        let current = this.#root;

        while (current || stack.length) {
            while (current) {
                res.push(current.value);
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            current = current.right;
        }

        return res;
    }

    // inorder recursive & iterative
    // left->root->right

    inorder_rec() {
        return this.#inorder_rec(this.#root, []);
    }

    inorder_itr() {
        const res = [];
        const stack = [];
        let current = this.#root;

        while (current || stack.length) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            res.push(current.value);
            current = current.right;
        }

        return res;
    }

    // postorder recursive & iterative
    // left->right->root

    postorder_rec() {
        return this.#postorder_rec(this.#root, []);
    }

    postorder_itr() {
        if (!this.#root) {
            return [];
        }

        const res = [];
        const stack1 = [];
        const stack2 = [];
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
            res.push(stack2.pop().value);
        }

        return res;
    }

    // private helpers

    #insert(node, value) {
        if (!node) {
            ++this.#size;
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this.#insert(node.left, value);
        } else if (value > node.value) {
            node.right = this.#insert(node.right, value);
        } else {
            return node;
        }

        node.height = this.#getHeight(node);
        node = this.#reBalance(node);

        return node;
    }

    #delete(node, value) {
        if (!node) {
            return node;
        }

        if (value < node.value) {
            node.left = this.#delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.#delete(node.right, value);
        } else {
            if (!node.right) {
                --this.#size;
                return node.left;
            } else if (!node.left) {
                --this.#size;
                return node.right;
            } else {
                const accessor = this.#getMin(node.right);
                node.value = accessor.value;
                node.right = this.#delete(node.right, accessor.value);
            }
        }

        node = this.#reBalance(node);
        return node;
    }

    #getHeight(node) {
        if (!node) return 0;

        return Math.max(this.#getHeight(node.left), this.#getHeight(node.right)) + 1;
    }

    #reBalance(node) {
        const bf = this.#balanceFactor(node);

        if (bf > 1) {
            if (this.#balanceFactor(node.left) >= 0) {
                return this.#rotateRight(node);
            } else {
                node.left = this.#rotateLeft(node.left);
                return this.#rotateRight(node);
            }
        }

        if (bf < -1) {
            if (this.#balanceFactor(node.right) <= 0) {
                return this.#rotateLeft(node);
            } else {
                node.right = this.#rotateRight(node.right);
                return this.#rotateLeft(node);
            }
        }

        return node;
    }

    #rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;

        node.height = this.#getHeight(node);
        newRoot.height = this.#getHeight(newRoot);
        return newRoot;
    }

    #rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;

        node.height = this.#getHeight(node);
        newRoot.height = this.#getHeight(newRoot);
        return newRoot;
    }

    #balanceFactor(node) {
        return this.#getHeight(node.left) - this.#getHeight(node.right);
    }

    #getMin(node) {
        if (!node || !node.left) {
            return node;
        }

        return this.#getMin(node.left);
    }

    #getMax(node) {
        if (!node || !node.right) {
            return node;
        }

        return this.#getMax(node.right);
    }

    #search(node, value) {
        if (!node) {
            return false;
        }

        if (value == node.value) {
            return true;
        } else if (value < node.value) {
            return this.#search(node.left, value);
        } else {
            return this.#search(node.right, value);
        }
    }

    #preorder_rec(node, res) {
        if (!node) return;
        res.push(node.value);
        this.#preorder_rec(node.left, res);
        this.#preorder_rec(node.right, res);
        return res;
    }

    #inorder_rec(node, res) {
        if (!node) return;
        this.#inorder_rec(node.left, res);
        res.push(node.value);
        this.#inorder_rec(node.right, res);
        return res;
    }

    #postorder_rec(node, res) {
        if (!node) return;
        this.#postorder_rec(node.left, res);
        this.#postorder_rec(node.right, res);
        res.push(node.value);
        return res;
    }
}

const tree = new AVL();

// 2. Insert values
// The tree will automatically balance itself
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
tree.insert(25); // This insertion will trigger rotations

// 3. Search for values
console.log("Found 30:", tree.search(30)); // true
console.log("Found 99:", tree.search(99)); // false

// 4. Get min/max
console.log("Min value:", tree.getMin().value); // 10
console.log("Max value:", tree.getMax().value); // 50

// 5. Perform traversals
console.log("Inorder (sorted):", tree.inorder_rec());
// Output: [10, 20, 25, 30, 40, 50]

console.log("Level Order (BFS):", tree.levelOrder());
// Output: [30, 20, 40, 10, 25, 50]

console.log("Preorder:", tree.preorder_rec());
// Output: [30, 20, 10, 25, 40, 50]

// 6. Delete a value
tree.delete(40);
console.log("Inorder after deleting 40:", tree.inorder_rec());
// Output: [10, 20, 25, 30, 50]
