function cumulative_counting_sort(arr) {
    const size = arr.length;

    const min_element = Math.min(...arr);
    const max_element = Math.max(...arr);

    const range = max_element - min_element + 1;

    const cumulative_counting_array = new Array(range).fill(0);

    for (let i = 0; i < size; ++i) {
        ++cumulative_counting_array[arr[i] - min_element];
    }
    
    for (let i = 1; i < range; ++i) {
        cumulative_counting_array[i] += cumulative_counting_array[i - 1];
    }

    const sort_array = new Array(size);

    for (let i = size - 1; i >= 0; --i) {
        const elem = arr[i];
        const index = cumulative_counting_array[elem - min_element]-- - 1;
        sort_array[index] = elem;
    }

    return sort_array;
}
