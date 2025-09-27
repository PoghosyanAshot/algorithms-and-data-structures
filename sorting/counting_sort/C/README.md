Sorting Algorithm: Counting Sort (Range-Based)
This repository contains a C implementation of the Counting Sort algorithm. This version is optimized to handle integer arrays that contain both positive and negative numbers by adjusting the indices based on the minimum value (min).

🧠 How Counting Sort Works
Counting Sort is a non-comparison based integer sorting algorithm. Unlike algorithms like Bubble Sort or Merge Sort, it doesn't compare elements to each other. Instead, it counts the occurrences of each unique element and uses those counts to determine the sorted positions.

This specific implementation works in the following steps:

Find Range: Determine the minimum (min) and maximum (max) values in the input array. The size of the auxiliary counting array will be the range = max - min + 1. This step allows the algorithm to handle negative numbers by shifting the index space.

Count Frequencies:

Initialize a counting_array of size range to zeros (using calloc).

Iterate through the input array (arr). For each element x, increment the count at index x−min in the counting_array. The index x−min effectively maps all numbers in the input array to the non-negative index space of the counting array.

Construct Sorted Array:

Iterate through the counting_array from index i=0 to range−1.

For each index i, retrieve its count (the number of times the value i+min appeared in the input array).

Append the actual value (i+min) to the result array as many times as its count.

Finalize: Copy the elements from the result array back into the original array and free the auxiliary memory used for the counting and result arrays.

⚙️ Supporting Functions
The sorting logic relies on several helper functions:

Function	Purpose
find_max(int* arr, size_t size)	Scans the array and returns the largest integer value.
find_min(int* arr, size_t size)	Scans the array and returns the smallest integer value. Critical for range calculation.
create_array(size_t size)	A safe wrapper around calloc that allocates memory for size integers. It includes error checking using perror and exit if allocation fails.

🚀 Time and Space Complexity
Counting Sort is known for its linear time complexity, making it extremely fast for sorting integers within a reasonable range.

Complexity Type	Value	Notes
Time Complexity	O(n+k)	n is the number of elements, and k is the range of the input (k=max−min+1). If k is small (i.e., k≈n), the performance is linear, O(n).
Space Complexity	O(n+k)	Extra space is required for the counting_array (O(k)) and the result_array (O(n)).


Sorting Algorithm: Stable Counting Sort (Full Implementation) 🚀
This repository contains a robust C implementation of the Counting Sort algorithm. This version is designed to be stable (preserving the relative order of equal elements) and can handle integers within a range that includes both positive and negative values.

🧠 How Stable Counting Sort Works
Counting Sort is a linear-time O(n+k) sorting algorithm suitable for integers. This implementation performs three main phases to achieve stability and correctness:

1. Range Determination and Frequency Count (Initial Pass)
The functions find_min and find_max are used to find the range of values present in the input array. The range k=max−min+1 determines the size of the auxiliary counting array.

The first loop iterates through the input array and counts the occurrences of each element. The index into the counting_array is calculated by offsetting the element's value by min: index=arr[i]−min. This handles negative numbers by mapping them to non-negative indices.

2. Cumulative Count Calculation (Prefix Sum)
The second loop modifies the counting_array so that each index i stores the number of elements less than or equal to the value i+min.

This is achieved by calculating a prefix sum: counting_array[i]=counting_array[i]+counting_array[i−1]. After this step, counting_array[i] gives the correct position of the last occurrence of the value i+min in the final sorted array.

3. Stable Placement (Final Pass)
The third loop iterates through the input array backwards (from size−1 to 0). This backward iteration is crucial for ensuring the stability of the sort.

For each element elem:

It uses the cumulative count counting_array[elem−min] to find the element's correct final position.

It places elem into that position in the result_array.

It decrements the count in the counting_array. This makes the next identical element placed at the position immediately before the current one, thus preserving their original order (stability).

Finally, the sorted elements are copied from the result_array back to the original array, and auxiliary memory is freed.

⚙️ Supporting Functions
The code includes robust utility functions for memory management and array analysis:

Function	Purpose
find_min / find_max	Determine the numeric range (k) of the data.
create_array	A safe memory allocation wrapper using calloc (initializes to zero) and includes errno error checking and exit on failure.

🚀 Time and Space Complexity
Counting Sort's performance is highly dependent on the range of values (k) relative to the number of elements (n).

Complexity Type	Value	Notes
Time Complexity	O(n+k)	n is the number of elements, and k=max−min+1 is the range. If k is small, the sort runs in linear time O(n).
Space Complexity	O(n+k)	Extra space is required for the counting_array (O(k)) and the result_array (O(n)).
