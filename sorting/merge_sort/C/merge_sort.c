#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

void* create_array(size_t);

void merge(int*, size_t, size_t, size_t);

void merge_sort(int*, size_t, size_t);

int main(int argc, char *argv[])
{
    return 0;
}

void* create_array(size_t size)
{
    void* res = malloc(size);

    if (!res) {
        perror("");
        exit(errno);
    }

    return res;
}

void merge(int* arr, size_t left, size_t mid, size_t right)
{
    int left_size = mid - left + 1;
    int right_size = right - mid;

    int* left_arr = (int*) create_array(sizeof(int) * left_size);
    int* right_arr = (int*) create_array(sizeof(int) * right_size);

    for (int i = 0; i < left_size; ++i) {
        left_arr[i] = arr[i + left];
    }

    for (int i = 0; i < right_size; ++i) {
        right_arr[i] = arr[mid + 1 + i];
    }

    int i = 0;
    int j = 0;
    int k = left;

    while (i < left_size && j < right_size) {
        if (left_arr[i] <= right_arr[j]) {
            arr[k++] = left_arr[i++];
            continue;
        }

        arr[k++] = right_arr[j++];
    }

    while (i < left_size) {
        arr[k++] = left_arr[i++];
    }

    while (j < right_size) {
        arr[k++] = right_arr[j++];
    }

    free(left_arr);
    free(right_arr);

    left_arr = NULL;
    right_arr = NULL;

    return;
}

void merge_sort(int* arr, size_t left, size_t right)
{
    if (left >= right) {
        return;
    }

    int mid = left + (right - left) / 2;

    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);

    merge(arr, left, mid, right);
}
