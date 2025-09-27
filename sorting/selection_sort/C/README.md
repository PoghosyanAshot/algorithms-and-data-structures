Sorting Algorithm: Selection Sort
This repository contains a C implementation of the Selection Sort algorithm, which efficiently sorts an array of integers in ascending order.

🧠 How Selection Sort Works
Selection Sort is a straightforward comparison-based sorting algorithm. It works by repeatedly finding the minimum element from the unsorted part of the array and putting it at the beginning of the sorted part.

The process is as follows:

Iterate Through the Array: The algorithm divides the input list into two parts: a sorted sublist, which is built up from left to right at the beginning of the array, and an unsorted sublist, containing the remaining elements.

Find the Minimum: In each iteration of the outer loop (controlled by i), the algorithm scans the unsorted sublist to find the absolute smallest element. The index of this smallest element is tracked using min_index.

Swap to Position: Once the minimum element in the unsorted sublist is found, it is swapped with the element at the beginning of the unsorted sublist (position i). This effectively moves the smallest element to its correct, final sorted position.

Repeat: The boundary between the sorted and unsorted parts shifts one position to the right, and the process repeats until the entire array is sorted.

Selection sort makes the most number of comparisons among O(n 
2
 ) sorting algorithms, but minimizes the number of swaps, making it potentially useful where memory write operations are significantly more expensive than read operations.

⚙️ Code Implementation Details
The core logic is found within the selection_sort function:

C

void selection_sort(int* arr, size_t size) {
    // ...
    for (int i = 0; i < size - 1; ++i) { // i: Marks the boundary of the sorted list
        min_index = i; // Assume the current element is the smallest
        
        // 1. Find the index of the minimum element in the remaining unsorted part
        for (int j = i + 1; j < size; ++j) {
            if (arr[min_index] > arr[j]) {
                min_index = j; // Update min_index if a smaller element is found
            }
        }

        // 2. Swap the found minimum element with the element at position 'i'
        if (min_index != i) {
            // XOR Swap Trick is used here to exchange arr[min_index] and arr[i]
            arr[min_index] ^= arr[i];
            arr[i] ^= arr[min_index];
            arr[min_index] ^= arr[i];
        }
    }
    // ...
}
The XOR Swap Trick
The code uses the XOR swap trick to exchange two elements without needing a temporary variable. This is a common, though sometimes debated, technique for performing a swap operation in C.

🚀 Time Complexity
Selection Sort has a consistent performance profile across various input types because it always performs O(n 
2
 ) comparisons, regardless of the initial state of the array.

Case	Time Complexity
Worst-Case (Reverse-sorted array)	O(n 
2
 )
Average-Case	O(n 
2
 )
Best-Case (Already sorted array)	O(n 
2
 )

