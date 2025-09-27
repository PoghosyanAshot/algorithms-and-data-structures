#include <stdio.h>
#include <stdbool.h>

void bubble_sort(int*, size_t);

int main(int argc, char *argv[])
{
    return 0;
}

void bubble_sort(int* arr, size_t size) 
{
    bool is_sorted = false;

    for (int i = 0; i < size; ++i) {
        is_sorted = true;

        for (int j = 0; j < size - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                arr[j] ^= arr[j + 1];
                arr[j + 1] ^= arr[j];
                arr[j] ^= arr[j + 1];

                is_sorted = false;
            }
        }

        if (is_sorted) {
            break;
        }
    }

    return;
}
