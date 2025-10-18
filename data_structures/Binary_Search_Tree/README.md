🧩 Binary Search Tree (BST) — JavaScript Implementation

A fully featured Binary Search Tree (BST) written in modern JavaScript (ES2022+), with private class fields, full traversal algorithms, height calculation, and delete operations using the standard BST rules.

It also includes recursive and iterative traversal methods, level-order traversal using a queue, and comprehensive unit tests.

🚀 Features

✅ Object-Oriented Design with #private fields

✅ insert() — recursive insertion

✅ delete() — supports deleting nodes with 0, 1, or 2 children

✅ find_min() / find_max()

✅ get_height() — BFS-based level height

✅ is_empty() — size check

✅ Traversals:

inorder_rec() / inorder_itr()

preorder_rec() / preorder_itr()

postorder_rec() / postorder_itr()

level_order()

✅ Tested with pure Node.js using assert module

✅ Works seamlessly with your custom Queue implementation

🏗️ Project Structure
project-root/
│
├── BST/
│ └── bst.js # Binary Search Tree implementation
│
├── Queue/
│ └── queue.js # Simple queue class (FIFO)
│
└── tests/
└── bst.test.js # Full test suite using Node.js assert

💡 Example Usage
const { Queue } = require("../Queue/queue.js");
const { BST } = require("../BST/bst.js");

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

Output example:

Level Order: [10, 8, 12, 6, 9, 11, 15, 1, 7, 20]
After deleting 12: [10, 8, 15, 6, 9, 11, 20, 1, 7]

🧠 Algorithmic Overview
Operation Complexity (Average) Complexity (Worst) Description
Insert O(log n) O(n) Standard recursive insert
Delete O(log n) O(n) Uses inorder successor replacement
Search O(log n) O(n) Traverses down tree
Traversals O(n) O(n) All traverse nodes once
Height O(n) O(n) BFS-based calculation
🧪 Running Tests

Tests are written using Node’s built-in assert module — no dependencies required.

▶ Run all tests:
node tests/bst.test.js

Expected output:

✅ Test 1 passed: insert & level order
✅ Test 2 passed: inorder traversals
✅ Test 3 passed: preorder traversals
✅ Test 4 passed: postorder traversals
✅ Test 5 passed: min & max
✅ Test 6 passed: height
✅ Test 7 passed: delete (two children)
✅ Test 8 passed: delete leaf
✅ Test 9 passed: delete root
✅ Test 10 passed: empty tree conditions

🧩 Queue Implementation Example

You can implement a simple queue like this for the level-order traversal:

class Queue {
constructor(capacity = 100) {
this.items = [];
this.capacity = capacity;
}

    enqueue(value) {
        if (this.items.length >= this.capacity) {
            throw new Error("Queue overflow");
        }
        this.items.push(value);
    }

    dequeue() {
        if (this.is_empty()) {
            throw new Error("Queue underflow");
        }
        return this.items.shift();
    }

    size() {
        return this.items.length;
    }

    is_empty() {
        return this.items.length === 0;
    }

}

module.exports = { Queue };

🧰 Requirements

Node.js v18+

ECMAScript 2022 (for private class fields)

No external dependencies

📘 Educational Value

This project demonstrates:

Recursive and iterative tree traversal algorithms

Encapsulation using modern JS OOP

Practical understanding of BST properties

Algorithmic problem solving using queues and stacks

Perfect for students and engineers learning data structures in JavaScript.

🧑‍💻 Author

Ashot Poghosyan
💬 Built with passion for algorithms and clean design.
📚 Inspired by classical data-structure implementations in C and Java.

📜 License

MIT License — free for educational and commercial use.
Please keep this README reference when redistributing.
