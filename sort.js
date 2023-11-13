const sel_text = "\t- [ ] тест 2.2\n\t- [ ] тест 2.1\n\t- [ ] тест 2.3"
// const sel_text = "- [ ] тест 1\n- [ ] тест 2\n\t- [ ] тест 2.2\n\t- [ ] тест 2.1\n\t- [ ] тест 2.3\n- [ ] тест 3\n\t- [ ] тест 3.2\n\t- [ ] тест 3.3\n\t- [ ] тест 3.1\n\t\t- [ ] тест 3.1.2\n\t\t- [ ] тест 3.1.1";
const dataArray = sel_text.split('\n');

let split_lines = []

class Array {
    constructor(massive, index_reg, bool) {

        this.massive = massive;
        this.index_reg = index_reg

        this.dynamicRegex = new RegExp(`(\\t){${this.index_reg}}`);
        this.sort_massive = []
        if (bool) {
            while (this.massive[0].match(this.dynamicRegex)) {
                this.index_reg += 1
                this.dynamicRegex = new RegExp(`(\\t){${this.index_reg}}`);
            }



        }
    }
    get_sort_massive() {
        for (let index = 0; index < this.massive.length; index++) {
            const element = this.massive[index];
            if (element.match(this.dynamicRegex)) {
                if (index == 0) {
                    const massive_sub = this.get_sub(this.massive[index], index)
                    this.sort_massive[this.sort_massive.length] = massive_sub[0]
                    index = massive_sub[1] - 1
                } else {
                    const massive_sub = this.get_sub(this.massive[index - 1], index)
                    this.sort_massive[this.sort_massive.length - 1] = massive_sub[0]
                    index = massive_sub[1] - 1
                }
            }
            else {
                this.sort_massive.push(element)
            }

        }

        this.sort_massive = this.sort_massive.sort()
        this.index_reg += 1
        for (let index = 0; index < this.sort_massive.length; index++) {
            const element = this.sort_massive[index];
            console.log(element)
            if (typeof (element) == 'object') {
                let massive_lo = new Array(element[1], this.index_reg, false);
                let massive = massive_lo.get_sort_massive()
                element[1] = massive

            }

        }
        return this.sort_massive
    }
    get_sub(element, index_sub) {
        let sub_lines = []
        let last_index
        for (let index = index_sub; index < this.massive.length; index++) {
            const element = this.massive[index];
            if (element.match(this.dynamicRegex)) {
                sub_lines.push(element)
            } else {
                last_index = index

                break
            }
        }
        return [[element, sub_lines], last_index]
    }
    get_string(massive) {
        let l_string = ''
        for (let index = 0; index < massive.length; index++) {
            const element = massive[index];
            if (typeof (element) == 'object') {
                l_string = l_string.concat(element[0])
                let temp_string = this.get_string(element[1])
                l_string = l_string.concat(temp_string)
            } else {
                l_string = l_string.concat(element)
            }
        }
        return l_string
    }
}

let massive = new Array(dataArray, 1, true);
let massive_sub = massive.get_sort_massive()
const str = massive.get_string(massive_sub)




