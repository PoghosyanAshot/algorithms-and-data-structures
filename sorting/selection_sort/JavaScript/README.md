Selection Sort

How It Works

Outer Loop: The outer for loop (for (let i = 0; i < size - 1; ++i)) iterates from the beginning of the array up to the second-to-last element. This loop marks the boundary between the sorted and unsorted portions of the array. The element at index i is where the smallest element found in each pass will be placed.

Inner Loop: The inner for loop (for (let j = i + 1; j < size; ++j)) is responsible for finding the smallest element in the unsorted portion of the array. It starts from i + 1 and goes to the end of the array. A variable min_index is used to keep track of the index of the minimum element found so far in the unsorted part.

Comparison and Swap:

The if (arr[min_index] > arr[j]) condition checks if the current element (arr[j]) is smaller than the minimum element found so far (arr[min_index]). If it is, min_index is updated to j.

After the inner loop completes, min_index holds the index of the smallest element in the unsorted part of the array.

The if (min_index !== i) condition checks if the smallest element is already in its correct position. If not, the elements at min_index and i are swapped. This moves the smallest element to its correct position at the beginning of the unsorted part.

The process repeats for each pass, growing the sorted portion of the array by one element at a time until the entire array is sorted.

Characteristics
Time Complexity: Selection Sort has a time complexity of O(n 
2
 ) in the best, average, and worst cases. This is because it always performs a full scan of the unsorted subarray for each pass, regardless of whether the array is sorted or not.

Space Complexity: The space complexity is O(1) because it sorts the array "in-place" without requiring any additional memory that scales with the input size.
