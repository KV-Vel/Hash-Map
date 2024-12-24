class Node {
    constructor(key = null, next = null) {
        this.key = key;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.numberOfNodes = 0;
        this.head = null;
    }

    // adds a new node containing value to the end of the list
    append = (key) => {
        if (!this.head) {
            this.prepend(key);
        } else {
            let tmp = this.head;

            while (tmp.next) {
                if (tmp.key === key) {
                    tmp.key = key;
                    return;
                }

                tmp = tmp.next;
            }

            tmp.next = new Node(key);
            this.numberOfNodes += 1;
        }
    };

    // adds a new node containing value to the start of the list
    prepend = (key) => {
        const node = new Node(key);
        if (!this.head) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.numberOfNodes += 1;
    };

    // returns the total number of nodes in the list
    size = () => this.numberOfNodes;

    //  returns the first node in the list
    getHeadNode = () => this.head;

    // returns the last node in the list
    tail = () => {
        let tmp = this.head;

        while (tmp.next) {
            tmp = tmp.next;
        }

        return tmp;
    };

    // returns the index of the node containing value, or null if not found.
    find = (key) => {
        let tmp = this.head;
        let counter = 0;

        while (tmp) {
            if (tmp.key === key) return counter;
            tmp = tmp.next;
            counter += 1;
        }

        return null;
    };

    // removes the last element from the list
    pop = () => {
        let tmp = this.head;
        let prev = tmp;

        while (tmp.next) {
            prev = tmp;
            tmp = tmp.next;
        }

        prev.next = null;
        this.numberOfNodes -= 1;
    };

    // returns true if the passed in value is in the list and otherwise returns false.
    contains = (key) => {
        let tmp = this.head;

        while (tmp) {
            if (tmp.key === key) return true;

            tmp = tmp.next;
        }

        return false;
    };

    // represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString = () => {
        let str = "";
        let tmp = this.head;

        while (tmp.next) {
            str += `(${tmp.key}) -> `;
            tmp = tmp.next;
        }

        // Adding last element whose next === null;
        str += `(${tmp.key}) -> ${tmp.next}`;

        return str;
    };

    // that removes the node at the given index
    removeAt = (index) => {
        if (index >= this.numberOfNodes || index < 0)
            return "No such index in linked list";

        let counter = 0;
        let current = this.head;
        let prev = current;

        if (index === 0) {
            this.head = current.next;
            this.numberOfNodes -= 1;
            return;
        }

        if (index === this.numberOfNodes - 1) {
            this.pop();
            return;
        }

        while (counter !== this.numberOfNodes) {
            if (counter === index) {
                prev.next = current.next;
                this.numberOfNodes -= 1;
                return;
            }

            counter += 1;
            prev = current;
            current = current.next;
        }
    };
}

class HashSet {
    constructor() {
        this.capacity = 16;
        this.LOADFACTOR = 0.75;
        this.growTime = this.capacity * this.LOADFACTOR;

        this.size = 0;

        this.buckets = new Array(this.capacity);
    }

    #reHash = () => {
        this.capacity = this.capacity * 2;

        const oldEntries = this.keys();

        this.clear();
        this.growTime = this.capacity * this.LOADFACTOR;

        oldEntries.forEach((entry) => {
            this.set(entry);
        });
    };

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set = (key) => {
        const hashedKey = this.hash(key);

        if (!this.buckets[hashedKey]) {
            const linkedList = new LinkedList();
            linkedList.append(key);
            this.size += 1;
            this.buckets[hashedKey] = linkedList;
        } else {
            const linkedList = this.buckets[hashedKey];
            if (!this.get(key)) this.size += 1;
            linkedList.append(key);
        }

        if (this.size > this.growTime) this.#reHash();
    };

    get = (key) => {
        const hashedKey = this.hash(key);

        if (this.buckets[hashedKey]) {
            let linkedListHead = this.buckets[hashedKey].head;

            while (linkedListHead) {
                if (linkedListHead.key === key) return linkedListHead.key;
                linkedListHead = linkedListHead.next;
            }
        }

        return null;
    };

    has = (key) => {
        const hashedKey = this.hash(key);

        if (!this.buckets[hashedKey]) return false;

        return this.buckets[hashedKey].contains(key);
    };

    remove = (key) => {
        const hashedKey = this.hash(key);

        if (hashedKey < 0 || hashedKey >= this.capacity)
            throw new Error("Trying to access index out of bounds");
        else if (!this.buckets[hashedKey]) return false;

        const index = this.buckets[hashedKey].find(key);
        this.buckets[hashedKey].removeAt(index);

        // If no links remains linked list deleted
        if (!this.buckets[hashedKey].head) this.buckets[hashedKey] = null;

        this.size -= 1;
        return true;
    };

    length = () => this.size;

    clear = () => {
        this.buckets = new Array(this.capacity);
        this.size = 0;
    };

    keys = () => {
        const result = [];

        const nonEmptyLists = this.buckets.filter(
            (linkedList) => linkedList.head
        );

        nonEmptyLists.forEach((list) => {
            let tmp = list.head;

            while (tmp) {
                result.push(tmp.key);
                tmp = tmp.next;
            }
        });

        return result;
    };
}
const test = new HashSet();
test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
