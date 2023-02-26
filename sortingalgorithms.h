#ifndef SA_H
    #define SA_H

    #include <stdlib.h>
    #include <stdio.h>

    #define ARRAY_BLOCK_SIZE sizeof(int)
    #define ARRAY_SIZE 20

    /* print array between <start> and <end> */
    void printArray(int*start,int*end);
    /* create array of size with elements counting up */
    extern inline void*createArray(unsigned int size);
    /* swap values of <a> and <b> */
    extern inline void swap(int*a, int*b);
    /* shuffles array between <start> and <end> */
    void shuffleArray(int*start,int*end);

    /* why does this not exist per default ?! */
    #define calloca(nmemb, size) __builtin_alloca(nmemb*size);
#endif