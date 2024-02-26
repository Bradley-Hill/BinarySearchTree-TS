# Binary Search Tree Implementation in TypeScript

This project is a simple implementation of a Binary Search Tree (BST) in TypeScript. It includes a `BinarySearchTree` class and a `createTreeNode` function for creating nodes.

## Files

- `BinarySearchTree.ts`: This file contains the `BinarySearchTree` class, which represents a BST. The class includes methods for adding elements, checking if an element exists in the tree, and printing the tree.

- `nodeFactory.ts`: This file contains the `createTreeNode` function, which creates a new tree node.

## Usage

To use this project, you first need to import the `BinarySearchTree` class and the `createTreeNode` function:

```typescript
import { BinarySearchTree } from "./BinarySearchTree";
import { createTreeNode } from "./nodeFactory";
```

Then, you can create a new BST and add elements to it:

```typescript
let bst = new BinarySearchTree();
bst.add(3);
bst.add(7);
// etc.
```

You can check if an element exists in the BST:

```typescript
console.log(bst.exists(3)); // prints: true
console.log(bst.exists(10)); // prints: false
```

And you can print the BST:

```typescript
bst.prettyPrint();
```

## Requirements

This project requires Node.js and TypeScript.

To install the dependencies, run:

```bash
npm install
```

To compile the TypeScript files to JavaScript, run:

```bash
tsc
```

To run the JavaScript files with Node.js, run:

```bash
node BinarySearchTree.js
```

Et Voila, a pretty decent Binary Search Tree (If I do say so myself...)!
