let sleep = (milliseconds) =>
{
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

let current_s_container;
let current_cooldown;
let sorting;

class SortingContainer
{
    array;
    element_array;
    ready;

    container_doc;
    max;
    element_width;

    // aktive Elemente
    primary_old;
    secondary_old;
    third_old;
    fourth_old;

    operations;

    constructor(lenght)
    {
        this.operations = 0;
        this.delay = document.getElementById("speed").value;
        this.array = new Int32Array(lenght);
        this.element_array = new Array(lenght);
        this.container_doc = document.getElementById("sort-container");
        console.log(this.container_doc.offsetWidth);
        console.log(lenght);
        this.width = this.container_doc.offsetWidth/lenght;
        this.max = lenght;
        for(let l = 0; l < lenght; ++l)
            this.array[l] = l;
        this.f_shuffle();
        this.initial_render();

        this.primary_old = 0;
        this.secondary_old = 0;
        this.third_old = 0;
        this.fourth_old = 0;
    }

    async initial_render()
    {
        this.container_doc.innerHTML = "";
        if(this.max > 270)
        {
            await this.as_initial_render();
            this.ready = true;
            current_cooldown = false;
            // reenable buttons
            document.getElementById("algorithm_button").disabled = false;
            document.getElementById("shuffle_button").disabled = false;
            return;
        }
        for(let l = 0; l < this.max; ++l)
        {
            // mark render as operation
            this.inc_operations();
            const el = document.createElement("div");
            el.id = `scv-${l}`;
            el.classList.add("sort-container-value");
            el.style.width = `${this.width}px`;
            el.style.height = `${(this.array[l]/this.max)*this.container_doc.offsetHeight}px`
            this.container_doc.appendChild(el);
            this.element_array[l] = el;
        }
        this.ready = true;
        current_cooldown = false;
        // reenable buttons
        document.getElementById("algorithm_button").disabled = false;
        document.getElementById("shuffle_button").disabled = false;
    }

    async as_initial_render()
    {
        for(let l = 0; l < this.max; ++l)
        {
            // mark render as operation
            this.inc_operations();
            const el = document.createElement("div");
            el.id = `scv-${l}`;
            el.classList.add("sort-container-value");
            el.style.width = `${this.width}px`;
            el.style.height = `${(this.array[l]/this.max)*this.container_doc.offsetHeight}px`
            this.container_doc.appendChild(el);
            this.element_array[l] = el;
            if(l % 10 == 0)
                await sleep(1);
            if(!current_cooldown)
                return;
        }
    }

    async f_shuffle() 
    { 
        for (let i = this.array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        return this.array;
    }

    async shuffle() 
    { 
        for (let i = this.array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          this.primary(i);
          this.secondary(j);
          this.inc_operations();
          [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
          await sleep(this.delay);
        }
        return this.array;
    }

    reset_operations()
    {
        this.operations = 0;
        document.getElementById("operations").innerHTML = 0;
    }


    inc_operations()
    {
        this.operations++;
        document.getElementById("operations").innerHTML = this.operations;
    }

    async rerender()
    {
        for(let l = 0; l < this.max; ++l)
        {
            this.element_array[l].style.color = '#FCFCFC';
            this.update_render(l);
        }
    }

    update_render(index) 
    {
        this.element_array[index].style.height = `${(this.array[index]/this.max)*this.container_doc.offsetHeight}px`;
    }

    primary(index)
    {
        this.element_array[this.primary_old].style.backgroundColor = '#FCFCFC';
        this.update_render(this.primary_old);
        this.primary_old = index;
        this.element_array[index].style.backgroundColor = '#042A2B';
        this.update_render(index);
    }

    secondary(index)
    {
        this.element_array[this.secondary_old].style.backgroundColor = '#FCFCFC';
        this.update_render(this.secondary_old);
        this.secondary_old = index;
        this.element_array[index].style.backgroundColor = '#5EB1BF';
        this.update_render(index);
    }

    third(index)
    {
        this.element_array[this.third_old].style.backgroundColor = '#FCFCFC';
        this.update_render(this.third_old);
        this.third_old = index;
        this.element_array[index].style.backgroundColor = '#042A2B';
        this.update_render(index);
    }

    fourth(index)
    {
        this.element_array[this.fourth_old].style.backgroundColor = '#FCFCFC';
        this.update_render(this.fourth_old);
        this.fourth_old = index;
        this.element_array[index].style.backgroundColor = '#24272B';
        this.update_render(index);
    }

    async bubble_sort()
    {
        let swaps;
        do {
          swaps = false;
          for (let i = 0; i < this.max - 1; i++) {
            if (this.array[i] > this.array[i + 1]) {
              let temp = this.array[i + 1];
              this.primary(i);
              this.secondary(i+1);
              await sleep(this.delay);
              if(this.stopped)
                return;
              this.array[i + 1] = this.array[i];
              this.array[i] = temp;
              swaps = true;
              // mark swap as one operation
              this.inc_operations();
            } 
          }
        } while (swaps);
        this.rerender();
    }

    async insertion_sort() {
        for (let i = 0; i < this.max; i++) {
            let currentUnsortedItem = this.array[i];
            this.primary(i);
            let j = i;
            for (; j > 0 && currentUnsortedItem < this.array[j - 1]; j--) {
              this.array[j] = this.array[j - 1];
              // mark swap as operation
              this.inc_operations();
              this.third(j);
              this.fourth(j-1);
              await sleep(this.delay);
              if(this.stopped)
                return;
            }
            this.array[j] = currentUnsortedItem;
            this.secondary(j);
            this.inc_operations();
            await sleep(this.delay);
            if(this.stopped)
                return;
        }
        this.rerender();
    }

    async selection_sort()
    {
        let temp;
        for(let i=0; i<this.max; i++){
            let mi = i;
            
            for(let j = i + 1; j<this.max; j++) {
                this.third(j);
                this.fourth(mi);
                // mark check as operation
                this.inc_operations();
                if(this.array[j] < this.array[mi])
                    mi = j;
                await sleep(this.delay);   
            }
    
            temp = this.array[i];
            this.array[i] = this.array[mi];
            this.array[mi] = temp;
            // mark swap as operation
            this.inc_operations();
            this.primary(i);
            this.secondary(mi);
            await sleep(this.delay);
        }
    }
    
    async quick_sort(low, high) {
        this.primary(low);
        this.secondary(high);
        await sleep(this.delay);
        let i = low;
        let j = high;
        let pivotIndex = Math.floor((low + high) / 2);
        let pivot = this.array[pivotIndex];
        let temp;
    
        while (i <= j) {
            while (this.array[i] < pivot) {
                // mark check as operation
                this.inc_operations();
                // set primary 
                this.primary(i);
                await sleep(this.delay);
                i++;
            }
            while (this.array[j] > pivot) {
                // mark check as operation
                this.inc_operations();
                // set secondary
                this.secondary(j);
                await sleep(this.delay);
                j--;
            }
            if (i <= j) {
                this.third(i);
                this.fourth(j);
                await sleep(this.delay);
                temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
                i++;
                j--;
                // mark swap as operation
                this.inc_operations();
            }
        }
        if (j > low) {
            await this.quick_sort(low, j);
        }
        if (i < high) {
            await this.quick_sort(i, high);
        }
    }


    async merge_sort(low, high) {
        if (low < high) {
            // mark calculation as operation
            this.inc_operations();
            let middle = Math.floor((low + high) / 2);
            await this.merge_sort(low, middle);
            await this.merge_sort(middle + 1, high);
            await this.merge(low, middle, high);
        }
    }
    
    async merge(low, middle, high) {
        this.primary(low);
        this.third(middle);
        this.secondary(high);
        await sleep(this.delay);
        let temp = [];
        let i = low;
        let j = middle + 1;
        let k = 0;
    
        while (i <= middle && j <= high) {
            // mark check as operation
            this.inc_operations();
            // mark copy as operation
            this.inc_operations();
            if (this.array[i] < this.array[j]) {
                temp[k] = this.array[i];
                this.primary(i);
                this.secondary(k);
                await sleep(this.delay);
                i++;
            } else {
                temp[k] = this.array[j];
                this.primary(i);
                this.secondary(k);
                await sleep(this.delay);
                j++;
            }
            k++;
        }
    
        while (i <= middle) {
            // mark copy as operation
            this.inc_operations();
            temp[k] = this.array[i];
            this.primary(i);
            this.secondary(k);
            await sleep(this.delay);
            i++;
            k++;
        }
    
        while (j <= high) {
            // mark copy as operation
            this.inc_operations();
            temp[k] = this.array[j];
            this.primary(i);
            this.secondary(k);
            await sleep(this.delay);
            if(this.stopped)
                return;
            j++;
            k++;
        }
    
        for (let x = low, y = 0; x <= high; x++, y++) {
            // mark copy as operation
            this.inc_operations();
            this.array[x] = temp[y];
            this.primary(x);
            this.secondary(y);
            await sleep(this.delay);
        }
    }
    
}

let init = () => 
{
    current_s_container = new SortingContainer(50);
}

let changelenght = () =>
{ 
    if(current_cooldown == true || sorting == true)
        return;
    document.getElementById("algorithm_button").disabled = true;
    document.getElementById("shuffle_button").disabled = true;
    current_cooldown = true;
    current_s_container = new SortingContainer(document.getElementById("lenght-input").value);
}

let changelenght1 = () =>
{
    if(current_cooldown == true || sorting == true)
        return;
    document.getElementById("algorithm_button").disabled = true;
    document.getElementById("shuffle_button").disabled = true;
    current_cooldown = true;
    current_s_container = new SortingContainer(document.getElementById("lenght").value);
    document.getElementById("lenght-input").value = document.getElementById("lenght").value;
}

let changelenght2 = () =>
{
    if(current_cooldown == true || sorting == true)
        return;
    document.getElementById("algorithm_button").disabled = true;
    document.getElementById("shuffle_button").disabled = true;
    current_cooldown = true;
    current_s_container = new SortingContainer(document.getElementById("lenght-input").value);
    document.getElementById("lenght").value = document.getElementById("lenght-input").value;
}

let lenghtdrag = () =>
{
    current_s_container = new SortingContainer(document.getElementById("lenght").value);
    document.getElementById("lenght-input").value = document.getElementById("lenght").value;
}

window.addEventListener("resize", () => {
    changelenght();
  });


async function shuffle()
{
    if(!current_s_container.ready || sorting == true)
        return;
    document.getElementById("algorithm_button").disabled = true;
    document.getElementById("shuffle_button").disabled = true;
    current_s_container.reset_operations();
    // set delay
    current_s_container.delay = document.getElementById("speed").value;
    await current_s_container.shuffle();
    document.getElementById("algorithm_button").disabled = false;
    document.getElementById("shuffle_button").disabled = false;
}

async function algorithm()
{
    if(!current_s_container.ready || sorting == true)
        return;
    sorting = true;
    document.getElementById("algorithm_button").disabled = true;
    document.getElementById("shuffle_button").disabled = true;
    current_s_container.reset_operations();
    current_s_container.delay = document.getElementById("speed").value;
    switch(document.getElementById("al_choice").value)
    {
        case "merge_sort":
            await current_s_container.merge_sort(0, current_s_container.max-1);
            break;
        case "selection_sort":
            await current_s_container.selection_sort();
            break;
        case "quick_sort":
            await current_s_container.quick_sort(0, current_s_container.max-1);
            current_s_container.rerender();
            break;
        case "insertion_sort":
            await current_s_container.insertion_sort();
            break;
        case "bubble_sort":
            await current_s_container.bubble_sort();
            break;
    }
    document.getElementById("algorithm_button").disabled = false;
    document.getElementById("shuffle_button").disabled = false;
    sorting = false;
}

init();
