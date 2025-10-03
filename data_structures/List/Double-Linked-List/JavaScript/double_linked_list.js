class Node {
    constructor (value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoubleLinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    // constant values

    #EMPTY = 0;
    #FIRST_INDEX = 0;
    #ONE_ELEMENT = 1;
    #LAST_ELEMENT_OFFSET = 1;

    constructor(iterables) {
        if (!iterables) {
            return;
        }

        if (typeof iterables[Symbol.iterator] === "function") {
            for (const item of iterables) {
                this.push_back(item);
            }

            return;
        }

        this.push_back(iterables);
        return;
    }
    
    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === this.#EMPTY;
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = this.#EMPTY;

        return;
    }

    // front & back access

    front() {
        return this.#head.value;
    }
    
    back() {
        return this.#tail.value;
    }

    // push & pop

    push_front(value) {
        if (this.isEmpty()) {
            this.#head = new Node(value);
            this.#tail = this.#head;
            ++this.#size;
            
            return;
        }     

        const n = new Node(value);
        
        n.next = this.#head;
        this.#head.prev = n;
        this.#head = n;

        ++this.#size;

        return;
    }

    push_back(value) {
        if (this.isEmpty()) {
            this.#head = new Node(value);
            this.#tail = this.#head;
            ++this.#size;

            return;
        }

        const n = new Node(value);
        
        this.#tail.next = n;
        n.prev = this.#tail;        
        this.#tail = n;
        
        ++this.#size;
        return;
    }

    pop_front() {
        if (this.isEmpty()) {
            return;
        }

        if (this.#size === this.#ONE_ELEMENT) {
            const item = this.#head.value;
            
            this.#head = null;
            this.#tail = null;
            --this.#size;

            return item;
        }
        
        const item = this.#head.value;
        
        this.#head = this.#head.next;
        this.#head.prev = null;
        --this.#size;
        
        return item;
    }

    pop_back() {
        if (this.isEmpty()) {
            return;
        }

        if (this.#size === this.#ONE_ELEMENT) {
            const item = this.#head.value;
            
            this.#head = null;
            this.#tail = null;
            --this.#size;

            return item;
        }

        const item = this.#tail.value;
        
        this.#tail = this.#tail.prev;
        this.#tail.next = null;
        --this.#size;

        return item;
    }

    // random-like operations

    at(index) {
        if (index < this.#FIRST_INDEX && index >= this.#size) {
            return;
        }
        
        if (index === this.#FIRST_INDEX) {
            return this.front();
        }

        if (index === this.#size - this.#LAST_ELEMENT_OFFSET) {
            return this.back();
        }

        let left_index = this.#FIRST_INDEX;
        let right_index = this.#size - this.#LAST_ELEMENT_OFFSET;

        let left_node = this.#head;
        let right_node = this.#tail;

        while (left_index <= right_index) {
            if (left_index === index) {
                return left_node.value;
            }

            if (right_index === index) {
                return right_node.value;
            }

            ++left_index;
            --right_index;

            left_node = left_node.next;
            right_node = right_node.prev;
        }

        return;
    }

    insert(index, value) {
        if (index < this.#FIRST_INDEX || index > this.#size) {
            return;
        }

        if (index === this.#FIRST_INDEX) {
            this.push_front(value);
            return;
        }

        if (index === this.#size) {
            this.push_back(value);
            return;
        }

        let left_index = this.#FIRST_INDEX;
        let right_index = this.#size - this.#LAST_ELEMENT_OFFSET;

        let left_node = this.#head;
        let right_node = this.#tail;

        while (left_index <= right_index) {
            if (left_index === index) {
                const n = new Node(value);

                n.prev = left_node.prev;
                n.next = left_node;
                
                n.prev.next = n;
                n.next.prev = n;

                return;
            }

            if (right_index === index) {
                const n = new Node(value);

                n.prev = right_node.prev;
                n.next = right_node;
                
                n.prev.next = n;
                n.next.prev = n;

                return;
            }

            ++left_index;
            --right_index;

            left_node = left_node.next;
            right_node = right_node.prev;
        }

        return;
    }

    erase(index) {
        if (index < this.#FIRST_INDEX ||index >= this.#size) {
            return;
        }

        if (index === this.#FIRST_INDEX) {
            return this.pop_front();
        }

        if (index === this.#size - this.#LAST_ELEMENT_OFFSET) {
            return this.pop_back();
        }

        let left_index = this.#FIRST_INDEX;
        let right_index = this.#size - this.#LAST_ELEMENT_OFFSET;
        
        let left_node = this.#head;
        let right_node = this.#tail;

        while (left_index <= right_index) {
            if (left_index === index) {
                const item = left_node.value;
                
                left_node.prev.next = left_node.next;
                left_node.next.prev = left_node.prev;

                left_node.next = null;
                left_node.prev = null;
                
                return item;
            }

            if (right_index === index) {
                const item = right_node.value;
                
                right_node.prev.next = right_node.next;
                right_node.next.prev = right_node.prev;

                right_node.next = null;
                right_node.prev = null;

                return item;
            }

            ++left_index;
            --right_index;

            left_node = left_node.next;
            right_node = right_node.prev;
        }

        return;
    }

    remove(value, equals = Object.is) {
        let curent = this.#head;
        let delete_count = 0;

        while (curent) {
            if (equals(value, curent.value)) {
                
                let n = curent;
                curent = curent.next;

                if (n === this.#head) {
                    this.pop_front();
                    ++delete_count;

                    continue;
                }

                if (n === this.#tail) {
                    this.pop_back();
                    ++delete_count;

                    continue;
                }
                
                n.prev.next = n.next;
                n.next.prev = n.prev;

                n.next = null;
                n.prev = null;
                
                ++delete_count;

                continue;
            }

            curent = curent.next;
        }

        return delete_count;
    }

    reverse() {
        if (this.#size === this.#ONE_ELEMENT) {
            return;
        }

        let curent = this.#head;
        let tmp = null;

        tmp = this.#head;
        this.#head = this.#tail;
        this.#tail = tmp;

        while (curent) {
            tmp = curent.prev;
            curent.prev = curent.next;
            curent.next = tmp;

            curent = curent.prev;
        }

        return;
    }
}
