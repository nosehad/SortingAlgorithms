#ifndef MERGE_H
    #define MERGE_H

    #include "../gfs.h"

    #include <stdlib.h>
    #include <string.h>

    void mergesort(int*start, int*end);
    void merge(int*main_start, int*main_end, int*left_start, int*left_end, int*right_start, int*right_end);

#endif
