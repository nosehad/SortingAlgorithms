#include "Main.h"

void main()
{
    int* array = createArray(ARRAY_SIZE);
    printf("Array before shuffle: ");
    printArray(array, array+ARRAY_SIZE-1);
    shuffleArray(array, array+ARRAY_SIZE-1);
    printf("Array after shuffle: ");
    printArray(array, array+ARRAY_SIZE-1);
    insertionsort(array, array+ARRAY_SIZE-1);
    // bubblesort(array, array+ARRAY_SIZE-1);
    // mergesort(array, array+ARRAY_SIZE);
    // quicksort(array, array+ARRAY_SIZE-1);
    printf("Array after sorting: ");
    printArray(array, array+ARRAY_SIZE-1); 

    /*int* array = createArray(ARRAY_SIZE);

    struct timespec start, end;
    double time_elapsed;

    // Bubble Sort 
    printf("Bubble Sort auf 1M Elemente: -- ms\n");

    // Insertion Sort
    printf("Insertion Sort auf 1M Elemente: -- ms\n");

    // Quick Sort 
    shuffleArray(array, array+ARRAY_SIZE-1);

    clock_gettime(CLOCK_MONOTONIC, &start);
    quicksort(array, array+ARRAY_SIZE-1);
    clock_gettime(CLOCK_MONOTONIC, &end);
    
    time_elapsed = (end.tv_sec - start.tv_sec) * 1000000000;
    time_elapsed += (end.tv_nsec - start.tv_nsec);
    printf("Quicksort auf 1M Elemente: %f ms\n", time_elapsed/1000000);

    // Merge Sort

    shuffleArray(array, array+ARRAY_SIZE-1);

    clock_gettime(CLOCK_MONOTONIC, &start);
    mergesort(array, array+ARRAY_SIZE);
    clock_gettime(CLOCK_MONOTONIC, &end);
    
    time_elapsed = (end.tv_sec - start.tv_sec) * 1000000000;
    time_elapsed += (end.tv_nsec - start.tv_nsec);
    printf("Merge Sort auf 1M Elemente: %f ms\n", time_elapsed/1000000);*/
}