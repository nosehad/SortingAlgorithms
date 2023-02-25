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
    stopped;

    // aktive Elemente
    primary_old;
    secondary_old;
    third_old;
    fourth_old;

    constructor(lenght)
    {
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
        shuffle(this.array);
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
            return;
        }
        for(let l = 0; l < this.max; ++l)
        {
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
    }

    async as_initial_render()
    {
        for(let l = 0; l < this.max; ++l)
        {
            const el = document.createElement("div");
            el.id = `scv-${l}`;
            el.classList.add("sort-container-value");
            el.style.width = `${this.width}px`;
            el.style.height = `${(this.array[l]/this.max)*this.container_doc.offsetHeight}px`
            this.container_doc.appendChild(el);
            this.element_array[l] = el;
            await sleep(0.1);
            if(!current_cooldown)
                return;
        }
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

    async nsort(start, end)
    {

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
              this.third(j);
              this.fourth(j-1);
              await sleep(this.delay);
              if(this.stopped)
                return;
            }
            this.array[j] = currentUnsortedItem;
            this.secondary(j);
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
                if(this.array[j] < this.array[mi])
                    mi = j;
                await sleep(this.delay);   
                if(this.stopped)
                    return;
            }
    
            temp = this.array[i];
            this.array[i] = this.array[mi];
            this.array[mi] = temp;
            this.primary(i);
            this.secondary(mi);
            await sleep(this.delay);
            if(this.stopped)
                return;
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
                this.primary(i);
                await sleep(this.delay);
                if(this.stopped)
                    return;
                i++;
            }
            while (this.array[j] > pivot) {
                this.secondary(j);
                await sleep(this.delay);
                if(this.stopped)
                    return;
                j--;
            }
            if (i <= j) {
                this.third(i);
                this.fourth(j);
                await sleep(this.delay);
                if(this.stopped)
                    return;
                temp = this.array[i];
                this.array[i] = this.array[j];
                this.array[j] = temp;
                i++;
                j--;
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
            if (this.array[i] < this.array[j]) {
                temp[k] = this.array[i];
                this.primary(i);
                this.secondary(k);
                await sleep(this.delay);
                if(this.stopped)
                    return;
                i++;
            } else {
                temp[k] = this.array[j];
                this.primary(i);
                this.secondary(k);
                await sleep(this.delay);
                if(this.stopped)
                    return;
                j++;
            }
            k++;
        }
    
        while (i <= middle) {
            temp[k] = this.array[i];
            this.primary(i);
            this.secondary(k);
            await sleep(this.delay);
            if(this.stopped)
                return;
            i++;
            k++;
        }
    
        while (j <= high) {
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
    document.getElementById("algorithm_button").innerHTML = "Start"; 
    if(current_cooldown == true)
        return;
    current_cooldown = true;
    current_s_container = new SortingContainer(document.getElementById("lenght-input").value);
}

let changelenght1 = () =>
{
    document.getElementById("algorithm_button").innerHTML = "Start";
    if(current_cooldown == true)
        return;
    current_cooldown = true;
    current_s_container = new SortingContainer(document.getElementById("lenght").value);
    document.getElementById("lenght-input").value = document.getElementById("lenght").value;
}

let changelenght2 = () =>
{
    document.getElementById("algorithm_button").innerHTML = "Start";
    if(current_cooldown == true)
        return;
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

async function algorithm()
{
    if(!current_s_container.ready)
        return;
    if(sorting == true)
    {
        sorting = false;
        current_s_container.stopped = true;
        changelenght();
    }
    sorting = true;
    document.getElementById("algorithm_button").innerHTML = "Stop";
    current_s_container.delay = document.getElementById("speed").value;
    switch(document.getElementById("al_choice").value)
    {
        case "merge_sort":
            await current_s_container.merge_sort(0, current_s_container.max-1);
            break;
        case "selection_sort":
            await current_s_container.selection_sort();
            break;
        case "nsort":
            await current_s_container.nsort(0, current_s_container.max-1);
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
    document.getElementById("algorithm_button").innerHTML = "Start";
    sorting = false;
}

// Fisher–Yates shuffle ("misch") Algorithmus um Elemente von Array zufällig zu sortieren
let shuffle = (array) => 
{ 
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

init();
