//randomize array button
let randomizeArray = document.getElementById('new_random_array')

//sort array buttons with the different alggorthms
let bubbleSortButton = document.getElementById('bubble_sort')
let mergeSortButton = document.getElementById('merge_sort')
let insertionSortButton = document.getElementById('insertion_sort')
let heapSortButton = document.getElementById('heap_sort')
let quickSortButton = document.getElementById('quick_sort')

//configuration for the bars that represent the array
//height so they adjust for the screen view
let heightFactor = 5
//html container for all of the bars
let barsContainer = document.getElementById("bars_container")
//the lowest possible number in the array
let minRange = 10
//the greatest possible number in the array
let maxRange = 70
//the total number of numbers in the array
let numOfBars = 25
//the original array that is null at first that will hold the rnadomly generated values for the array
let unsorted = new Array(numOfBars)


//these functions generate random numbers and populates the array that will eventually be sorted
function randNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)

}
function createRandArray(){
    for(let i = 0; i < numOfBars; i++){
        unsorted[i] = randNum(minRange,maxRange)
    }
}

//this function creates the bars as representations of the array, the longer the bar, the bigger the number
function renderBars(array){
    for(let i = 0; i < array.length; i++){
    let bar = document.createElement("div")
    bar.classList.add("bar")
    bar.style.height = array[i] * heightFactor + "px"
    barsContainer.appendChild(bar)
    }
}

//upon page load, the random and unsorted array is generated and the bars are rendered to represent the numbers within the array
document.addEventListener("DOMContentLoaded", function() {
    createRandArray()
    renderBars(unsorted)
})

//when the "New Array" button is clicked, a new random and unsorted array will be generated as well as the bars to represent the number
randomizeArray.addEventListener("click", function(){
    createRandArray()
    barsContainer.innerHTML = ""
    renderBars(unsorted)
})

//this Promise function will act as a delay to better show the demonstration of the sorting algorithm, so it does not complete all at once
function delay(ms){
    return new Promise ((resolve) => setTimeout(resolve, ms))
}

//thiis function will check if the final array is sorted before displaying the final green run through animation
function isSorted(array){
  let isSorted = true
  for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i+1]) {
          isSorted = false
          break
      }
  }
  return isSorted
}


//--------------------------Bubble Sort Algorithm------------------------------------------

//this is the implementation for the bubble sort algorithm
async function bubbleSort(array){
    let bars = document.getElementsByClassName("bar")

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            if(array[j] > array [j+1]){
                for(let k = 0; k < bars.length; k++){
                    if(k != j && k !== j + 1)
                    bars[k].style.backgroundColor = "#af8c46"
            }
            //sorting algorithm
            let temp = array[j]
            array[j] = array[j+1]
            array[j+1] = temp

            //visual demonstration
            bars[j].style.height = array[j] * heightFactor + "px"
            bars[j].style.backgroundColor = "#48496b"
            bars[j+1].style.height = array[j+1] * heightFactor + "px"
            bars[j+1].style.backgroundColor = "#835a7f"
            await delay(150)
            }
        }
        await delay(100)
    }

    if(isSorted(array)){
        for(let i = 0; i < array.length; i++){
          bars[i].style.backgroundColor = "#6b6a48"
          await delay(20)
        }
      }

  return array
}

//when the "Bubble Sort" button is clicked, the array will be sorted in the bubble sort algorithm and will be demonstrated by the bars on screen 
bubbleSortButton.addEventListener("click", function(){
    let sorted = bubbleSort(unsorted)
    console.log(sorted)
})


//--------------------------Merge Sort Algorithm------------------------------------------

//when the "Merge Sort" button is clicked, the array will be sorted in the merge sort algorithm and will be demonstrated by the bars on screen 
async function mergeSort(array) {
    let bars = document.getElementsByClassName("bar")

    //sorting algorithm
    if (array.length < 2) {
      return array
    }
    const mid = Math.floor(array.length / 2)
    const leftSide = array.slice(0, mid)
    const rightSide = array.slice(mid)

    await mergeSort(leftSide)
    await mergeSort(rightSide)
  
    //visual demonstration
    let i = 0
    let j = 0
    let k = 0
  
    while (i < leftSide.length && j < rightSide.length) {
      if (leftSide[i] < rightSide[j]) {
        array[k] = leftSide[i]
        i++
      } else {
        array[k] = rightSide[j]
        j++
      }

      bars[k].style.height = array[k] * heightFactor + "px"
      bars[k].style.backgroundColor = "#48496b"
      if (k + array.length < bars.length) {
        bars[k + array.length].style.height = array[k] * heightFactor + "px"
        console.log(array[k] * heightFactor)
        bars[k + array.length].style.backgroundColor = "#835a7f"
      }
      await delay(300)
      k++
    }
  
    while (i < leftSide.length) {
      array[k] = leftSide[i]
      bars[k].style.height = array[k] * heightFactor + "px"
      bars[k].style.backgroundColor = "#48496b"
      await delay(200)
      i++
      k++
    }
  
    while (j < rightSide.length) {
      array[k] = rightSide[j]
      bars[k].style.height = array[k] * heightFactor + "px"
      bars[k].style.backgroundColor = "#48496b"
      await delay(200)
      j++
      k++
    }
  
    if(isSorted(array)){
      for(let i = 0; i < array.length; i++){
        bars[i].style.backgroundColor = "#6b6a48"
        await delay(20)
      }
    }

  return array
}

//when the "Merge Sort" button is clicked, the array will be sorted in the merge sort algorithm and will be demonstrated by the bars on screen 
mergeSortButton.addEventListener("click", function(){
    let sorted = mergeSort(unsorted)
    console.log(sorted)
})


//--------------------------Insertion Sort Algorithm------------------------------------------

//when the "Insertion Sort" button is clicked, the array will be sorted in the insertion sort algorithm and will be demonstrated by the bars on screen 
async function insertionSort(array){
  let bars = document.getElementsByClassName("bar")

  //sorting algorithm
  for(let i = 1; i < array.length; i++){
    let curr = array[i]
    let j = i - 1
    
    while(j >= 0 && array[j] > curr){
      array[j + 1] = array[j]

      //visual demonstration
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px"   
      bars[j + 1].style.backgroundColor = "#48496b"
      await delay(200)

      for(k = 0; k < bars.length; k++){
        if (k != j + 1){
          bars[k].style.backgroundColor = "#af8c46"
        }
      }

      //sorting algorithm
      j--
    }

    array[j + 1] = curr

    //visual demonstration
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px"
    bars[j + 1].style.backgroundColor = "#835a7f"
    await delay(200)
  }

  if(isSorted(array)){
    for(let i = 0; i < array.length; i++){
      bars[i].style.backgroundColor = "#6b6a48"
      await delay(20)
    }
  }

  return array
}

//when the "Insertion Sort" button is clicked, the array will be sorted in the insertion sort algorithm and will be demonstrated by the bars on screen 
insertionSortButton.addEventListener("click", function(){
  let sorted = insertionSort(unsorted)
  console.log(sorted)
})


//--------------------------Heap Sort Algorithm------------------------------------------

//heapify and heapSwap are supplementary functions to help sort with heap sort
//heapify will compare three elements, ensuring that they are in correct order for max heap
async function heapify(array, length, i){
  let bars = document.getElementsByClassName("bar")

  let largest = i
  let left = i * 2 + 1
  let right = left + 1

  if(left < length && array[left] > array[largest]){
    largest = left
  } 

  if(right < length && array[right] > array[largest]){
    largest = right
  } 

  if(largest != i){
    await heapSwap(array, i, largest, bars)
    await heapify(array, length, largest)
  }
   return array
}

async function heapSwap(array, i, j, bars){
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp

  bars[i].style.height = array[i] * heightFactor + "px"
  bars[j].style.height = array[j] * heightFactor + "px"
  bars[i].style.backgroundColor = "#835a7f"
  bars[j].style.backgroundColor = "#48496b"
  await delay(200)

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#af8c46"
  }

  return array
}

//when the "Heap Sort" button is clicked, the array will be sorted in the heap sort algorithm and will be demonstrated by the bars on screen 
async function heapSort(array) {
  let bars = document.getElementsByClassName("bar")

  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i)
  }

  for (let i = array.length - 1; i >= 0; i--) {
    await heapSwap(array, 0, i, bars)
    await heapify(array, i, 0)
  }

  if(isSorted(array)){
    for(let i = 0; i < array.length; i++){
      bars[i].style.backgroundColor = "#6b6a48"
      await delay(20)
    }
  }

  return array
}

//when the "Heap Sort" button is clicked, the array will be sorted in the heap sort algorithm and will be demonstrated by the bars on screen 
heapSortButton.addEventListener("click", function(){
  let sorted = heapSort(unsorted)
  console.log(sorted)
})


//--------------------------Quick Sort Algorithm------------------------------------------

//partition and quickSwap are supplementary functions to help sort with heap sort
//partition will choose a pivot and distinguish the left and right pointers 
async function partition(array, left, right) {
  let bars = document.getElementsByClassName("bar")

  let pivotIndex = Math.floor((left + right) / 2)
  let pivot = array[pivotIndex]
  
  bars[pivotIndex].style.backgroundColor = "#48496b"

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "#af8c46"
    }
  }

  while (left <= right) {
    while (array[left] < pivot) {
      left++
    }
    while (array[right] > pivot) {
      right--
    }
    if (left <= right) {
      await quickSwap(array, left, right, bars)
      left++
      right--
    }
  }
  return left
}

async function quickSwap(array, left, right, bars) {
  let temp = array[left]
  array[left] = array[right]
  array[right] = temp

  bars[left].style.height = array[left] * heightFactor + "px"
  bars[left].style.backgroundColor = "#835a7f"
  bars[right].style.height = array[right] * heightFactor + "px"
  bars[right].style.backgroundColor = "#835a7f"
  
  await delay(200)
}

async function quickSort(array, left, right) {
  let bars = document.getElementsByClassName("bar")

  if (array.length > 1) {
    let index = await partition(array, left, right)

    if (left < index - 1) {
      await quickSort(array, left, index - 1)

    }
    if (index < right) {
      await quickSort(array, index, right)

    }
  }

  if(isSorted(array)){
    for(let i = 0; i < array.length; i++){
      bars[i].style.backgroundColor = "#6b6a48"
      await delay(20)
    }
  }

  return array
}

//when the "Quick Sort" button is clicked, the array will be sorted in the quick sort algorithm and will be demonstrated by the bars on screen 
quickSortButton.addEventListener("click", function(){
  let sorted = quickSort(unsorted, 0, unsorted.length - 1)
  console.log(sorted)
})