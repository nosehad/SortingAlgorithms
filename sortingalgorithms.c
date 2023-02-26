#include "sortingalgorithms.h"

void printArray(int*start,int*end)
{
    printf("{");
    for(;start!=end;start++)
        printf("%d, ",*start);
    printf("%d}\n",*start);
}

extern inline void*createArray(unsigned int size)
{
    int* array = (int*)calloc(ARRAY_BLOCK_SIZE, size);
    for(int i = 0;i < size; ++i)
        *(array + i) = i;
    return array;
}

extern inline void swap(int*a, int*b)
{
    int t = *b;
    *b = *a;
    *a = t;
}

void shuffleArray(int*start,int*end)
{
    unsigned long long s = end-start;
    for(;end!=start;--end) 
    {  
        int r = rand() % s;
        int temp = *end;
        *end = *(start +r);
        *(start +r) = temp;
    }  
}
