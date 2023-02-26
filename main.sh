# create build folder 
mkdir -p build
# check if GCC is installed
if command -v gcc >/dev/null 2>&1; then
    c99 Main.c sortingalgorithms.c Implementations/InsertionSort.c Implementations/BubbleSort.c Implementations/MergeSort.c Implementations/QuickSort.c -w -g -o build/algorithmen && ./build/algorithmen
else
    echo -e "\033[1m\033[31mError\033[0m: The GNU Compiler Colection GCC isn't installed on your system."
    echo -e "Run \033[47mapt install -y gcc\033[0m to install it."
    exit 1
fi
