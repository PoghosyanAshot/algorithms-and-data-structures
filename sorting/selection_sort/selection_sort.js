function selection_sort(arr) {
    const size = arr.length;    

    for (let i = 0; i < size - 1; ++i) {
        let min_index = i;

        for (let j = i + 1; j < size; ++j) {
            if (arr[min_index] > arr[j]) {
                min_index = j;
            }
        }

        if (min_index !== i) {
            [arr[min_index], arr[i]] = [arr[i], arr[min_index]];
        }
    }

    return arr;
}
