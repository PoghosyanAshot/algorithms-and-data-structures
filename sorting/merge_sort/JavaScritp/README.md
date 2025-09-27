Merge Sort

Merge sort is an efficient, comparison-based sorting algorithm. It's a classic example of the Divide and Conquer paradigm. The algorithm works by recursively dividing the array into two halves until it can no longer be divided, and then merging them back together in a sorted manner.

How It Works
The algorithm is broken into two main functions:

1. merge_sort(arr) (The "Divide" Phase)
Base Case: The recursion stops when the array has 1 or 0 elements (arr.length <= 1), as a single-element array is already considered sorted.

Division: The array is split into two equal halves: left and right.

Recursion: The merge_sort function is called recursively on both left and right subarrays. This continues until the arrays are broken down into single-element lists.

Conquer: The sorted subarrays returned from the recursive calls are then passed to the merge function to be combined.

2. merge(left, right) (The "Conquer" Phase)
This function takes two already sorted arrays, left and right, and merges them into a single, sorted result array.

It uses three pointers (i, j, and k) to keep track of the current position in each array and the result array.

The while loop compares the elements at the current positions of the left and right arrays. The smaller of the two elements is added to the result array, and its respective pointer is incremented.

After the main loop finishes, one of the arrays might still have remaining elements. The subsequent while loops handle this by appending any remaining elements to the end of the result array.

Finally, the merged and sorted result array is returned.

Time Complexity
Worst Case: O(nlogn)

Average Case: O(nlogn)

Best Case: O(nlogn)

Merge Sort's performance is consistently O(nlogn) because it always divides the array into halves and performs a linear time merge operation on the subarrays.

Space Complexity
Space Complexity: O(n)

Merge sort is not an in-place sorting algorithm. It requires an auxiliary array of size n to store the merged results, which is why its space complexity is linear with respect to the input size.
