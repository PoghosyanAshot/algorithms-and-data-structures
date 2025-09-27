#include <stdio.h>

void selection_sort(int*, size_t);

int main(int argc, char *argv[])
{
    return 0;
}

void selection_sort(int* arr, size_t size) 
{
    int min_index = 0;

    for (int i = 0; i < size - 1; ++i) {
        min_index = i;

        for (int j = i + 1; j < size; ++j) {
            if (arr[min_index] > arr[j]) {
                min_index = j;
            }
        }

        if (min_index != i) {
            arr[min_index] ^= arr[i];
            arr[i] ^= arr[min_index];
            arr[min_index] ^= arr[i];
        }
    }

    return;
}
