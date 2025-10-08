🧱 Bucketed Deque in JavaScript 🧱
Welcome! 👋 This is a high-performance Double-Ended Queue (Deque) built with modern JavaScript.

Ever needed a queue that's lightning-fast at both ends? ⚡️ That's exactly what this is!

Instead of using a single, giant array (which can be slow), this Deque uses a clever system of smaller arrays called "buckets" 🪣. This design allows for incredibly fast additions and removals from both the front and the back.

🤔 Why is this cool?
A standard JavaScript array is slow (O(n)) when you use shift() to remove an item from the beginning. This Deque is always fast (O(1) amortized) for adding or removing from either end! 🚀

✨ Features
⚡️ Blazing Fast Operations: Add (push_front, push_back) and remove (pop_front, pop_back) items in constant O(1) amortized time.

📈 Automatic Resizing: The internal map of buckets grows automatically when needed. No manual memory management!

🎯 Indexed Access: Grab any element by its index with the .at() method.

🔄 Fully Iterable: Works seamlessly with for...of loops and the spread operator (...).

✨ Modern & Clean: Written in ES6+ with private class fields for a clean API.

🚀 Getting Started
It's easy to get started! Just create a new Deque and you're ready to go.

JavaScript

// Create a new Deque
const dq = new Deque();

// Add items to the back
dq.push_back('Hello');
dq.push_back('World'); // Deque: ['Hello', 'World']

// Add items to the front
dq.push_front('🚀'); // Deque: ['🚀', 'Hello', 'World']

// Convert to an array to see the result
console.log(dq.to_array());
// Output: ['🚀', 'Hello', 'World']
🕹️ Examples in Action
1. Basic Push & Pop 📥
Let's see the basics in action! We'll add and remove a few items to see how the Deque changes.

```JavaScript

const dq = new Deque();

console.log('Pushing 10, 20 to the back...');
dq.push_back(10);
dq.push_back(20);

console.log('Pushing 5, 1 to the front...');
dq.push_front(5);
dq.push_front(1);

console.log('✅ Result:', dq.to_array()); // [1, 5, 10, 20]

console.log('Popping from back:', dq.pop_back());   // 20
console.log('Popping from front:', dq.pop_front()); // 1

console.log('✅ Final Result:', dq.to_array()); // [5, 10]
2. Accessing & Looping 🔍
Need to peek at the first item, last item, or something in the middle? Easy! ✅

JavaScript

const dq = new Deque();
dq.push_back(100);
dq.push_back(200);
dq.push_back(300);

console.log('👑 Front:', dq.front()); // 100
console.log('⚓ Back:', dq.back());   // 300
console.log('🎯 At index 1:', dq.at(1)); // 200

console.log('\nLooping through all items:');
for (const item of dq) {
    console.log('->', item);
}
3. The Magic of Resizing 🪄
This is where the magic happens! ✨ Watch how the deque automatically grows when it needs more space, without you having to do anything. We'll use a small bucket size to trigger it quickly.

JavaScript

// map_size=4, bucket_size=4
const dq = new Deque(4, 4);

console.log('Pushing 8 items to the front to force a resize...');

// This will fill the initial buckets and trigger the #resize() method
for(let i = 1; i <= 8; ++i) {
    dq.push_front(i);
}

console.log('🎉 Resize complete!');
console.log('New size:', dq.size());
console.log('Final array:', dq.to_array());
console.log('\nInternal structure after resize:');
dq.print();
