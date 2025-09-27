Sorting Algorithm: Merge Sort (Recursive Implementation) 🌀
This repository contains a C implementation of the Merge Sort algorithm, a highly efficient, comparison-based sorting method that uses the Divide and Conquer paradigm to sort an array in ascending order.

🧠 How Merge Sort Works
Merge Sort operates on the principle of Divide and Conquer, which involves three steps:

1. Divide (The merge_sort function)
The array is recursively divided into two halves until the sub-arrays contain only one element. A list with one element is inherently considered sorted.

The division is performed by calculating the midpoint and recursively calling merge_sort on the left half (left to mid) and the right half (mid + 1 to right).

The base case for the recursion is when left >= right, meaning the sub-array has 0 or 1 elements.

2. Conquer (The merge function)
Once the array is fully divided, the merging process begins, which is the "conquer" step.

The merge function takes two adjacent, already sorted sub-arrays (from left to mid and mid + 1 to right) and combines them into a single, sorted sub-array.

3. Combine/Merge Logic
The merge function copies the two sub-arrays into temporary arrays (left_arr and right_arr).

It then uses two pointers (one for each temporary array) to compare the smallest remaining elements from each sub-array.

The smaller of the two elements is placed back into the original array (arr), and its pointer is advanced.

This comparison process repeats until one of the temporary arrays is exhausted.

Finally, any remaining elements in the non-exhausted temporary array are copied back to the original array.

This merging process ensures that the combined sub-array is sorted, and it moves up the call stack until the entire original array is sorted.

⚙️ Implementation Details
Function	Purpose
merge_sort	The recursive function that implements the Divide phase. It continuously splits the array until the base case is met.
merge	The function that implements the Conquer phase. It takes two sorted sub-arrays and merges them into a single, sorted array. This requires allocating and freeing two temporary arrays.
create_array	A memory allocation wrapper using malloc that includes error checking with perror and exit if allocation fails.

🚀 Time and Space Complexity
Merge Sort is valued for its guarantee of fast performance regardless of the initial state of the input array.

Complexity Type	Value	Notes
Time Complexity	O(nlogn)	Consistent across all cases (Worst, Average, Best). This is a highly efficient performance for large datasets.
Space Complexity	O(n)	The algorithm requires auxiliary space proportional to the size of the input array (O(n)) to create the temporary sub-arrays during the merging process.
