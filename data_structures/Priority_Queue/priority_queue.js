class Priority_Queue {
    #heap = null;
    #cmp = null;
    #size = 0;

    #max_heap = false;
    #min_heap = false;

    constructor(cmp = (a, b) => a - b) {
        this.#heap = [];
        this.#cmp = cmp;

        if (typeof this.#cmp !== "function") {
            throw new Error("can not call compare function");
        }

        if (this.#cmp(1, 2) <= 0) {
            this.#min_heap = true;
        } else {
            this.#max_heap = true;
        }
    }

    // adding element

    add(value) {
        this.#heap.push(value);

        if (this.#min_heap) {
            this.#shift_up_for_min_heap(this.#size);
        } else {
            this.#shift_up_for_max_heap(this.#size);
        }

        ++this.#size;
    }

    // access element

    peek() {
        if (this.is_empty()) {
            return;
        }

        return this.#heap[0];
    }

    pop() {
        if (this.is_empty()) {
            return;
        }

        this.#swap(0, this.#size - 1);
        const return_value = this.#heap.pop();

        if (this.#min_heap) {
            this.#shift_down_for_min_heap(0);
        } else {
            this.#shift_down_for_max_heap(0);
        }

        --this.#size;

        return return_value;
    }

    // remove element

    remove(value) {
        const idx = this.#indexOf(value);

        if (idx >= 0) {
            this.#swap(idx, this.#size - 1);
            this.#heap.pop();

            if (this.#min_heap) {
                this.#shift_down_for_min_heap(idx);
            } else {
                this.#shift_down_for_max_heap(idx);
            }
        }
    }

    // managing the queue

    clear() {
        this.#heap = [];
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    toArray() {
        return [...this.#heap];
    }

    comporator() {
        return this.#cmp;
    }

    is_empty() {
        return this.#size === 0;
    }

    // helper functions

    #get_parrent(idx) {
        return ((idx - 1) / 2) >> 0;
    }

    #get_left_child(idx) {
        return 2 * idx + 1;
    }

    #get_right_child(idx) {
        return 2 * idx + 2;
    }

    #swap(i, j) {
        const tmp = this.#heap[i];
        this.#heap[i] = this.#heap[j];
        this.#heap[j] = tmp;
    }

    #shift_up_for_min_heap(idx) {
        const parrent = this.#get_parrent(idx);

        if (parrent < 0) {
            return;
        }

        if (this.#heap[idx] < this.#heap[parrent]) {
            this.#swap(idx, parrent);
            this.#shift_up_for_min_heap(parrent);
        }
    }

    #shift_up_for_max_heap(idx) {
        const parrent = this.#get_parrent(idx);

        if (parrent < 0) {
            return;
        }

        if (this.#heap[idx] > this.#heap[parrent]) {
            this.#swap(idx, parrent);
            this.#shift_up_for_max_heap(parrent);
        }
    }

    #shift_down_for_min_heap(idx) {
        const left_child = this.#get_left_child(idx);
        const right_child = this.#get_right_child(idx);

        let min = idx;

        if (this.#heap[left_child] < this.#heap[min]) {
            min = left_child;
        }

        if (this.#heap[right_child] < this.#heap[min]) {
            min = right_child;
        }

        if (min !== idx) {
            this.#swap(min, idx);
            this.#shift_down_for_min_heap(min);
        }
    }

    #shift_down_for_max_heap(idx) {
        const left_child = this.#get_left_child(idx);
        const right_child = this.#get_right_child(idx);

        let max = idx;

        if (this.#heap[left_child] > this.#heap[max]) {
            max = left_child;
        }

        if (this.#heap[right_child] > this.#heap[max]) {
            max = right_child;
        }

        if (max !== idx) {
            this.#swap(max, idx);
            this.#shift_down_for_max_heap(max);
        }
    }

    #indexOf(value) {
        for (let i = 0; i < this.#size; ++i) {
            if (this.#heap[i] === value) {
                return i;
            }
        }

        return -1;
    }
}

// Default = Min Heap
const minPQ = new Priority_Queue();

minPQ.add(5);
minPQ.add(2);
minPQ.add(9);
minPQ.add(1);

console.log("Heap array:", minPQ.toArray());
console.log("Top priority:", minPQ.peek()); // 1

console.log("Removed:", minPQ.pop()); // 1
console.log("Next top:", minPQ.peek()); // 2
console.log("Size:", minPQ.size()); // 3

minPQ.remove(5);
console.log("After removing 5:", minPQ.toArray());

// Max Heap Example
const maxPQ = new Priority_Queue((a, b) => b - a);
maxPQ.add(5);
maxPQ.add(10);
maxPQ.add(3);

console.log("\nMax Heap top:", maxPQ.peek()); // 10
console.log("Pop:", maxPQ.pop()); // 10
