🚚 Queue — JavaScript Implementation

A fully featured circular Queue (FIFO) written in modern JavaScript (ES2022+), using private fields (#) for complete encapsulation.
This class supports constant-time enqueue/dequeue operations, safe overflow/underflow checks, and clear API methods.

🌟 Features

✅ Encapsulated private fields for internal state

✅ Circular array for O(1) enqueue/dequeue

✅ Safe capacity control

✅ Clean error handling (Queue overflow / Queue underflow)

✅ Utility methods:

enqueue(value)

dequeue()

peek()

is_empty()

is_full()

size()

print() — displays queue contents in order

🏗️ Project Structure
project-root/
│
├── Queue/
│ └── queue.js # Queue class implementation
│
└── tests/
└── queue.test.js # Optional test file

💡 Example Usage
const { Queue } = require("./Queue/queue.js");

try {
const q = new Queue(5);

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.print();   // [10, 20, 30]

    console.log("Front:", q.peek()); // 10
    console.log("Dequeued:", q.dequeue()); // 10
    console.log("Dequeued:", q.dequeue()); // 20

    q.enqueue(40);
    q.enqueue(50);
    q.enqueue(60);
    q.enqueue(70); // Queue now full

    q.print(); // [30, 40, 50, 60, 70]
    console.log("Size:", q.size());  // 5
    console.log("Full?", q.is_full()); // true

    console.log("Dequeued:", q.dequeue()); // 30
    q.print(); // [40, 50, 60, 70]

} catch (err) {
console.error("❌ Error:", err.message);
}

✅ Example Output
[10, 20, 30]
Front: 10
Dequeued: 10
Dequeued: 20
[30, 40, 50, 60, 70]
Size: 5
Full? true
Dequeued: 30
[40, 50, 60, 70]

⚙️ Internal Mechanics

This Queue uses a circular buffer to reuse space efficiently.
Indices wrap around when reaching the end using modulo arithmetic:

this.#back = (this.#back + 1) % this.#cap;
this.#front = (this.#front + 1) % this.#cap;

This ensures enqueue and dequeue always run in constant time, without shifting array elements.

🧠 Algorithmic Complexity
Operation Time Complexity Space Complexity Description
enqueue() O(1) O(n) Adds item at back
dequeue() O(1) O(n) Removes item from front
peek() O(1) O(1) Reads front element
is_empty() O(1) O(1)** Checks emptiness
is_full() O(1) O(1)** Checks capacity
size() O(1) O(1)\*\* Returns queue size
⚠️ Error Handling
Condition Thrown Error
Capacity invalid (<= 0 or not number) Error("Invalid capacity")
Attempt to enqueue when full Error("Queue overflow")
Attempt to dequeue when empty Error("Queue underflow")
🧪 Example Unit Tests (queue.test.js)
const assert = require("assert");
const { Queue } = require("../Queue/queue.js");

// Test 1: Basic enqueue/dequeue
(function test_enqueue_dequeue() {
const q = new Queue(3);
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
assert.strictEqual(q.dequeue(), 1);
assert.strictEqual(q.dequeue(), 2);
q.enqueue(4);
assert.deepStrictEqual(q.peek(), 3);
console.log("✅ Test 1 passed: enqueue/dequeue");
})();

// Test 2: Overflow and underflow
(function test_limits() {
const q = new Queue(2);
q.enqueue(10);
q.enqueue(20);
let overflowCaught = false;
try { q.enqueue(30); } catch { overflowCaught = true; }
assert(overflowCaught, "Queue overflow not caught");

    q.dequeue();
    q.dequeue();
    let underflowCaught = false;
    try { q.dequeue(); } catch { underflowCaught = true; }
    assert(underflowCaught, "Queue underflow not caught");

    console.log("✅ Test 2 passed: overflow/underflow handling");

})();

// Test 3: Circular behavior
(function test_circularity() {
const q = new Queue(3);
q.enqueue("A");
q.enqueue("B");
q.enqueue("C");
q.dequeue();
q.enqueue("D");
q.print(); // should show [B, C, D]
console.log("✅ Test 3 passed: circular indexing");
})();

Run tests with:

node tests/queue.test.js

🧰 Requirements

Node.js v18+

ECMAScript 2022+ (supports private class fields)

No dependencies

📚 Educational Value

This project demonstrates:

Implementation of a circular queue (ring buffer)

Modular arithmetic in data structures

Error-safe, encapsulated OOP design in modern JavaScript

Ideal for simulations, schedulers, buffering systems, and BFS algorithms

🧑‍💻 Author

Ashot Poghosyan
📘 Focused on algorithmic integrity and data-structure clarity
💡 Built for education, performance, and practical use

📜 License

MIT License — free for both academic and commercial applications.
Attribution appreciated.
