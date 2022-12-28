export function removeDuplicates(array) {
    return [...new Set(array)];
}

function merge(arr1, arr2) {
    let finalArr = [];
    let i = 0,
        j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            finalArr.push(arr1[i]);
            i++;
        } else {
            finalArr.push(arr2[j]);
            j++;
        }
    }
    if (i !== arr1.length) {
        finalArr = finalArr.concat(arr1.slice(i, arr1.length));
    } else if (j !== arr2.length) {
        finalArr = finalArr.concat(arr2.slice(j, arr2.length));
    }

    return finalArr;
}

export function mergeSort(array) {
    if (array.length < 2) {
        return array;
    } else {
        const half = Math.floor(array.length / 2);
        const sorted1stHalf = mergeSort(array.slice(0, half));
        const sorted2ndHalf = mergeSort(array.slice(half, array.length));
        return merge(sorted1stHalf, sorted2ndHalf);
    }
}
