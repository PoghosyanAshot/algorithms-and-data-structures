function merge_sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = arr.length / 2;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sort_left = merge_sort(left);
    const sort_right = merge_sort(right);

    return merge(sort_left, sort_right);
}

function merge(left, right) {
    const result = [];
    const left_size = left.length;
    const right_size = right.length;
    
    let i = 0;
    let j = 0;
    let k = 0;

    while (i < left_size && j < right_size) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
            continue;
        }

        result[k++] = right[j++];
    }

    while (i < left_size) {
        result[k++] = left[i++];
    }

    while (j < right_size) {
        result[k++] = right[j++];
    }

    return result;
}
