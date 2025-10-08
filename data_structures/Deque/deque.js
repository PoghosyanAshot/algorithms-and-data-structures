const Constants = {
    INIT_MAP_SIZE: 4,
    MIN_MAP_SIZE: 2,
    MIN_BUCKET_SIZE: 8,
    DIV_IN_TWO: 1,
    LAST_IDX_OFFSET: 1,
    IS_ODD: 1,
    CAST_INT: 0,
    START_INDEX: 0,
    EMPTY: 0,
    DOUBLE_THE_SIZE: 2,
}

class Deque {
    #map = null;
    #map_size;
    #head_bucket;
    #head_index;
    #tail_bucket;
    #tail_index;
    #bucket_size;
    #element_size;

    constructor(map_size = Constants.INIT_MAP_SIZE, bucket_size = Constants.MIN_BUCKET_SIZE) {
        if (map_size < Constants.MIN_MAP_SIZE) {
            throw new ERROR("Needed at least 2 maps");
        }

        bucket_size = bucket_size < Constants.MIN_BUCKET_SIZE ? Constants.MIN_BUCKET_SIZE : bucket_size;

        const mid = map_size >> Constants.DIV_IN_TWO;
        
        this.#map = new Array(map_size).fill(null);
        this.#head_bucket = mid - Constants.LAST_IDX_OFFSET;
        this.#tail_bucket = mid;
        this.#head_index = bucket_size - Constants.LAST_IDX_OFFSET;
        this.#tail_index = Constants.START_INDEX;
        this.#bucket_size = bucket_size;
        this.#map_size = map_size;
        this.#element_size = Constants.START_INDEX;
    }

    // functions about size      

    is_empty() {
        return this.#element_size === Constants.EMPTY;
    }

    size() {
        return this.#element_size;
    }

    // service functions
    
    clear() {
        const mid = this.#map_size >> Constants.DIV_IN_TWO;

        this.#map.fill(null);
        this.#head_bucket = mid - Constants.LAST_IDX_OFFSET;
        this.#tail_bucket = mid;
        this.#head_index = this.#bucket_size - Constants.LAST_IDX_OFFSET;
        this.#tail_index = Constants.START_INDEX;
        this.#element_size = Constants.START_INDEX;
    }

    to_array() {
        const res = [];
        const size = this.#element_size;

        for (let i = Constants.START_INDEX; i < size; ++i) {
            res.push(this.at(i));
        }

        return res;
    }
    
    // modifiers (insertion/deletion)

    push_back(value) {
        const pos = this.#copy_pos(this.#tail_bucket, this.#tail_index);
        this.#write(pos, value);
        this.#increment(pos);
        
        this.#tail_bucket = pos.block;
        this.#tail_index = pos.index;
        ++this.#element_size;
    }

    push_front(value) {
        const pos = this.#copy_pos(this.#head_bucket, this.#head_index);    
        this.#write(pos, value);
        this.#decrement(pos);
        
        this.#head_bucket = pos.block;
        this.#head_index = pos.index;
        ++this.#element_size;
    }
    
    pop_back() {
        if (this.is_empty()) {
            return;
        }
        
        const pos = this.#copy_pos(this.#tail_bucket, this.#tail_index);
        
        this.#decrement(pos);
        this.#tail_bucket = pos.block;
        this.#tail_index = pos.index;
        
        const return_value = this.#read(pos);
        
        this.#write(pos, null);
        --this.#element_size;
        
        return return_value;
    }

    pop_front() {
        if (this.is_empty()) {
            return;
        }

        const pos = this.#copy_pos(this.#head_bucket, this.#head_index);
        
        this.#increment(pos);
        this.#head_bucket = pos.block;
        this.#head_index = pos.index;

        const return_value = this.#read(pos);
        
        this.#write(pos, null);
        --this.#element_size;

        return return_value;
    }

    // access element
    
    at(index) {
        if (index < Constants.START_INDEX || index >= this.#element_size) {
            throw new ERROR("Invalid index");
        }

        const start_pos = this.#copy_pos(this.#head_bucket, this.#head_index);
        this.#increment(start_pos);
        
        const first_element_absolute_pos = (start_pos.block * this.#bucket_size) + start_pos.index;
        const target_element_absolute_pos = first_element_absolute_pos + index;
        const target_bucket = (target_element_absolute_pos / this.#bucket_size) >> Constants.CAST_INT;
        const target_index = target_element_absolute_pos % this.#bucket_size;

        return this.#map[target_bucket][target_index];
    }

    front() {
        const pos = this.#copy_pos(this.#head_bucket, this.#head_index);
        this.#increment(pos);

        return this.#map[pos.block][pos.index];
    }

    back() {
        const pos = this.#copy_pos(this.#tail_bucket, this.#tail_index);   
        this.#decrement(pos);

        return this.#map[pos.block][pos.index];
    }   

    // iterable
    
    [Symbol.iterator]() {
        const size = this.#element_size
        const dq = this;
        let idx = Constants.START_INDEX;
        
        return {
            next() {
                if (idx < size) {
                    return {
                        value: dq.at(idx++),
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
    
    // helper functions

    #copy_pos(block, idx) {
        return {block: block, index: idx};
    }

    #write(pos, value) {
        this.#ensure_map_exists(pos.block);
        this.#map[pos.block][pos.index] = value;
    }

    #read(pos) {
        return this.#map[pos.block][pos.index];
    }
    
    #ensure_map_exists(bucket_idx) {
        const map = this.#map[bucket_idx];

        if (!map) {
            this.#map[bucket_idx] = new Array(this.#bucket_size).fill(null);
        }
    }

    #increment(pos) {
        if (pos.index === this.#bucket_size - Constants.LAST_IDX_OFFSET) {
            if (pos.block === this.#map_size - Constants.LAST_IDX_OFFSET) {
                const offset = this.#resize();
                pos.block += offset;
            }

            ++pos.block;
            pos.index = Constants.START_INDEX;
        } else {
            ++pos.index;
        }
    }

    #decrement(pos) {
        if (pos.index === Constants.START_INDEX) {
            if (pos.block === Constants.START_INDEX) {
                const offset = this.#resize();
                pos.block += offset;
            }

            --pos.block;
            pos.index = this.#bucket_size - Constants.LAST_IDX_OFFSET;
        } else {
            --pos.index;
        }
    }

    #resize() {
        const new_size = this.#map_size * Constants.DOUBLE_THE_SIZE;
        const offset = ((new_size - this.#map_size) >> Constants.DIV_IN_TWO) >> Constants.CAST_INT;
        const new_map = new Array(new_size).fill(null);
        
        for (let i = Constants.START_INDEX; i < this.#map_size; ++i) {
            new_map[i + offset] = this.#map[i];
        }

        this.#map = new_map;
        this.#map_size = new_size;
        this.#head_bucket += offset;
        this.#tail_bucket += offset;
        
        return offset;
    }

    print() {
        for (let i = Constants.START_INDEX; i < this.#map_size; ++i) {
            const bucket = this.#map[i];

            if (!bucket) {
                continue;
            }

            const display = bucket
                .map(elem => elem === null ? '.' : elem)
                .join(' ');

            console.log(`bucket_${i}: [${display}]`);
        }        
    }
}

const dq = new Deque(4, 4); // map_size=4, bucket_size=4 for clear demonstration

console.log("## Initial State ##");
dq.print();

console.log("\n## Pushing Elements ##");
dq.push_back(10);
dq.push_back(20);
dq.push_front(5);
dq.push_front(1);
console.log("Current Array:", dq.to_array());
dq.print();

console.log("\n## Popping Elements ##");
const front_val = dq.pop_front();
const back_val = dq.pop_back();
console.log(`Popped from front: ${front_val}`); // 1
console.log(`Popped from back: ${back_val}`); // 20
console.log("Current Array:", dq.to_array());
dq.print();
