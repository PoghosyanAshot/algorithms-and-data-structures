#include <stdio.h>

void insertion_sort(int*, size_t);

int main(int argc, char *argv[])
{
    return 0;
}

void insertion_sort(int* arr, size_t size)
{
    int key = 0;
    int j = 0;

    for (int i = 1; i < size; ++i) {
        key = arr[i];
        j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }

        arr[j + 1] = key;
    }

    return;
}
