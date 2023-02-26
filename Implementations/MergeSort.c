#include "MergeSort.h"

void mergesort(int*start, int*end)
{
    int lenght = end - start;

    /* array is completly split up */
    if(lenght < 2)
    {
        /* -> return */
        return;
    }
    
    /* split Array */
    int midIndex = lenght/2;
    int*left = start;
    int*left_end = start + midIndex;
    int*right = start + midIndex;
    int*right_end = end;

    /* recursivly split up sub arrays */
    mergesort(left, left_end);
    mergesort(right, right_end);

    /* allocate new temporary array on stack*/
    int*temp = (int*) calloca(ARRAY_BLOCK_SIZE, (lenght));
    /* find start and end position of temporary array */
    int*temp_start = temp;
    int*temp_end = temp + lenght;
    /* merge sub arrays on new temporary array */
    merge(temp_start, temp_end, left, left_end, right, right_end);
    /* copy temporary array to original array */
    for (; temp != temp_end; ++temp, ++start)
        *start = *temp;
}

void merge(int*main_start, int*main_end, int*left_start, int*left_end, int*right_start, int*right_end)
{
    /* merge arrays to main array until left or right array "runs out" of elements */
    for(;left_start != left_end && right_start != right_end;++main_start)
    {
        /* copy first left element to main array if it is smaller than the first right element */
        if(*left_start <= *right_start)
        {
            *main_start = *left_start;
            ++left_start;
        }
        /* otherwise copy the first element of the right array to the main array*/
        else
        {
            *main_start = *right_start;
            ++right_start;
        }
    }

    /* if there are still elements leftover in one of the arrays, append them to main array */
    for(;left_start != left_end;++main_start, ++left_start)
        *main_start = *left_start;
    for(;right_start != right_end;++main_start, ++right_start)
        *main_start = *right_start ;
}
