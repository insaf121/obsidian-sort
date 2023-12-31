
import { App, Editor, moment,  Plugin, PluginSettingTab, Setting, MarkdownView }   from "obsidian";
// import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon }   from "obsidian";
// Remember to rename these classes and interfaces!


class Array {
	massive: any[]
	index_reg: number;
	dynamicRegex: RegExp;
	sort_massive: any[];
    constructor(massive: any[], index_reg: number, bool: boolean ) {
        this.massive = massive;
        this.index_reg = index_reg
        this.dynamicRegex = new RegExp(`(\\t){${index_reg}}`);
        this.sort_massive = []
		if (bool) {
            while (this.massive[0].match(this.dynamicRegex)) {
                this.index_reg += 1
                this.dynamicRegex = new RegExp(`(\\t){${this.index_reg}}`);
            }
		}
    }
    get_sort_massive() {
        for (let index : number  = 0; index < this.massive.length; index++) {
            const element = this.massive[index];
            if (element.match(this.dynamicRegex)) {
                if (index == 0) {

                } else {
                    const massive_sub : any[] = this.get_sub(this.massive[index - 1], index)
                    this.sort_massive[this.sort_massive.length - 1] = massive_sub[0]
                    index = massive_sub[ 1 ] - 1
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
            if (typeof (element) == 'object') {
                let massive_lo = new Array(element[1], this.index_reg, false);
                let massive = massive_lo.get_sort_massive()
                element[1] = massive

            }

        }
        return this.sort_massive
    }
    get_sub(element: any[], index_sub: number) {
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
    get_string(massive: any[]) {
        let l_string = ''
        for (let index = 0; index < massive.length; index++) {
            const element = massive[index];
            if (typeof (element) == 'object') {
                l_string = l_string.concat(element[0],'\n')
                let temp_string = this.get_string(element[1])
				l_string = l_string.concat(temp_string)
            } else {
                l_string = l_string.concat(element,'\n')
            }
        }
        return l_string
    }
}



export default class ExamplePlugin extends Plugin {
	async onload() {
	  this.addCommand({
		id: "sort",
		name: "sort",
		editorCallback: (editor: Editor, view: MarkdownView) => this.insertCodeBlock(editor),
		

	  });
	}
	insertCodeBlock(editor: Editor)  {
		let selectedText = editor.getSelection()	
		const dataArray = selectedText.split('\n');

		for (let index = 0; index < dataArray.length; index++) {
			const element = dataArray[index];
			const split_line = element.split('\t');
			console.log(split_line)
			
		}

		console.log('Получили список.');

		let massive = new Array(dataArray, 1, true);
		let massive_sub = massive.get_sort_massive()
		let stringt = massive.get_string(massive_sub)

		editor.replaceSelection(stringt)

	}
  }



  
  