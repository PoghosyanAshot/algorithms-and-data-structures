🧱 Stack — JavaScript Implementation

A lightweight, high-performance Stack (LIFO) data structure implemented in modern JavaScript (ES2022+) using private class fields (#).

This module provides the essential operations of a stack — push, pop, peek, and is_empty — all with clean error handling and encapsulated internal state.

🚀 Features

✅ Fully encapsulated using private fields (#stack, #size, #cap)

✅ Constructor validation for capacity

✅ Standard stack operations:

push() — add element to top

pop() — remove top element

peek() — view top element

is_empty() — check if stack is empty

✅ Capacity control (throws error if exceeded)

✅ No external dependencies — pure ES2022 class

🏗️ Project Structure
project-root/
│
├── Stack/
│ └── stack.js # Stack class implementation
│
└── tests/
└── stack.test.js # Unit tests for Stack

📘 Example Usage
const { Stack } = require("./Stack/stack.js");

try {
const stack = new Stack(5); // create stack with capacity 5

    stack.push(10);
    stack.push(20);
    stack.push(30);

    console.log("Top element:", stack.peek()); // Output: 30
    console.log("Is empty:", stack.is_empty()); // Output: false

    console.log("Popped:", stack.pop()); // Output: 30
    console.log("Popped:", stack.pop()); // Output: 20

    console.log("Top element now:", stack.peek()); // Output: 10

} catch (err) {
console.error("Error:", err.message);
}

✅ Example Output
Top element: 30
Is empty: false
Popped: 30
Popped: 20
Top element now: 10

🧠 Algorithmic Complexity
Operation Time Complexity Description
push() O(1) Appends element to top
pop() O(1) Removes element from top
peek() O(1) Accesses top element
is_empty() O(1) Checks stack emptiness

All operations are constant-time — ideal for algorithmic problems, interpreters, and expression evaluators.

⚠️ Error Handling

This class provides strong runtime checks for safe stack usage:

Condition Thrown Error
Capacity not a number Error("invalid capacity")
Exceeding stack capacity Error("Maximum stack size")
Popping from empty stack Error("empty stack")
🔧 Correct Error Object

Replace every new ERROR(...) with:

throw new Error("message");

JavaScript’s built-in Error must be used — ERROR is undefined.

💡 Improved Implementation (bug-free version)
class Stack {
#stack = null;
#size = 0;
#cap;

    constructor(cap) {
        if (typeof cap !== "number" || cap <= 0) {
            throw new Error("invalid capacity");
        }
        this.#stack = [];
        this.#cap = cap;
    }

    is_empty() {
        return this.#size === 0;
    }

    push(val) {
        if (this.#size === this.#cap) {
            throw new Error("Maximum stack size reached");
        }
        this.#stack.push(val);
        ++this.#size;
    }

    pop() {
        if (this.is_empty()) {
            throw new Error("empty stack");
        }
        this.#size--;
        return this.#stack.pop();
    }

    peek() {
        if (this.is_empty()) {
            throw new Error("empty stack");
        }
        return this.#stack[this.#size - 1];
    }

}

module.exports = { Stack };

🧪 Example Unit Tests (stack.test.js)
const assert = require("assert");
const { Stack } = require("../Stack/stack.js");

// Test 1: Push and Peek
(function test_push_peek() {
const s = new Stack(3);
s.push(1);
s.push(2);
assert.strictEqual(s.peek(), 2);
console.log("✅ Test 1 passed: push & peek");
})();

// Test 2: Pop
(function test_pop() {
const s = new Stack(2);
s.push(5);
s.push(10);
assert.strictEqual(s.pop(), 10);
assert.strictEqual(s.pop(), 5);
console.log("✅ Test 2 passed: pop");
})();

// Test 3: Capacity limit
(function test_capacity() {
const s = new Stack(1);
s.push(100);
let caught = false;
try { s.push(200); } catch { caught = true; }
assert.strictEqual(caught, true);
console.log("✅ Test 3 passed: capacity limit");
})();

// Test 4: Empty stack
(function test_empty() {
const s = new Stack(2);
assert.strictEqual(s.is_empty(), true);
s.push(1);
assert.strictEqual(s.is_empty(), false);
console.log("✅ Test 4 passed: is_empty");
})();

Run Tests:
node tests/stack.test.js

🧰 Requirements

Node.js v18+

ECMAScript 2022+ (for private fields)

No dependencies

📚 Educational Value

This stack implementation is ideal for:

Learning LIFO data structures

Building parsers, interpreters, or undo/redo systems

Understanding encapsulation and class privacy in modern JavaScript

🧑‍💻 Author

Ashot Poghosyan
💬 Focused on algorithmic clarity and low-level data structures
📘 Built for educational and professional use

📜 License

MIT License — free to use and modify for personal or commercial projects.
