Counting Sort

How It Works

Find Range:

min_element and max_element are determined using Math.min and Math.max to find the smallest and largest values in the input array arr.

range is calculated as max_element - min_element + 1. This represents the total number of possible integer values in the input array.

Create Counting Array:

counting_array is created with a size equal to range and all its elements are initialized to 0. This array will store the frequency of each element from the input array.

Count Occurrences:

The first for loop iterates through the input array arr.

For each element arr[i], its count is incremented in the counting_array. The index in counting_array is determined by subtracting min_element from arr[i]. This ensures that even if the input array contains negative numbers or starts from a large number, the counting_array indices remain non-negative and within its bounds.

Build Sorted Array:

A new array sort_array is initialized to store the sorted elements.

The second for loop iterates through the counting_array from index 0 to range - 1.

The while (counting_array[i]--) loop is the core of this step. It executes counting_array[i] times for each i.

Inside the while loop, the value i + min_element (which is the original element value corresponding to the current counting_array index) is added to the sort_array at the k-th position. The k index is then incremented. This process effectively places all occurrences of a number together in the sort_array in ascending order.

Return Sorted Array:

Finally, the sort_array, now containing the elements in sorted order, is returned.

Characteristics
Time Complexity: Counting Sort has a time complexity of O(n+k), where n is the number of elements in the input array and k is the range of input values (i.e., max_element - min_element + 1).

If k is significantly larger than n, Counting Sort might not be efficient.

However, if k is proportional to n (i.e., k=O(n)), then the time complexity becomes O(n), making it very efficient.

Space Complexity: The space complexity is O(k) because it requires an auxiliary counting_array whose size depends on the range of the input values.



Cumulative Counting Sort

How It Works

The algorithm operates in three main phases:

Count Phase: It creates a cumulative_counting_array to store the frequency of each element in the input arr. To handle non-zero or negative numbers, it first finds the minimum and maximum elements to determine the correct range. It then iterates through the input array and increments the count for each element's corresponding index in the cumulative_counting_array. For example, if the minimum element is 5, an occurrence of 7 will be counted at index 7 - 5 = 2.

Cumulative Sum Phase: This is the key difference from basic counting sort. The code iterates through the cumulative_counting_array and updates each index to be the sum of its current value and all previous values. This transforms the frequency array into a "position" array. After this step, cumulative_counting_array[i] tells you the final sorted position of the last occurrence of the element i + min_element.

Output Phase: It creates a new sort_array to store the sorted result. It then iterates through the original input array in reverse (i = size - 1; i >= 0). For each element elem from the input array:

It uses the cumulative_counting_array to find the correct sorted position for elem.

It places the element into that position in the sort_array.

It then decrements the count in the cumulative_counting_array. This ensures that if there are duplicate elements, the next one will be placed in the position just before it, preserving their relative order and making the sort stable.

Characteristics
Time Complexity: O(n+k), where n is the number of elements in the input array and k is the range of the elements (max_element−min_element). This makes it extremely fast when the range of numbers is not significantly larger than the number of elements.

Space Complexity: O(n+k), as it requires two additional arrays: cumulative_counting_array of size k and sort_array of size n.
