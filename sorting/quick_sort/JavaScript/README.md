Sorting Algorithm: Optimized Quick Sort (JavaScript) 🚀
This repository contains a JavaScript implementation of the Quick Sort algorithm, one of the most efficient comparison-based sorting algorithms. This version includes an optimization technique called Median-of-Three to select a better pivot, which helps prevent worst-case performance scenarios.

🧠 How Quick Sort Works (Divide and Conquer)
Quick Sort follows the Divide and Conquer strategy:

1. Divide (Partitioning)
Select a Pivot: An element from the array is chosen as the pivot.

Partition: The array is rearranged so that all elements smaller than the pivot are on the left side, and all elements greater than the pivot are on the right side. Elements equal to the pivot can be on either side.

The pivot is now in its final, sorted position.

2. Conquer (Recursion)
The algorithm recursively applies the Divide and Conquer strategy to the sub-array of elements less than the pivot and the sub-array of elements greater than the pivot.

3. Combine
No explicit "combine" step is needed, as the partitioning step places elements in their correct relative positions, and the recursive calls naturally lead to a fully sorted array.

✨ Optimization: Median-of-Three Pivot Selection
The choice of the pivot element is crucial for Quick Sort's performance. Choosing a poor pivot (e.g., the smallest or largest element) leads to the worst-case O(n 
2
 ) time complexity.

This implementation uses the Median-of-Three technique to select a more robust pivot:

Select Candidates: It considers the elements at the left, mid, and right indices of the current sub-array.

Sort Candidates: It performs a few swaps to ensure that nums[left]≤nums[mid]≤nums[right].

Choose Pivot: The element at the median position (mid) is the one that is most likely to be a good separator. This element is then swapped to the position right−1 to be used as the pivot during partitioning.

The function returns the index right−1, which points to the chosen pivot element.

By selecting a pivot that is closer to the true median, the algorithm is much less likely to hit the worst-case O(n 
2
 ) time.

⚙️ Code Function Breakdown
Function	Purpose
quick_sort(nums, left, right)	The main recursive function. It checks the base case (left < right), determines the pivot using medianOfThree, partitions the array, and recursively sorts the sub-arrays.
medianOfThree(nums, left, right)	Implements the Median-of-Three optimization to select a pivot that is likely to split the array evenly. It moves the selected pivot to index right - 1.
partition(nums, left, right, pivot_index)	Rearranges the sub-array elements around the chosen pivot. It places the pivot at its correct final position and returns that index (idx).
swap(nums, i, j)	A utility function using JavaScript's array destructuring to quickly exchange two elements in the array.

🚀 Time and Space Complexity
Quick Sort is generally the fastest practical comparison sort on average.

Complexity Type	Value	Notes
Worst-Case	O(n 
2
 )	Occurs when the pivot consistently yields highly unbalanced partitions (e.g., if the array is already sorted and the simple last element pivot is used). The Median-of-Three optimization helps avoid this.
Average-Case	O(nlogn)	The typical and expected performance for randomized or partially sorted data.
Best-Case	O(nlogn)	Occurs when the pivot always divides the array into two roughly equal halves.
Space Complexity	O(logn)	Uses auxiliary space for the recursive call stack.
