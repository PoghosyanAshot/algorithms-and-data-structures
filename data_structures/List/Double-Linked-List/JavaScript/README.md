JavaScript Doubly Linked List
An implementation of a doubly linked list in modern JavaScript. This data structure consists of a set of sequentially linked records called nodes. Each node contains a value, a reference to the previous node, and a reference to the next node in the sequence.

This bidirectional linkage allows for traversal in both directions. Compared to a singly linked list, it provides highly efficient O(1) time complexity for insertion and deletion at both the head and tail of the list.

✨ Features
Bidirectional Traversal: Each node points to both its predecessor and successor, allowing for forward and backward iteration.

Highly Efficient Operations: Constant time O(1) complexity for adding or removing elements from both the front and the back.

Optimized Indexing: The at(index) method intelligently searches from the nearest end (head or tail) to speed up access.

Flexible Initialization: Can be instantiated from any JavaScript iterable (e.g., Array, Set).

Iterable Protocol: Implements the JavaScript iterator protocol, enabling the use of for...of loops and the spread syntax (...).

🚀 Getting Started
To use the DoubleLinkedList class, save the code to a file (e.g., DoubleLinkedList.js) and import it where needed.

Example Usage
JavaScript

// Assuming DoubleLinkedList class is in scope or imported

// Create a new list from an array
const list = new DoubleLinkedList(['b', 'c']);

// --- O(1) operations on both ends ---
list.push_front('a'); // list: a <=> b <=> c
list.push_back('d');  // list: a <=> b <=> c <=> d

console.log('Front:', list.front()); // Output: Front: a
console.log('Back:',  list.back());  // Output: Back: d

list.pop_front();     // list: b <=> c <=> d
list.pop_back();      // list: b <=> c

// Optimized access by index
console.log('Element at index 1:', list.at(1)); // Output: Element at index 1: c

// The list is iterable
console.log('List contents:', [...list]); // Output: List contents: [ 'b', 'c' ]

// Reverse the list in-place
list.reverse();
console.log('Reversed list:', [...list]); // Output: Reversed list: [ 'c', 'b' ]
📚 API Reference
Constructor
new DoubleLinkedList(iterable)

Creates a new DoubleLinkedList instance.

iterable: An optional iterable object to populate the list with initial values.

Size & State
size(): Returns the number of elements in the list.

isEmpty(): Returns true if the list has no elements, otherwise false.

clear(): Removes all elements from the list.

Element Access
front(): Returns the value of the first node.

back(): Returns the value of the last node.

Modifiers (Push & Pop)
push_front(value): Adds a new node with the given value to the beginning of the list. (O(1) complexity)

push_back(value): Adds a new node with the given value to the end of the list. (O(1) complexity)

pop_front(): Removes the first node and returns its value. (O(1) complexity)

pop_back(): Removes the last node and returns its value. (O(1) complexity)

Random-like Operations
Note: While optimized, these operations still have a worst-case time complexity of O(n) as they may require traversing half the list.

at(index): Returns the value of the node at the specified index. Traverses from the closest end.

insert(index, value): Inserts a new node with value at the specified index.

erase(index): Removes the node at the specified index and returns its value.

Algorithms
remove(value, equalsFn?): Removes all nodes matching the given value. Returns a count of the deleted nodes.

An optional equalsFn(a, b) can be provided for custom equality checking (defaults to Object.is).

reverse(): Reverses the list in-place by swapping node pointers. This is a very efficient O(n) operation.
