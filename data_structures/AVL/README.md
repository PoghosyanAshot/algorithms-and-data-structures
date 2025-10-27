AVL Tree Implementation in JavaScriptThis repository contains a comprehensive implementation of an AVL Tree, a self-balancing binary search tree (BST), written in JavaScript.An AVL tree maintains its balance by ensuring that the heights of the two child subtrees of any node differ by no more than one. This balancing property guarantees that all major operations (insertion, deletion, and search) are performed in $O(\log n)$ time complexity, even in the worst case.FeaturesCore BST Operations: insert(value), delete(value), and search(value).Self-Balancing: Automatically performs rotations (Left, Right, Left-Right, and Right-Left) upon insertion and deletion to maintain the AVL property.Utility Methods: Includes getMin(), getMax(), and getHeight() to inspect the tree's properties.Comprehensive Tree Traversals:Breadth-First Search (BFS)levelOrder()Depth-First Search (DFS) - Both recursive and iterative versions are provided for each.Inorder (Left, Root, Right): inorder_rec() & inorder_itr()Preorder (Root, Left, Right): preorder_rec() & preorder_itr()Postorder (Left, Right, Root): postorder_rec() & postorder_itr()API OverviewMain Class: AVLinsert(value): Inserts a new value into the tree and re-balances it if necessary.delete(value): Deletes a value from the tree and re-balances it if necessary.search(value): Returns true if the value exists in the tree, otherwise false.getMin(): Returns the node with the minimum value in the tree.getMax(): Returns the node with the maximum value in the tree.getHeight(): Returns the total height of the tree.levelOrder(): Returns an array of values from a level-order (BFS) traversal.inorder_rec() / inorder_itr(): Returns an array of values from an in-order (DFS) traversal. This will be a sorted list.preorder_rec() / preorder_itr(): Returns an array of values from a pre-order (DFS) traversal.postorder_rec() / postorder_itr(): Returns an array of values from a post-order (DFS) traversal.Installation & DependenciesThis AVL class depends on a separate Queue class for its levelOrder() (BFS) traversal.JavaScriptconst { Queue } = require("../Queue/queue.js");
Ensure the queue.js file is available at the correct path relative to the AVL.js file.Usage ExampleJavaScript// Assuming the class is exported (e.g., module.exports = { AVL })
const { AVL } = require("./AVL.js"); // Adjust path as needed

// 1. Create a new tree
const tree = new AVL();

// 2. Insert values
// The tree will automatically balance itself
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
tree.insert(25); // This insertion will trigger rotations

/_
The balanced tree will look like this:
30
/ \
 20 40
/ \ \
 10 25 50
_/

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
