import Node from "./node.mjs";

export default class LinkedList {
    constructor() {
        this.numberOfNodes = 0;
        this.head = null;
    }

    // adds a new node containing value to the end of the list
    append = (key, value) => {
        if (!this.head) {
            this.prepend(key, value);
        } else {
            let tmp = this.head;

            while (tmp.next) {
                if (tmp.key === key) {
                    tmp.value = value;
                    return;
                }

                tmp = tmp.next;
            }
            // Checking last node
            if (tmp.key === key) {
                tmp.value = value;
                return;
            }

            tmp.next = new Node(key, value);
            this.numberOfNodes += 1;
        }
    };

    // adds a new node containing value to the start of the list
    prepend = (key, value) => {
        const node = new Node(key, value);
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

    //  returns the node at the given index
    at = (index) => {
        let tmp = this.head;

        let counter = 0;
        while (tmp) {
            if (index === counter) break;
            counter += 1;
            tmp = tmp.next;
        }

        return tmp;
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

    // represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString = () => {
        let str = "";
        let tmp = this.head;

        while (tmp.next) {
            str += `(${tmp.value}) -> `;
            tmp = tmp.next;
        }

        // Adding last element whose next === null;
        str += `(${tmp.value}) -> ${tmp.next}`;

        return str;
    };

    /**
     * EXTRA credit
     */

    //  that inserts a new node with the provided value at the given index.
    insertAt = (key, value, index) => {
        if (index > this.numberOfNodes || index < 0)
            return "No such index in linked list";

        if (index === 0) {
            this.prepend(key, value);
            return;
        }

        if (index === this.numberOfNodes) {
            this.append(key, value);
            return;
        }

        let tmp = this.head;
        let prev = tmp;
        let counter = 0;

        while (counter <= this.numberOfNodes) {
            if (counter === index) {
                const newNode = new Node(key, value, tmp);
                prev.next = newNode;
                this.numberOfNodes += 1;
                return;
            }

            counter += 1;
            prev = tmp;
            tmp = tmp.next;
        }
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
