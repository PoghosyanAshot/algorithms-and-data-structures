const quick_sort = (nums, left = 0, right = nums.length - 1) => {
    if (left < right) {
        const pivot_index = medianOfThree(nums, left, right);
        const partition_index = partition(nums, left, right, pivot_index);

        quick_sort(nums, left, partition_index - 1);
        quick_sort(nums, partition_index + 1, right);
    }

    return nums;
}

const medianOfThree = (nums, left, right) => {
    const mid = ((left + right) / 2) >> 0;

    if (nums[left] > nums[mid]) {
        swap(nums, left, mid);
    }

    if (nums[left] > nums[right]) {
        swap(nums, left, right);
    }

    if (nums[mid] > nums[right]) {
        swap(nums, mid, right);
    }

    swap(nums, mid, right - 1);
    
    return right - 1;
}

const partition = (nums, left, right, pivot_index) => {
    const pivot = nums[pivot_index];
    swap(nums, pivot_index, right - 1);

    let idx = left;

    for (let i = left; i < right; ++i) {
        if (nums[i] < pivot) {
            swap(nums, i, idx);
            ++idx;
        }
    }

    swap(nums, idx, right - 1);
    return idx;
}

const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}
