🏗️ Priority Queue — JavaScript Implementation

A high-performance Priority Queue implemented with a binary heap, using modern JavaScript (ES2022+) and private class fields (#).
Supports both min-heap and max-heap modes automatically, or via a custom comparator.

🚀 Features

✅ Fully encapsulated with private fields (#heap, #cmp, #size)

✅ Works as min-heap or max-heap (auto-detected)

✅ Custom comparator support
(e.g. for objects, strings, or numeric tuples)

✅ Standard priority queue operations:

add(value) — insert element

pop() — remove top priority element

peek() — inspect top element

remove(value) — remove specific element

clear() — reset queue

size() — get current size

toArray() — returns internal heap array copy

is_empty() — check emptiness

✅ Recursive heap maintenance (shift_up / shift_down)

✅ No external dependencies

🏗️ Project Structure
project-root/
│
├── Priority_Queue/
│ └── priority_queue.js # Implementation
│
└── tests/
└── priority_queue.test.js # Optional tests

💡 Example Usage
const { Priority_Queue } = require("./Priority_Queue/priority_queue.js");

// Default = Min Heap
const minPQ = new Priority_Queue();

minPQ.add(5);
minPQ.add(2);
minPQ.add(9);
minPQ.add(1);

console.log("Heap array:", minPQ.toArray());
console.log("Top priority:", minPQ.peek()); // 1

console.log("Removed:", minPQ.pop()); // 1
console.log("Next top:", minPQ.peek()); // 2
console.log("Size:", minPQ.size()); // 3

minPQ.remove(5);
console.log("After removing 5:", minPQ.toArray());

// Max Heap Example
const maxPQ = new Priority_Queue((a, b) => b - a);
maxPQ.add(5);
maxPQ.add(10);
maxPQ.add(3);

console.log("\nMax Heap top:", maxPQ.peek()); // 10
console.log("Pop:", maxPQ.pop()); // 10

✅ Example Output
Heap array: [1, 2, 9, 5]
Top priority: 1
Removed: 1
Next top: 2
Size: 3
After removing 5: [2, 9]

Max Heap top: 10
Pop: 10

⚙️ How It Works

This priority queue is implemented as a binary heap stored in an array.

Parent index: (i - 1) >> 1

Left child: 2 \* i + 1

Right child: 2 \* i + 2

When a value is added, it “bubbles up” to maintain heap order.
When a value is removed, the last element replaces the root and “sinks down.”

this.#back = (this.#back + 1) % this.#cap;

If the comparator (a, b) => a - b returns a positive number when a > b,
the structure behaves as a min-heap.
If it returns negative for a > b, it behaves as a max-heap.

🧠 Algorithmic Complexity
Operation Time Complexity Space Description
add() O(log n) O(n) Insert element and restore heap property
pop() O(log n) O(n) Remove top element
peek() O(1) O(1) Access top element
remove(value) O(n) O(n) Find and remove specific value
clear() O(1) O(1) Reset queue
is_empty() O(1) O(1) Check emptiness
⚠️ Error Handling
Condition Thrown Error
Comparator not a function Error("can not call compare function")
🧪 Example Unit Tests (priority_queue.test.js)
const assert = require("assert");
const { Priority_Queue } = require("../Priority_Queue/priority_queue.js");

// Test 1: Min Heap
(function test_min_heap() {
const pq = new Priority_Queue();
[5, 2, 9, 1, 3].forEach(v => pq.add(v));

    assert.strictEqual(pq.peek(), 1);
    assert.strictEqual(pq.pop(), 1);
    assert.strictEqual(pq.peek(), 2);
    console.log("✅ Test 1 passed: min heap basic ops");

})();

// Test 2: Max Heap
(function test_max_heap() {
const pq = new Priority_Queue((a, b) => b - a);
[5, 9, 1, 7].forEach(v => pq.add(v));
assert.strictEqual(pq.peek(), 9);
pq.pop();
assert.strictEqual(pq.peek(), 7);
console.log("✅ Test 2 passed: max heap basic ops");
})();

// Test 3: Remove element
(function test_remove() {
const pq = new Priority_Queue();
[4, 2, 8, 6].forEach(v => pq.add(v));
pq.remove(6);
assert(!pq.toArray().includes(6));
console.log("✅ Test 3 passed: remove element");
})();

Run Tests
node tests/priority_queue.test.js

🧩 Educational Notes

This implementation demonstrates:

Efficient heap-based priority queue logic

Automatic min/max heap detection

Recursive heapify methods for simplicity

Clear separation of responsibilities (shift_up, shift_down, swap, etc.)

Uses modern ECMAScript private fields (#) for data safety

Ideal for learning, algorithm visualizations, and building:

Task schedulers

Dijkstra’s algorithm

A\* pathfinding

Event simulation systems

🧑‍💻 Author

Ashot Poghosyan
📘 Software engineer & data-structure researcher
🌱 Building clear, efficient algorithmic tools for education and practice

📜 License

MIT License — free for personal, educational, and commercial use.
