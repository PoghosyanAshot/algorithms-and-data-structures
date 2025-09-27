How Insertion Sort Works
Insertion sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages:

Simple implementation: It's easy to understand and code.

Efficient for small data sets: It performs well when the data set is small.

Efficient for data sets that are already partially sorted: If the data set is mostly sorted, insertion sort will perform much faster.

Adaptive: It has an O(n) worst-case time complexity when the input array is already sorted.

Stable: It does not change the relative order of elements with equal keys.

In-place: It requires only O(1) auxiliary space.

The algorithm works by iterating through the input array, taking one element at a time (the key), and inserting it into its correct position within the already sorted portion of the array.

Here's a step-by-step breakdown of your insertion_sort function:

Outer Loop (for (let i = 1; i < size; ++i)): This loop starts from the second element of the array (i = 1) and goes up to the last element. Each iteration considers one element to be inserted into its sorted position.

const key = arr[i];: The current element being considered for insertion is stored in the key variable.

let j = i - 1;: A pointer j is initialized to the index of the element just before the key. This j points to the last element of the already sorted subarray.

Inner Loop (while (j >= 0 && arr[j] > key)): This while loop shifts elements in the sorted subarray that are greater than the key one position to the right.

j >= 0: Ensures that j doesn't go out of bounds (i.e., it stays within the array indices).

arr[j] > key: Checks if the element at index j in the sorted subarray is greater than the key.

arr[j + 1] = arr[j];: If the condition is true, the element at arr[j] is moved to the next position (arr[j + 1]).

--j;: The pointer j is decremented to move to the next element on the left in the sorted subarray.

arr[j + 1] = key;: Once the while loop finishes (either j becomes negative or arr[j] is no longer greater than key), the key is inserted into its correct sorted position, which is j + 1.

Time and Space Complexity
Time Complexity:

Best Case: O(n) - This occurs when the array is already sorted. The while loop condition arr[j] > key will always be false, so each element is only compared once.

Average Case: O(n 
2
 ) - On average, each element will need to be compared with about half of the elements in the sorted subarray.

Worst Case: O(n 
2
 ) - This occurs when the array is sorted in reverse order. Each element will need to be compared with all the elements in the sorted subarray, resulting in the maximum number of comparisons and shifts.

Space Complexity:

O(1) - Insertion sort is an in-place sorting algorithm. It only requires a constant amount of extra memory for variables like key and j, regardless of the input array size.
