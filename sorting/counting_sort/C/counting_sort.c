#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

void* create_array(size_t);

int find_max(int*, size_t);

int find_min(int*, size_t);

void counting_sort(int*, size_t);

int main(int argc, char *argv[])
{
    return 0;
}

void* create_array(size_t size) 
{
    void* res = calloc(size, sizeof(int));

    if (!res) {
        perror("");        
        exit(errno);
    }

    return res;
}

int find_max(int* arr, size_t size) 
{
    int max = arr[0];

    for (int i = 1; i < size; ++i) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }

    return max;
}

int find_min(int* arr, size_t size) 
{
    int min = arr[0];

    for (int i = 1; i < size; ++i) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }

    return min;
}

void counting_sort(int* arr, size_t size)
{
    int min = find_min(arr, size);
    int max = find_max(arr, size);

    int range = max - min + 1;

    int idx = 0;
    int k = 0;

    int* counting_array = (int*) create_array(range);
    int* result_array = (int*) create_array(size);

    for (int i = 0; i < size; ++i) {
        idx = arr[i] - min;
        ++counting_array[idx];
    }

    for (int i = 0; i < range; ++i) {
        while (counting_array[i]--) {
            result_array[k++] = i + min;
        }
    }

    for (int i = 0; i < size; ++i) {
        arr[i] = result_array[i];
    }

    free(counting_array);
    free(result_array);

    counting_array = NULL;
    result_array = NULL;

    return;
}
