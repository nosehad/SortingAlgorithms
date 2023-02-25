#include "BubbleSort.h"

/* Bubblesort */
void bubblesort(int*_start,int*end)
{
    int* start;
    int temp;

    /* recursively bubble through array, until its sorted -> no swaps neccessary*/
    for(char swapped = 1;swapped;)
    {
        swapped = 0;
        /* iterate over array using pointer arithmetic */
        for(start = _start;start!=end;start++)
        {
            /* check for item in wrong order */
            if(*start > *(start+1))
            {
                /* set swapped to true */
                swapped = 1;
                temp = *start;
                *start = *(start +1);
                *(start+1) = temp;
            }
        }
    }
}