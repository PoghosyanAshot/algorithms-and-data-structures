class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(cap) {
        if (typeof cap !== "number" || cap <= 0) {
            throw new Error("Invalid capacity");
        }

        this.#queue = new Array(cap);
        this.#cap = cap;
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    is_full() {
        return this.#size === this.#cap;
    }

    enqueue(value) {
        if (this.is_full()) {
            throw new Error("Queue overflow");
        }

        this.#back = (this.#back + 1) % this.#cap;
        this.#queue[this.#back] = value;
        ++this.#size;
    }

    dequeue() {
        if (this.is_empty()) {
            throw new Error("Queue underflow");
        }

        const value = this.#queue[this.#front];
        this.#queue[this.#front] = undefined; // cleanup reference
        this.#front = (this.#front + 1) % this.#cap;
        --this.#size;
        return value;
    }

    peek() {
        if (this.is_empty()) {
            return null;
        }
        return this.#queue[this.#front];
    }

    print() {
        if (this.is_empty()) {
            console.log("Queue is empty");
            return;
        }

        let output = [];
        for (let i = 0; i < this.#size; ++i) {
            const idx = (this.#front + i) % this.#cap;
            output.push(this.#queue[idx]);
        }
        console.log(output);
    }
}

module.exports = { Queue };

try {
    const q = new Queue(5);

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.print(); // [10, 20, 30]

    console.log("Front:", q.peek()); // 10
    console.log("Dequeued:", q.dequeue()); // 10
    console.log("Dequeued:", q.dequeue()); // 20

    q.enqueue(40);
    q.enqueue(50);
    q.enqueue(60);
    q.enqueue(70); // Queue now full

    q.print(); // [30, 40, 50, 60, 70]
    console.log("Size:", q.size()); // 5
    console.log("Full?", q.is_full()); // true

    console.log("Dequeued:", q.dequeue()); // 30
    q.print(); // [40, 50, 60, 70]
} catch (err) {
    console.error("❌ Error:", err.message);
}
