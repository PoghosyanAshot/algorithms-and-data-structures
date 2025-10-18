class Stack {
    #stack = null;
    #size = 0;
    #cap;

    constructor(cap) {
        if (typeof cap !== "number") {
            throw new ERROR("invalid cappacity");
        }

        this.#stack = new Array(cap);
        this.#stack.length = 0;
        this.#cap = cap;
    }

    // interface

    is_empty() {
        return this.#size === 0;
    }

    // push & pop

    push(val) {
        if (this.#size === this.#cap) {
            throw new ERROR("Maximum stack size");
        }

        this.#stack.push(val);
        ++this.#size;
    }

    pop() {
        if (this.is_empty()) {
            throw new ERROR("empty stack");
        }

        --this.#size;
        return this.#stack.pop();
    }

    peek() {
        return this.#stack[this.#size - 1];
    }
}

try {
    const stack = new Stack(5); // create stack with capacity 5

    stack.push(10);
    stack.push(20);
    stack.push(30);

    console.log("Top element:", stack.peek()); // Output: 30
    console.log("Is empty:", stack.is_empty()); // Output: false

    console.log("Popped:", stack.pop()); // Output: 30
    console.log("Popped:", stack.pop()); // Output: 20

    console.log("Top element now:", stack.peek()); // Output: 10
} catch (err) {
    console.error("Error:", err.message);
}
