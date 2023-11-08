
import { App, Editor, moment,  Plugin, PluginSettingTab, Setting, MarkdownView }   from "obsidian";
// import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, addIcon }   from "obsidian";
// Remember to rename these classes and interfaces!

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
		// editor.replaceSelection(`\`\`\`${"123"}\n${selectedText}\n\`\`\`\n`);
		
		const dataArray = selectedText.split('\n');
		console.log('Получили список.');
		dataArray.sort()
		let stringt = dataArray.join('\n')
		editor.replaceSelection(stringt)

	}
  }



  
  