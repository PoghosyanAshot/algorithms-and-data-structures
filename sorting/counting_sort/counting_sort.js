function counting_sort(arr) {
    const size = arr.length;
    
    const min_element = Math.min(...arr);
    const max_element = Math.max(...arr);
    
    const range = max_element - min_element + 1;
    
    const counting_array = new Array(range).fill(0);

    for (let i = 0; i < size; ++i) {
        ++counting_array[arr[i] - min_element];
    }

    const sort_array = [];
    let k = 0;

    for (let i = 0; i < range; ++i) {
        while (counting_array[i]--) {
            sort_array[k++] = i + min_element;
        }        
    }

    return sort_array;
}
