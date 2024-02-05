import { TreeNode, createTreeNode } from "./nodeFactory";

interface binaryTree {
  root: TreeNode | null;
  prettyPrint: (node: TreeNode, prefix?: string, isLeft?: boolean) => void;
}

function createBinaryTree(array: number[]): binaryTree {
  if (!array || array.length === 0) {
    throw new Error("Input array is null,undefined or otherwise empty.");
  }
  let sortedArray = array.sort((a, b) => a - b);
  let uniqueArray = [...new Set(sortedArray)];

  let root = constructBinarySearchTree(uniqueArray, 0, uniqueArray.length - 1);

  let prettyPrint = function (
    node: TreeNode = root,
    prefix: string = "",
    isLeft: boolean = true
  ) {
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

  return { root, prettyPrint };

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

let tree = createBinaryTree([3, 7, 25, 9, 2, 67, 54, 16, 33, 125, 57, 42, 32]);
tree.prettyPrint(tree.root);
