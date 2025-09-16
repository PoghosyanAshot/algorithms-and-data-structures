function bubble_sort(arr) {
    const size = arr.length;

    for (let i = 0; i < size; ++i) {
        for (let j = 1; j < size - i; ++j) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
    }

    return arr;
}
