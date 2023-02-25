#include "MergeSort.h"

void mergesort(int*start, int*end)
{
    int lenght = end - start;

    if(lenght < 2)
        return;
    
    int midIndex = lenght/2;

    int*left = start;
    int*left_end = start + midIndex;

    int*right = start + midIndex;
    int*right_end = end;

    mergesort(left, left_end);
    mergesort(right, right_end);

    int*temp = (int*) calloca(ARRAY_BLOCK_SIZE, (lenght));
    int*temp_start = temp;
    int*temp_end = temp + lenght;
    merge(temp_start, temp_end, left, left_end, right, right_end);

    for (; temp != temp_end; ++temp, ++start)
        *start = *temp;
}

void merge(int*main_start, int*main_end, int*left_start, int*left_end, int*right_start, int*right_end)
{
    /* arrays "mergen" */
    for(;left_start != left_end && right_start != right_end;++main_start)
    {
        if(*left_start <= *right_start)
        {
            *main_start = *left_start;
            ++left_start;
        }
        else
        {
            *main_start = *right_start;
            ++right_start;
        }
    }

    /* elemente wenn noch vorhanden zum Ende hinzufügen */
    for(;left_start != left_end;++main_start, ++left_start)
        *main_start = *left_start;

    for(;right_start != right_end;++main_start, ++right_start)
        *main_start = *right_start ;
}
