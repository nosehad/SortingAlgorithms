#include "InsertionSort.h"

void insertionsort(int*start, int*end)
{
    /* store start in temporary variable that is used in arithmetic operations */
    int*_start = start;
    /* iterate over array*/
    for(start++;start<=end;start++)
    {
        /* start of sorted partition */
        int current = *start;
        int*i = start -1;
        /* get insertion position */
        for(;i >= _start && *i > current;i--)
            *(i+1) = *i;
        /* insert element into sorted array */
        *(i + 1) = current;
    }
}