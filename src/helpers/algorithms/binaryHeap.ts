import { INode } from '../types';

export const BinaryHeap = class BinaryHeap {
  nodesPositionInHeap: {};
  heap: INode[];

  constructor(array: INode[]) {
    this.nodesPositionInHeap = Object.fromEntries(array.map((node, idx) => [node.id, idx]));
    this.heap = this.buildHeap(array);
  }

  buildHeap(array: INode[]): INode[] {
    let firstParentIndex = Math.floor((array.length - 2) / 2);
    for (let currentIndex of Array.from(Array(firstParentIndex + 1).keys()).reverse()) {
      this.siftDown(currentIndex, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIndex: number, endIndex: number, heap: INode[]) {
    let childOneIndex = currentIndex * 2 + 1;
    while (childOneIndex <= endIndex) {
      let indexToSwap;
      let childTwoIndex = currentIndex * 2 + 2 <= endIndex ? currentIndex * 2 + 2 : -1;
      if (childTwoIndex !== -1 && heap[childTwoIndex].estimatedDistanceToEnd < heap[childOneIndex].estimatedDistanceToEnd) {
        indexToSwap = childTwoIndex;
      } else indexToSwap = childOneIndex;

      if (heap[indexToSwap].estimatedDistanceToEnd < heap[currentIndex].estimatedDistanceToEnd) {
        this.swap(currentIndex, indexToSwap, heap);
        currentIndex = indexToSwap;
        childOneIndex = currentIndex * 2 + 1;
      } else return;
    }
  }

  siftUp(currentIndex: number, heap: INode[]) {
    let parentIndex = Math.floor((currentIndex - 1) / 2);
    while (currentIndex > 0 && heap[currentIndex].estimatedDistanceToEnd < heap[parentIndex].estimatedDistanceToEnd) {
      this.swap(currentIndex, parentIndex, heap);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    let removedNode = this.heap.pop();
    delete (this.nodesPositionInHeap as any)[removedNode!.id];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return removedNode;
  }

  insert(node: INode) {
    this.heap.push(node);
    (this.nodesPositionInHeap as any)[node.id] = this.heap.length - 1;
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: INode[]) {
    (this.nodesPositionInHeap as any)[heap[i].id] = j;
    (this.nodesPositionInHeap as any)[heap[j].id] = i;
    let tempI = heap[i];
    heap[i] = heap[j];
    heap[j] = tempI;
  }

  containsNode(node: INode) {
    return Object.hasOwn(this.nodesPositionInHeap, node.id);
  }

  update(node: INode) {
    this.siftUp((this.nodesPositionInHeap as any)[node.id], this.heap);
  }
};
