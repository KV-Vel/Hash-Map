import LinkedList from "./linkedList.mjs";

class HashMap {
    constructor() {
        this.capacity = 16;
        this.LOADFACTOR = 0.75;
        this.growTime = this.capacity * this.LOADFACTOR;

        this.size = 0;

        this.buckets = new Array(this.capacity);
    }

    #reHash = () => {
        this.capacity = this.capacity * 2;

        const oldEntries = this.entries();

        this.clear();
        this.growTime = this.capacity * this.LOADFACTOR;

        oldEntries.forEach((entry) => {
            let [oldKey, oldValue] = entry;
            this.set(oldKey, oldValue);
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

    set = (key, value) => {
        const hashedKey = this.hash(key);

        if (!this.buckets[hashedKey]) {
            const linkedList = new LinkedList();
            linkedList.append(key, value);
            this.size += 1;
            this.buckets[hashedKey] = linkedList;
        } else {
            const linkedList = this.buckets[hashedKey];
            if (!this.get(key)) this.size += 1;
            linkedList.append(key, value);
        }

        if (this.size > this.growTime) this.#reHash();
    };

    get = (key) => {
        const hashedKey = this.hash(key);

        if (this.buckets[hashedKey]) {
            let linkedListHead = this.buckets[hashedKey].head;

            while (linkedListHead) {
                if (linkedListHead.key === key) return linkedListHead.value;
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

    values = () => {
        const result = [];

        const nonEmptyLists = this.buckets.filter(
            (linkedList) => linkedList.head
        );

        nonEmptyLists.forEach((list) => {
            let tmp = list.head;

            while (tmp) {
                result.push(tmp.value);
                tmp = tmp.next;
            }
        });

        return result;
    };

    entries = () => {
        const result = [];

        const nonEmptyLists = this.buckets.filter(
            (linkedList) => linkedList.head
        );

        nonEmptyLists.forEach((list) => {
            let tmp = list.head;

            while (tmp) {
                result.push([tmp.key, tmp.value]);
                tmp = tmp.next;
            }
        });

        return result;
    };
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
