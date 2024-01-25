import { TreeNode, createTreeNode } from "./nodeFactory";

interface binaryTree {
  root: TreeNode | null;
}

function createBinaryTree(array: number[]): binaryTree {
  let sortedArray = array.sort((a, b) => a - b);
  let uniqueArray = [...new Set(sortedArray)];

  let root = constructBinarySearchTree(uniqueArray, 0, uniqueArray.length - 1);

  return { root };

  function constructBinarySearchTree(array, start, end): TreeNode | null {
    if (start > end) {
      return null;
    }

    let middleIndex = Math.floor((start + end) / 2);
    let node = createTreeNode(array[middleIndex], null, null);

    node.left = constructBinarySearchTree(array, start, middleIndex - 1);
    node.right = constructBinarySearchTree(array, middleIndex + 1, end);

    return node;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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

let tree = createBinaryTree([3, 7, 25, 9, 2, 67, 54, 16, 33, 125, 57, 42, 32]);
prettyPrint(tree.root);