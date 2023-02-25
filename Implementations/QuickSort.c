#include "QuickSort.h"

void quicksort(int* start, int* end) {
    if (start >= end) 
        return;

    int pivot = *end;

    int* left = start;
    int* right = end;

    for (;left <= right;) 
    {
        for (;*left < pivot; left++);
        for (;*right > pivot; right--);
        
        if (left <= right) 
        {
            int temp = *left;
            *left = *right;
            *right = temp;
            left++;
            right--;
        }
    }
    quicksort(start, right);
    quicksort(left, end);
}


static inline void swap(int*a, int*b)
{
    int t = *a;
    *b = *a;
    *a = t;
}