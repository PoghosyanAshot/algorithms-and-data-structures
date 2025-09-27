Sorting Algorithm: Insertion Sort
This repository contains a C implementation of the Insertion Sort algorithm, which efficiently sorts an array of integers in ascending order.

🧠 How Insertion Sort Works
Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It's much like sorting a hand of playing cards:

Iterative Process: The array is conceptually divided into a sorted portion (initially containing just the first element) and an unsorted portion.

Selection and Key: The algorithm iterates through the array, starting with the second element (i=1). In each iteration, it selects the current element from the unsorted part—this is the key.

Shifting: It then compares the key with elements in the sorted portion (moving backward from i−1). If an element in the sorted part is greater than the key, it is shifted one position to the right. This creates a space for the key.

Insertion: The shifting continues until a position is found where the element to the left is less than or equal to the key. The key is then inserted into this newly created slot, expanding the sorted portion by one element.

This process repeats until all elements from the unsorted portion have been inserted into their correct place in the sorted portion.

⚙️ Code Implementation Details
The core logic is found within the insertion_sort function:

C

void insertion_sort(int* arr, size_t size) {
    // ...
    for (int i = 1; i < size; ++i) { // i: Start from the second element (the first element is the initial sorted list)
        key = arr[i];                // 1. Select the current element (the 'key') to be inserted
        j = i - 1;                   // j: Start comparing with the last element of the sorted portion
        
        // 2. Shift elements in the sorted portion that are larger than the key
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];     // Shift the larger element to the right
            --j;
        }

        arr[j + 1] = key;            // 3. Insert the key into its correct position
    }
    // ...
}
🚀 Time Complexity
Insertion Sort is generally preferred over Bubble Sort or Selection Sort for smaller datasets or for arrays that are already substantially sorted.

Case	Time Complexity
Worst-Case (Reverse-sorted array)	O(n 
2
 )
Average-Case	O(n 
2
 )
Best-Case (Already sorted array)	O(n)

