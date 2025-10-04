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

    sort(cmp = (a, b) => a - b) {
        const merge_sort = (head, cmp) => {
            if (!head || !head.next) {
                return head;
            }

            let slow = head;
            let fast = head.next;

            while (fast && fast.next) {
                slow = slow.next;
                fast = fast.next.next;
            }

            const mid = slow.next;
            slow.next = null;

            const left = merge_sort(head, cmp);
            const right = merge_sort(mid, cmp);

            return merge(left, right, cmp);
        }

        const merge = (left, right, cmp) => {
            const dummy = new Node(null);           
            let current = dummy;
            
            while (left && right) {
                if (cmp(left.value, right.value) <= 0) {
                    current.next = left;
                    left = left.next;
                } else {
                    current.next = right;
                    right = right.next;
                }

                current = current.next;
            }

            current.next = left || right;

            return dummy.next;
        }
        
        this.#head = merge_sort(this.#head, cmp);

        return;
    }

    merge(list, cmp = (a, b) => a - b) {
        const is_sorted = list => {
            if (!list || !list.next) {
                return true;
            }

            if (cmp(1, 2) <= 0) {
                while (list.next) {
                    if (cmp(list.value, list.next.value) > 0) {
                        return false;
                    }

                    list = list.next;
                }
            } else {
                while (list.next) {
                    if (cmp(list.next.value, list.value) <= 0) {
                        return false;
                    }
                    
                    list = list.next;
                }
            }

            return true;
        }

        if (!is_sorted(this.#head) || !is_sorted(list.#head)) {
            throw new ERROR("Can not merge unsorted list");
        }

        const dummy = new Node(null);
        let current = dummy;

        if (cmp(1, 2) <= 0) {
            while (this.#head && list.#head) {
                if (cmp(this.#head.value, list.#head.value) <= 0) {
                    current.next = this.#head;
                    this.#head = this.#head.next;
                    current = current.next;
                } else {
                    current.next = list.#head;
                    list.#head = list.#head.next;
                    current = current.next;
                }
            }
        } else {
            while (this.#head && list.#head) {
                if (cmp(list.#head.value, this.#head.value) > 0) {
                    current.next = this.#head;
                    this.#head = this.#head.next;
                } else {
                    current.next = list.#head;
                    list.#head = list.#head.next;
                }
                
                current = current.next;
            }
        }

        current.next = this.#head || list.#head;

        this.#head = dummy.next;

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

const l2 = new SinglyLinkedList([1, 2, 3]);

list.merge(l2); // merge two sorted lists

console.log('Merged  list', [...list]); // list is now: 1 -> 2 -> 3 -> 10 -> 20 -> 30 -> 40
