Sorting Algorithm: Optimized Bubble Sort
This repository contains a C implementation of the Bubble Sort algorithm, which efficiently sorts an array of integers in ascending order.

🧠 How Bubble Sort Works
Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

Comparison and Swapping: In each pass (iteration of the outer loop), it compares every pair of adjacent elements.

"Bubbling" the Largest Element: The largest (or smallest, depending on the sort order) element "bubbles up" to its correct, final position at the end of the unsorted portion of the array. After the first pass, the largest element is at the very end. After the second pass, the second largest element is in the second-to-last position, and so on.

The number of comparisons decreases with each pass because the elements at the end of the array are already in their sorted place.

✨ Optimization: Early Termination
The standard Bubble Sort algorithm continues to iterate through the entire array even after it is completely sorted. This implementation includes a crucial optimization: early termination.

A boolean flag, is_sorted, is set to true at the beginning of each pass.

If any swap occurs during the pass, the flag is set back to false.

If a pass completes with the is_sorted flag still set to true (meaning zero swaps occurred), the array is sorted, and the outer loop is immediately exited using a break statement.

This optimization significantly improves performance in the best-case and average-case scenarios (especially for arrays that are already sorted or nearly sorted).

⚙️ The XOR Swap Trick
The code uses a space-efficient technique called the XOR swap trick to exchange two elements without needing a temporary variable:

C

arr[j] ^= arr[j + 1];
arr[j + 1] ^= arr[j];
arr[j] ^= arr[j + 1];
This trick leverages the properties of the Bitwise XOR operator (⊕ or ^):

A=A⊕B (Stores the XOR of A and B in A).

B=B⊕A (Since B⊕(A⊕B)=A, B now holds the original value of A).

A=A⊕B (Since (A⊕B)⊕A=B, A now holds the original value of B).

The two values are effectively swapped.

🚀 Time Complexity
Case	Time Complexity
Worst-Case (Reverse-sorted array)	O(n 
2
 )
Average-Case	O(n 
2
 )
Best-Case (Already sorted array, with early termination)	O(n)

