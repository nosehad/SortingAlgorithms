#include "QuickSort.h"

void quicksort(int* start, int* end) {
    /* stop if sub array is only one element large */
    /* -> array is sorted*/
    if (start >= end)
        return;

    /* set pivot to rightmost element */
    int pivot = *end;

    /* copy start and end to temporary variables which are used in arithmetic operations */
    int* left = start;
    int* right = end;

    for (;left <= right;) 
    {
        for (;*left < pivot; left++);
        for (;*right > pivot; right--);
        
        /* swap smaller values to left site of pivot and greater ones to the right site */
        if (left <= right) 
        {
            swap(left, right);
            /* increase left pointer */
            left++;
            /* decrease right pointer */
            right--;
        }
    }

    /* recursivly run algorithm on sub arrays until array is sorted */
    quicksort(start, right);
    quicksort(left, end);
}