JavaScript Singly Linked List
A comprehensive implementation of a singly linked list data structure in modern JavaScript. This class provides a classic node-based list with a full suite of methods for manipulation, traversal, and advanced algorithms like sorting and merging.

A singly linked list is a linear data structure made of nodes, where each node contains a value and a pointer to the next node in the sequence. It excels at fast insertions and deletions at the beginning of the list.

✨ Features
Node-Based Structure: Efficient O(1) time complexity for adding and removing elements at the front.

Iterable Protocol: Fully supports the JavaScript iteration protocol, allowing it to be used in for...of loops and with the spread (...) syntax.

Rich API: Provides a wide range of methods, from basic push/pop operations to complex algorithms like reverse, sort, and merge.

Flexible Initialization: Can be easily created from any JavaScript iterable (e.g., Array, Set).

📚 API Reference
Constructor
new SinglyLinkedList(iterable)

Creates a new SinglyLinkedList.

iterable: An optional iterable object (like an Array) to populate the list with.

Size Modifiers
size(): Returns the number of elements in the list.

isEmpty(): Returns true if the list is empty, otherwise false.

clear(): Removes all elements from the list, making it empty.

Element Access
front(): Returns the value of the first node without removing it. Returns undefined if the list is empty.

Push & Pop
push_front(value): Adds a new node with the given value to the beginning of the list. (O(1) complexity)

push_back(value): Adds a new node with the given value to the end of the list. (O(n) complexity)

pop_front(): Removes the first node and returns its value. Returns undefined if the list is empty. (O(1) complexity)

pop_back(): Removes the last node and returns its value. Returns undefined if the list is empty. (O(n) complexity)

Random-like Operations
Note: Accessing elements by index in a linked list requires traversing the list from the beginning, resulting in O(n) time complexity for these operations.

at(index): Returns the value of the node at the specified index.

insert(index, value): Inserts a new node with value at the specified index.

erase(index): Removes the node at the specified index.

remove(value, equalsFn?): Removes all nodes that contain the given value. Returns a count of removed nodes.

An optional equalsFn(a, b) can be provided for custom equality checking.

Algorithms
reverse(): Reverses the order of the nodes in the list in-place.

sort(compareFn?): Sorts the list. By default, it sorts in ascending order.

An optional compareFn(a, b) can be provided for custom sorting logic.

Note: This is implemented by converting the list to an array, sorting the array, and then rebuilding the list.

merge(otherList, compareFn?): Merges another sorted list into the current sorted list, maintaining order.

Important: This method assumes both lists are already sorted according to the compareFn. Throws an error if they are not.

Utilities
toArray(): Converts the linked list to a standard JavaScript Array.

static fromArray(arr): A static method that creates a new SinglyLinkedList instance from an array.

Iteration
[Symbol.iterator](): Returns an iterator object, making the class compatible with for...of loops and other iterable-consuming syntax like the spread operator (...).
