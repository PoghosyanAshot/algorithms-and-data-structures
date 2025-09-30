class DynamicArray {
    #arr = null;
    #size = 0;
    #capacity = 0;
    #CAP_EXP = 2;
    
    constructor(cap = 0, fill = 0) {
        if (cap <= 0) {
            return;
        }
        
        this.#arr = new Uint32Array(cap);
        this.#capacity = cap;

        for (let i = 0; i < cap; ++i) {
            this.#arr[i] = fill;
        }
    }

    // capacity & size

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    empty() {
        return this.#size === 0;
    }

    reserve(n) {
        if (n <= this.#capacity) {
            return;
        }        

        const tmp = new Uint32Array(n);

        for (let i = 0; i < this.#size; ++i) {
            tmp[i] = this.#arr[i];
        }

        for (let i = this.#size; i < n; ++i) {
            tmp[i] = 0;
        }

        this.#arr = tmp;
        
        return;
    }

    shrinkToFit() {
        this.#capacity = this.#size;

        return;
    }

    clear() {
        this.#size = 0;

        return;
    }

    // element access

    at(i) {
        if (i >= this.#size) {
            throw new ERROR("Invalid index !!!");
        }

        return this.#arr[i];
    }

    set(i, value) {
        if (i >= this.#size) {
            throw new ERROR("Invalid index !!!");
        }

        if (typeof value !== "number") {
            throw new ERROR("Invalid type of value");
        }

        this.#arr[i] = value;
        
        return;
    }

    front() {
        return this.at(0);
    }

    back() {
        return this.at(this.#size - 1);
    }

    toArray() {
        return [...this.#arr];
    }

    // modifiers

    pushBack(value) {
        if (typeof value !== "number") {
            throw new ERROR("Invalid value");
        }

        if (this.#size >= this.#capacity) {
            this.#resize(this.#capacity * this.#CAP_EXP);
        }

        this.#arr[this.#size++] = value;

        return;
    }

    popBack() {
        return this.at(this.#size-- - 1);
    }

    insert(pos, value) {
        if (pos > this.#size || pos < 0) {
            throw new ERROR("Invalid index");
        }

        if (pos === this.#size || (pos === 0 && this.empty())) {
            this.pushBack(value);
            return;
        }

        if (this.#size >= this.#capacity) {
            this.#resize(this.#capacity * this.#CAP_EXP);
        }

        for (let i = this.#size - 1; i >= pos; --i) {
            this.#arr[i + 1] = this.#arr[i];
        }

        this.set(pos, value);
        ++this.#size;

        return;
    }

    erase(pos) {
        if (pos >= this.#size) {
            throw new ERROR("Invalid index");
        }

        for (let i = pos; i < this.#size - 1; ++i) {
            this.swap(i, i + 1);
        }

        --this.#size;

        return;
    }
    
    #resize(n, fill = 0) {
        const tmp = new Uint32Array(n);

        for (let i = 0; i < this.#size; ++i) {
            tmp[i] = this.at(i);
        }

        for (let i = this.#size; i < n; ++i) {
            tmp[i] = fill;
        }

        this.#capacity = n;
        this.#arr = tmp;

        return;
    }

    swap(i, j) {
        if (i >= this.#size || i < 0 || j >= this.#size || j < 0) {
            throw new ERROR("Invalid index");
        }

        const tmp = this.at(i);
        this.set(i, this.at(j));
        this.set(j, tmp);

        return;
    }

    // traversal && iteration

    [Symbol.iterator]() {
        const nums = this.#arr;
        const size = this.#size;
        let index = 0;

        return {
            next() {
                if (index < size) {
                    return {
                        value: nums[index++],
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

    values() {
        const nums = this.#arr;
        const size = this.#size;
        let index = 0;

        return {
            next() {
                if (index < size) {
                    return {
                        value: nums[index++],
                        done: false,
                    }
                }

                return {
                    value: undefined,
                    done: true,
                }
            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }

    keys() {
        const nums = this.#arr;
        const size = this.#size;
        let index = 0;

        return {
            next() {
                if (index < size) {
                    return {
                        value: index++,
                        done: false,
                    }
                }

                return {
                    value: undefined,
                    done: true,
                }
            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }

    entries() {
        const nums = this.#arr;
        const size = this.#size;
        const index = 0;

        return {
            next() {
                if (index < size) {
                    return {
                        value: [index, nums[index++]],
                        done: false,
                    }
                }

                return {
                    value: undefined,
                    done: true,
                }
            },

            [Symbol.iterator]() {
                return this;
            }
        }
    }

    // high-order methods

    forEach(fn, thisArg = this.#arr) {
        for (let i = 0; i < this.#size; ++i) {
            fn(this.at(i), i, thisArg);
        }

        return;
    }

    map(fn, thisArg = this.#arr) {
        const result = new DynamicArray(this.#size);  

        for (let i = 0; i < this.#size; ++i) {
            result.pushBack(fn(this.at(i), i, thisArg));
        }

        return result;
    }

    filter(fn, thisArg = this.#arr) {
        const result = new DynamicArray(this.#size);
        
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.at(i), i, thisArg)) {
                result.pushBack(this.at(i));
            }
        }  

        return result;
    }

    reduce(fn, initalValue) {
        let acamulator = initalValue;
        let st_index = 0;

        if (acamulator === undefined) {
            if (this.empty()) {
                throw new ERROR("empty array");
            }

            acamulator = this.at(0);
            st_index = 1;
        }

        for (let i = st_index; i < this.#size; ++i) {
            acamulator = fn(acamulator, this.at(i));
        }

        return acamulator;
    }

    some(fn, thisArg = this.#arr) {
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.at(i), i, thisArg)) {
                return true;
            }
        }

        return false;
    }

    every(fn, thisArg = this.#arr) {
        for (let i = 0; i < this.#size; ++i) {
            if (!fn(this.at(i), i, thisArg)) {
                return false;
            }
        }

        return true;
    }

    find(fn) {
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.at(i))) {
                return this.at(i);
            }
        }

        return;
    }

    findIndex(fn) {
        for (let i = 0; i < this.#size; ++i) {
            if (fn(this.at(i))) {
                return i;
            }
        }

        return -1;
    }

    includes(value) {
        for (let i = 0; i < this.#size; ++i) {
            if (this.at(i) === value) {
                return true;
            }
        }   

        return false;
    }
}

// test cases

const da = new DynamicArray(2);

da.pushBack(10);
da.pushBack(20);
da.pushBack(30); // triggers resize
da.insert(1, 99); // [10, 99, 20, 30]
da.erase(2); // [10, 99, 30]

console.log([...da]); // [10, 99, 30]
const squares = da.map(x => x * x);

console.log(squares.toArray()); // [100, 9801, 900]
const sum = da.reduce((acc, x) => acc + x, 0);

console.log(sum); // 139
