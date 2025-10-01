class Node {
    #value;
    #next = null;

    constructor(val = 0) {
        this.value = val;
    }

    get value() {
        return this.#value;
    }

    set value(val) {
        this.#value = val;
    }

    get next() { 
        return this.#next;
    }

    set next(new_node) {
        this.#next = new_node;
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;
    
    constructor(iterable) {
        if (!iterable) {
            return;
        }
        
        if (typeof iterable[Symbol.iterator] === "function") {
            let curent = null;
            
            for (const item of iterable) {
                if (!curent) {
                    this.push_back(item);
                    continue;
                }
                
                this.push_back(item);
            }

            return;
        }

        this.push_back(iterable);
    }

    // size modifires

    size() {
        return this.#size;   
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#head = null;
        this.#size = 0;

        return;
    }
    
    // front access

    front() {
        if (this.isEmpty()) {
            return;
        }

        return this.#head.value;
    }

    // push & pop

    push_front(val) {
        const tmp = this.#head;
        
        this.#head = new Node(val);
        this.#head.next = tmp;
        ++this.#size;

        return;
    }

    push_back(val) {
        if (this.isEmpty()) {
            this.#head = new Node(val);
            ++this.#size;
            return;
        }
        
        let curent = this.#head;

        while(curent.next) {
            curent = curent.next;
        }

        curent.next = new Node(val);
        ++this.#size;

        return;
    }

    pop_front() {
        if (this.isEmpty()) {
            return;
        }

        const tmp = this.#head;
        
        this.#head = this.#head.next;
        --this.#size;
        
        return tmp.value;
    }

    pop_back() {
        let is_one_element = true;
        
        if (this.isEmpty()) {
            return;
        }

        let curent = this.#head;
        let prev = null;

        while (curent.next) {
            prev = curent;
            curent = curent.next;
        }

        if (prev) {
            prev.next = null;
            is_one_element = false;
        }

        if (is_one_element) {
            this.#head = null;   
        }
        
        --this.#size;

        return curent.value;
    }

    // random-like operations

    at(index) {
        if (index >= this.#size || index < 0) {
            return;
        }

        let curent = this.#head;

        for (let i = 0; i < index; ++i) {
            curent = curent.next;
        }

        return curent.value;
    }

    insert(index, val) {
        if (index < 0 || index >= this.#size) {
            return;
        }

        if (index === 0) {
            this.push_front(val);
            return;
        }

        if (index === this.#size - 1) {
            this.push_back(val);
            return;
        }

        let curent = this.#head;
        let prev = null;

        for (let i = 0; i < index; ++i) {
            prev = curent;        
            curent = curent.next;
        }

        prev.next = new Node(val);
        prev.next.next = curent;

        ++this.#size;

        return;
    }

    erase(index) {
        if (index >= this.#size || index < 0) {
            return;
        }

        if (index === 0) {
            this.pop_front();
            
            return;
        }

        if (index === this.#size - 1) {
            this.pop_back();
            
            return;
        }

        let curent = this.#head;

        for (let i = 0; i < index - 1; ++i) {
            curent = curent.next;
        }

        curent.next = curent.next.next;

        --this.#size;

        return;
    }

    remove(value, equals) {
        const is_equals = equals && typeof equals === "function" ? true : false;

        let count = 0;

        for (let i = 0; i < this.#size; ++i) {
            if (is_equals) {
                if (equals(value, this.at(i))) {
                    this.erase(i);
                    --i;
                    ++count;
                }

                continue;
            }

            if (this.at(i) === value) {
                this.erase(i);
                --i;
                ++count;
            }

        }

        return count;
    }

    // algorithms

    reverse() {
        const reverse_list = head => {
            if (!head || !head.next) {
                return head;   
            }

            const return_value = reverse_list(head.next);

            head.next.next = head;
            head.next = null;

            return return_value;
        }

        this.#head = reverse_list(this.#head);

        return;
    }

    sort(compareFn = (a, b) => a - b) {
        const arr = this.toArray();

        const merge_sort = arr => {
            if (arr.length <= 1) {
                return arr;
            }
            
            const mid = (arr.length / 2) >> 0;

            const left = arr.slice(0, mid);
            const right = arr.slice(mid);

            const sorted_left = merge_sort(left);
            const sorted_right = merge_sort(right);

            return merge(sorted_left, sorted_right);
        }
        
        const merge = (left, right) => {
            const left_size = left.length;
            const right_size = right.length;
            const result = [];

            let i = 0;
            let j = 0;

            while (i < left_size && j < right_size) {
                if (compareFn(left[i], right[j]) <= 0) {
                    result.push(left[i++]);
                    continue;
                }

                result.push(right[j++]);
            }

            while (i < left_size) {
                result.push(left[i++]);
            }

            while (j < right_size) {
                result.push(right[j++]);
            }

            return result;
        }

        const sorted_list = new SinglyLinkedList(merge_sort(arr));
        this.#head = sorted_list.#head;

        return;
    }

    merge(list, compareFn = (a, b) => a - b) {
        const is_sorted = list => {
            if (list.size() <= 1) {
                return true;
            }
            
            list = list.toArray();
            const size = list.length;
            
            if (compareFn(1, 2) <= 0) {
                for (let i = 0; i < size - 1; ++i) {
                    if (compareFn(list[i], list[i + 1]) > 0) {
                        console.log("1");
                        return false;
                    }
                }
            } else {
                for (let i = 0; i < size; ++i) {
                    if (compareFn(list[i + 1], list[i]) <= 0) {
                        console.log("2");
                        return false;
                    }
                }
            }

            return true;
        }

        if (!is_sorted(this) || !is_sorted(list)) {
            throw new ERROR("Can not merge unsorted list");
        }

        const left = this.toArray();
        const right = list.toArray();

        const left_size = left.length;
        const right_size = right.length;
        
        const result = [];

        let i = 0;
        let j = 0;

        while (i < left_size && j < right_size) {
            if (compareFn(left[i], right[j]) <= 0) {
                result.push(left[i++]);
                continue;
            }
            
            result.push(right[j++]);
        }

        while (i < left_size) {
            result.push(left[i++]);
        }

        while (j < right_size) {
            result.push(right[j++]);
        }

        const merged_list = new SinglyLinkedList(result);

        this.#head = merged_list.#head;

        return;
    }
    
    // utilities

    toArray() {
        const result = [];
        let curent = this.#head;

        while (curent) {
            result.push(curent.value);       
            curent = curent.next;
        }

        return result;
    }

    static fromArray(arr) {
        return new SinglyLinkedList(arr);
    }

    // iteration
    
    [Symbol.iterator]() {
        let curent = this.#head;

        return {
            next() {
                if (curent) {
                    const val = curent.value;
                    curent = curent.next;

                    return {
                        value: val,
                        done: false,
                    }
                }

                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    }
}

const list = new SinglyLinkedList([10, 20, 30]);

list.push_front(5);    // list is now: 5 -> 10 -> 20 -> 30
list.push_back(40);    // list is now: 5 -> 10 -> 20 -> 30 -> 40
list.pop_front();      // list is now: 10 -> 20 -> 30 -> 40

// Access elements
console.log(`Element at index 1: ${list.at(1)}`);
console.log(`Front element: ${list.front()}`);

// The list is iterable
console.log('List contents:', [...list]);

// Algorithms
list.reverse();
console.log('Reversed list:', [...list]); 

list.sort();
console.log('Sorted list:', [...list]);
