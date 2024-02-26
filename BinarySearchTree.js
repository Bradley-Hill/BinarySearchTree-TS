"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeFactory_1 = require("./nodeFactory");
function createBinaryTree(array) {
    if (!array || array.length === 0) {
        throw new Error("Input array is null,undefined or otherwise empty.");
    }
    let sortedArray = array.sort((a, b) => a - b);
    let uniqueArray = [...new Set(sortedArray)];
    let root = constructBinarySearchTree(uniqueArray, 0, uniqueArray.length - 1);
    let setRoot = function (newRoot) {
        root = newRoot;
    };
    let prettyPrint = function (node = root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.content}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    let insert = function (content) {
        root = insertAtNode(root, content);
    };
    // helper function to traverse tree and find leaf to insert new content
    function insertAtNode(node, content) {
        if (node === null) {
            return (0, nodeFactory_1.createTreeNode)(content, null, null);
        }
        else {
            if (content < node.content) {
                node.left = insertAtNode(node.left, content);
            }
            else if (content > node.content) {
                node.right = insertAtNode(node.right, content);
            }
            else {
                return node;
            }
            return node;
        }
    }
    let remove = function (content) {
        root = removeAtNode(root, content);
    };
    function removeAtNode(node, content) {
        if (node === null) {
            return null;
        }
        else {
            if (content < node.content) {
                node.left = removeAtNode(node.left, content);
            }
            else if (content > node.content) {
                node.right = removeAtNode(node.right, content);
            }
            else {
                // the node to be removed has no children
                if (node.left === null && node.right === null) {
                    return null;
                }
                // the node has one child
                else if (node.left === null) {
                    return node.right;
                }
                else if (node.right === null) {
                    return node.left;
                }
                //the node to be removed has two children
                else {
                    let replacement = findMinNode(node.right);
                    node.content = replacement.content;
                    node.right = removeAtNode(node.right, replacement.content);
                }
            }
            return node;
        }
    }
    //helper function for remove method - finding smallest node of subtree
    function findMinNode(node) {
        if (node === null) {
            return null;
        }
        else if (node.left === null) {
            return node;
        }
        else {
            return findMinNode(node.left);
        }
    }
    let find = (content) => {
        return findAtNode(content, root);
    };
    function findAtNode(content, node) {
        if (content === null || content === undefined) {
            throw new Error("You have to search for a valid value in the tree.");
        }
        else {
            if (node === null) {
                throw new Error("The Binary Tree is empty");
            }
            else if (content < node.content) {
                return findAtNode(content, node.left);
            }
            else if (content > node.content) {
                return findAtNode(content, node.right);
            }
            else {
                return node;
            }
        }
    }
    // Recursive version of the levelOrder method, more memory intensive than iterative method.
    // let levelOrder = (callback: Function): Array<number> => {
    //   let queueOfOperations = [root];
    //   let resultArray = [];
    //   function levelOrderTraversal(queueOfOperations, resultArray) {
    //     if (queueOfOperations.length === 0) {
    //       return resultArray;
    //     } else {
    //       let currentNode = queueOfOperations.shift();
    //       if(callback){
    //         callback(currentNode.content);
    //       }
    //       resultArray.push(currentNode.content);
    //       if (currentNode.left !== null) {
    //         queueOfOperations.push(currentNode.left);
    //       }
    //       if (currentNode.right !== null) {
    //         queueOfOperations.push(currentNode.right);
    //       }
    //     }
    //     return levelOrderTraversal(queueOfOperations, resultArray);
    //   }
    //   return levelOrderTraversal(queueOfOperations, resultArray);
    // };
    let levelOrder = (callback) => {
        let queueOfOperations = [root];
        let resultArray = [];
        while (queueOfOperations.length > 0) {
            let currentNode = queueOfOperations.shift();
            if (callback) {
                callback(currentNode.content);
            }
            resultArray.push(currentNode.content);
            if (currentNode.left !== null) {
                queueOfOperations.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queueOfOperations.push(currentNode.right);
            }
        }
        return resultArray;
    };
    let inOrder = (callback) => {
        let currentNode = root;
        let inOrderArray = [];
        function traverseInOrder(node) {
            if (node !== null) {
                traverseInOrder(node.left);
                if (callback) {
                    callback(node.content);
                }
                else {
                    inOrderArray.push(node.content);
                }
                traverseInOrder(node.right);
            }
        }
        traverseInOrder(currentNode);
        return inOrderArray;
    };
    let preOrder = (callback) => {
        let currentNode = root;
        let preOrderArray = [];
        function traversePreOrder(node) {
            if (node !== null) {
                if (callback) {
                    callback(node.content);
                }
                else {
                    preOrderArray.push(node.content);
                }
                traversePreOrder(node.left);
                traversePreOrder(node.right);
            }
        }
        traversePreOrder(currentNode);
        return preOrderArray;
    };
    let postOrder = (callback) => {
        let currentNode = root;
        let postOrderArray = [];
        function traversePostOrder(node) {
            if (node !== null) {
                traversePostOrder(node.left);
                traversePostOrder(node.right);
                if (callback) {
                    callback(node.content);
                }
                else {
                    postOrderArray.push(node.content);
                }
            }
        }
        traversePostOrder(currentNode);
        return postOrderArray;
    };
    let height = (node) => {
        function traverseHeight(node) {
            if (node === null) {
                return -1;
            }
            else {
                let leftHeight = traverseHeight(node.left);
                let rightHeight = traverseHeight(node.right);
                return Math.max(leftHeight, rightHeight) + 1;
            }
        }
        return traverseHeight(node);
    };
    let depth = (node) => {
        let currentNode = root;
        let counter = 0;
        while (currentNode !== null) {
            if (currentNode === node) {
                return counter;
            }
            else {
                if (currentNode.content < node.content) {
                    currentNode = currentNode.right;
                    counter++;
                }
                else if (currentNode.content > node.content) {
                    currentNode = currentNode.left;
                    counter++;
                }
                else {
                    return counter;
                }
            }
        }
        throw new Error("Node not found in this tree.");
    };
    let isBalanced = (tree) => {
        return checkBalance(tree.root);
    };
    let checkBalance = (node) => {
        if (node === null) {
            return true;
        }
        let leftHeight = height(node.left);
        let rightHeight = height(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }
        else {
            return checkBalance(node.left) && checkBalance(node.right);
        }
    };
    let rebalance = (binaryTree) => {
        let sortedArray = binaryTree.inOrder();
        binaryTree.root = constructBinarySearchTree(sortedArray, 0, sortedArray.length - 1);
    };
    return {
        root,
        setRoot,
        prettyPrint,
        insert,
        remove,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
    };
    function constructBinarySearchTree(array, start, end) {
        if (start > end) {
            return null;
        }
        let middleIndex = Math.floor((start + end) / 2);
        let node = (0, nodeFactory_1.createTreeNode)(array[middleIndex], null, null);
        node.left = constructBinarySearchTree(array, start, middleIndex - 1);
        node.right = constructBinarySearchTree(array, middleIndex + 1, end);
        return node;
    }
}
//Driver script to generate an array of 35 numbers between 1-100
let driverArray = () => {
    let treeArray = [];
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    for (let i = 0; i < 36; i++) {
        let driverInt = getRandomInt(1, 100);
        treeArray.push(driverInt);
    }
    return treeArray;
};
let tree = createBinaryTree(driverArray());
//Testing Tree methods in console
console.log("Initial tree:");
tree.prettyPrint(tree.root);
// console.log("Inserting entries:");
// tree.insert(255);
// tree.insert(257);
// tree.insert(2567);
// tree.insert(254);
// tree.prettyPrint(tree.root);
// console.log("Removing 7:");
// tree.remove(7);
// tree.prettyPrint(tree.root);
// console.log("Finding 25:");
// console.log(tree.find(25));
// console.log("Level order traversal:");
// console.log(tree.levelOrder());
// console.log("In order traversal:");
// console.log(tree.inOrder());
// console.log("Pre order traversal:");
// console.log(tree.preOrder());
// console.log("Post order traversal:");
// console.log(tree.postOrder());
// console.log("Height of root:");
// console.log(tree.height(tree.root));
// console.log("Depth of node with content 25:");
// console.log(tree.depth(tree.find(25)));
console.log("Is tree balanced?");
console.log(tree.isBalanced(tree));
// console.log("Rebalance tree");
// tree.rebalance(tree);
// console.log("New balanced tree:");
// tree.prettyPrint(tree.root);
// console.log("Is tree balanced?");
// console.log(tree.isBalanced(tree));
